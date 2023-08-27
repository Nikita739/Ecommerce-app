import React, {useContext} from 'react';
import {Routes, Route} from "react-router-dom";
import {authRoutes, publicRoutes} from "./routes";
import {AuthContext} from "../App";
import Main from "../pages/Main/Main";

const AppRouter = () => {
    const [isAuth, setIsAuth] = useContext(AuthContext)

    return (
        <Routes>
            {publicRoutes.map(el =>
                <Route key={el.path} path={el.path} element={el.element} />
            )}

            {isAuth.isAuth
                &&
                    authRoutes.map(el =>
                        <Route key={el.path} path={el.path} element={el.element} />
                    )
            }
            <Route path="*" element={<Main />} />
        </Routes>
    );
};

export default AppRouter;