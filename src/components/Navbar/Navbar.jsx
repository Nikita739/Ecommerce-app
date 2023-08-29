import React, {useContext, useState} from 'react';
import cl from './Navbar.module.css'
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../App";
import IconButton from "../../UI/IconButton/IconButton";
import NavMenu from "../NavMenu/NavMenu";

const Navbar = () => {
    const navigate = useNavigate();
    const path = window.location.pathname;
    const [auth] = useContext(AuthContext);

    const [sidebarVisible, setSidebarVisible] = useState(false);

    const authNavigation = [
        {name: "Logout", path: "/logout"},
        {name: "Basket", path: "/basket"},
        auth.user.role === 'ADMIN' && {name: "Admin", path: "/admin"}
    ];

    const publicNavigation = [
        {name: "Login", path: "/login"},
        {name: "Register", path: "/registration"}
    ];

    const redirect = (path) => {
        navigate(path)
    }

    const renderNavbar = (arr) => {
        return (
            arr.map(el =>
                <div onClick={() => redirect(el.path)} key={el.name} className={[cl.itemWrapper, path === el.path && cl.active].join(" ")}>
                    <p className={cl.item}>{el.name}</p>
                </div>
            )
        );
    }

    return (
        <div className={cl.outer}>
            <div className={cl.logoWrapper}>
                <div onClick={() => redirect("/")} className={[cl.itemWrapper, path === "/" && cl.active].join(" ")}>
                    <p className={cl.item}>Home</p>
                </div>
            </div>
            <div className={cl.navigationWrapper}>
                <div className={cl.regularNavbar}>
                    {renderNavbar(auth.isAuth ? authNavigation : publicNavigation)}
                </div>
                <div className={cl.menuNavbar}>
                    <IconButton
                        src="https://cdn-icons-png.flaticon.com/512/2976/2976215.png"
                        onClick={() => setSidebarVisible(true)}
                    />
                </div>
            </div>
            {sidebarVisible
                &&
                    <NavMenu
                        setVisible={setSidebarVisible}
                        elements={auth.isAuth ? authNavigation : publicNavigation}
                    />
            }
        </div>
    );
};

export default Navbar;