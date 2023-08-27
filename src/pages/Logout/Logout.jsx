import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../App";

const Logout = () => {
    const navigate = useNavigate()
    const [auth, setAuth] = useContext(AuthContext)

    useEffect(() => {
        localStorage.setItem("token", "")
        auth.checkToken("")
        navigate('/login')
    }, [])

    return (
        <div>
            Logout
        </div>
    );
};

export default Logout;