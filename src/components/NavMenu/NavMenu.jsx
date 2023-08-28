import React from 'react';
import cl from './NavMenu.module.css';
import {useNavigate} from "react-router-dom";

const NavMenu = ({className, elements, setVisible}) => {
    const navigate = useNavigate();
    const path = window.location.pathname;

    const redirect = (path) => {
        navigate(path);
        setVisible(false);
    }

    return (
        <div className={[cl.outer, className].join(" ")} onClick={() => setVisible(false)}>
            <div className={cl.sidebar} onClick={e => e.stopPropagation()}>
                {elements.map(el =>
                    <div onClick={() => redirect(el.path)} key={el.name} className={[cl.element, path === el.path && cl.active].join(" ")}>
                        <p>{el.name}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavMenu;