import React, {useCallback, useContext, useState} from 'react';
import cl from '../Auth/Auth.module.css'
import {AuthContext} from "../../App";
import {login, register} from "../../http/requests";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {Alert} from "@mui/material";

const Login = () => {
    const [auth, setAuth] = useContext(AuthContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [generalError, setGeneralError] = useState({
        status: false,
        message: ""
    })

    const [emailError, setEmailError] = useState({
        status: false,
        message: ""
    })

    const [passwordError, setPasswordError] = useState({
        status: false,
        message: ""
    })

    const validate = useCallback(() => {
        let result = true

        const re = /\S+@\S+\.\S+/;
        if(!re.test(email)) {
            result = false
            setEmailError({status: true, message: "Incorrect email"})
        } else {
            setEmailError({status: false, message: ""})
        }

        if(password.length < 3) {
            result = false
            setPasswordError({status: true, message: "Password must be at least 3 characters long"})
        } else {
            setPasswordError({status: false, message: ""})
        }

        return result
    }, [email, password])

    const submit = () => {
        if(validate()) {
            login(email, password).then(res => {
                if(!res.token) {
                    setGeneralError({status: true, message: "Email or password incorrect"})
                } else  {
                    setToken(res.token)
                    navigate("/")
                    window.location.reload()
                }
            })
        }
    }

    const setToken = (token) => {
        localStorage.setItem("token", token)
        auth.checkToken(token)
    }

    return (
        <div className={cl.outer}>
            <div className={cl.content}>
                <div className={cl.inputPair} style={{marginBottom: '40px'}}>
                    <h1 className={cl.title}>Login</h1>
                    {generalError.status
                        &&
                            <Alert variant="filled" severity="error">{generalError.message}</Alert>
                    }
                </div>

                <div className={cl.inputPair}>
                    <input
                        className={cl.input}
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError.status
                        &&
                            <Alert variant="filled" severity="error">{emailError.message}</Alert>
                    }
                </div>

                <div className={cl.inputPair}>
                    <input
                        className={cl.input}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError.status
                        &&
                            <Alert variant="filled" severity="error">{passwordError.message}</Alert>
                    }
                </div>
                <p className={cl.redirect}>
                    <Link style={{marginLeft: 0}} to="/forgot-password">Forgot password?</Link>
                </p>

                <div className={cl.bottomWrapper}>

                <p className={cl.redirect}>
                    Do not have an account?
                    <Link to="/registration">Register</Link>
                </p>

                <button onClick={submit} className={cl.submitBtn}>Login</button>
                </div>
            </div>
        </div>
    );
};

export default Login;