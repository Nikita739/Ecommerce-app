import React, {useState} from 'react';
import cl from '../Auth/Auth.module.css'
import {Alert} from "@mui/material";
import {forgotPassword} from "../../http/requests";
import {useNavigate} from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const [generalError, setGeneralError] = useState({
        status: false,
        message: ""
    })

    const [emailError, setEmailError] = useState({
        status: false,
        message: ""
    })

    const validate = () => {
        let result = true

        setGeneralError({status: false, message: ""})

        const re = /\S+@\S+\.\S+/;
        if(!re.test(email)) {
            result = false
            setEmailError({status: true, message: "Invalid email"})
        } else {
            setEmailError({status: false, message: ""})
        }

        return result
    }

    const submit = () => {
        if(validate()) {
            forgotPassword(email).then(res => {
                console.log(res)
                if(res.link) {
                    // navigate(`/reset-password?id=${res.link.id}&token=${res.link.token}`)
                    window.Email.send({
                        SecureToken : "796c6ccd-dee6-4419-998a-b1d42e11e86a",
                        To : email,
                        From : "nikita.987.nikita@gmail.com",
                        Subject : "Password reset",
                        Body : "Reset link: " + `http://localhost:3000/reset-password?id=${res.link.id}&token=${res.link.token}` + ". If you don't see it, check the spam folder"
                    }).then(
                        message => alert(message)
                    );
                } else {
                    console.log("Abossus")
                    setGeneralError({status: true, message: res.message})
                }
            })
        }
    }

    return (
        <div className={cl.outer}>
            <div className={cl.content}>
                <div className={cl.inputPair} style={{marginBottom: '40px'}}>
                    <h1 className={cl.title}>Forgot password</h1>
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
                <button style={{width: '100%'}} onClick={submit} className={cl.submitBtn}>Reset password</button>
            </div>
        </div>
    );
};

export default ForgotPassword;