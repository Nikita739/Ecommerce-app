import React, {useCallback, useContext, useState} from 'react';
import {AuthContext} from "../../App";
import {Link, useNavigate} from "react-router-dom";
import {login, register} from "../../http/requests";
import cl from "../Auth/Auth.module.css";
import {Alert} from "@mui/material";

const Register = () => {
    const [auth, setAuth] = useContext(AuthContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const [generalError, setGeneralError] = useState({
        status: false,
        message: ""
    })

    const [usernameError, setUsernameError] = useState({
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
        console.log(username)

        if(username.length <= 0) {
            result = false
            setUsernameError({status: true, message: "Please provide a username"})
        } else {
            console.log("Yess")
            setUsernameError({status: false, message: ""})
        }

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
    }, [email, password, username])

    const submit = () => {
        if(validate()) {
            register(email, password, username).then(res => {
                if(!res.token) {
                    setGeneralError({status: true, message: "User with this email already exists"})
                } else  {
                    setToken(res.token)
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
                    <h1 className={cl.title}>Register</h1>
                    {generalError.status
                        &&
                            <Alert variant="filled" severity="error">{generalError.message}</Alert>
                    }
                </div>

                <div className={cl.inputPair}>
                    <input
                        className={cl.input}
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {usernameError.status
                        &&
                            <Alert variant="filled" severity="error">{usernameError.message}</Alert>
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

                <div className={cl.bottomWrapper}>

                    <p className={cl.redirect}>
                        Already have an account?
                        <Link to="/login">Login</Link>
                    </p>

                    <button onClick={submit} className={cl.submitBtn}>Register</button>
                </div>
            </div>
        </div>
    );
};

export default Register;