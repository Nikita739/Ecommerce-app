import React, {useContext} from 'react';
import cl from './Navbar.module.css'
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../App";

const Navbar = () => {
    const navigate = useNavigate()
    const path = window.location.pathname
    const [auth, setAuth] = useContext(AuthContext)

    const authNavigation = [
        {name: "Logout", path: "/logout"},
        {name: "Basket", path: "/basket"}
    ]
    if(auth.user.role === 'ADMIN') {
        authNavigation.push({name: "Admin", path: "/admin"})
    }

    const publicNavigation = [
        {name: "Login", path: "/login"},
        {name: "Register", path: "/registration"}
    ]

    const redirect = (path) => {
        navigate(path)
    }

    return (
        <div className={cl.outer}>
            <div className={cl.logoWrapper}>
                {path === "/"
                    ?
                        <div onClick={() => redirect("/")} className={[cl.itemWrapper, cl.active].join(" ")}>
                            <p className={cl.item}>Online store</p>
                        </div>
                    :
                        <div onClick={() => redirect("/")} className={cl.itemWrapper}>
                            <p className={cl.item}>Online store</p>
                        </div>
                }
            </div>
            <div className={cl.navigationWrapper}>
                {auth.isAuth
                    ?
                        authNavigation.map(el =>
                            path === el.path
                                ?
                                <div onClick={() => redirect(el.path)} key={el.name} className={[cl.itemWrapper, cl.active].join(" ")}>
                                    <p className={cl.item}>{el.name}</p>
                                </div>
                                :
                                <div onClick={() => redirect(el.path)} key={el.name} className={cl.itemWrapper}>
                                    <p className={cl.item}>{el.name}</p>
                                </div>
                        )
                    :
                        publicNavigation.map(el =>
                            path === el.path
                                ?
                                <div onClick={() => redirect(el.path)} key={el.name} className={[cl.itemWrapper, cl.active].join(" ")}>
                                    <p className={cl.item}>{el.name}</p>
                                </div>
                                :
                                <div onClick={() => redirect(el.path)} key={el.name} className={cl.itemWrapper}>
                                    <p className={cl.item}>{el.name}</p>
                                </div>
                        )
                }

            </div>
        </div>
    );
};

export default Navbar;