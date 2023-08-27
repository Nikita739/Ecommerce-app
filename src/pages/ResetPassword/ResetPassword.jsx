import React, {useEffect, useState} from 'react';
import {checkLink, resetPassword} from "../../http/requests";
import cl from '../Auth/Auth.module.css'
import {Alert} from "@mui/material";

const ResetPassword = () => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")
    const token = params.get("token")

    const [isLinkValid, setIsLinkValid] = useState(false)

    const [password, setPassword]= useState("")

    const [passwordError, setPasswordError] = useState({status: false, message: ""})
    const [generalError, setGeneralError] = useState({status: false, message: ""})

    useEffect(() => {
        checkLink(id, token).then(res => {
            console.log(res)
            setIsLinkValid(res.linkValid)
        })
    }, [])

    const validate = () => {
        let result = true

        if(password.length < 3) {
            result = false
            setPasswordError({status: true, message: "Password must be at least 3 characters long"})
        }

        return result
    }

    const submit = () => {
        if(validate()) {
            resetPassword(id, token, password).then(res => {
                console.log(res)
                if(res.error) {
                    setGeneralError({status: true, message: "This link has expired or password has been already reset"})
                } else {
                    setIsLinkValid(false)
                }
            })
        }
    }

    return (
        <div className={cl.outer}>
            <div className={cl.content}>
                {isLinkValid
                    ?
                        <>
                            <div className={cl.inputPair}>
                                <h1 className={cl.title}>Reset password</h1>
                                {generalError.status
                                    &&
                                        <Alert variant="filled" severity="error">{generalError.message}</Alert>
                                }
                            </div>
                            <div className={cl.inputPair}>
                                <input
                                    className={cl.input}
                                    placeholder="Type a new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {passwordError.status
                                    &&
                                        <Alert variant="filled" severity="error">{passwordError.message}</Alert>
                                }
                            </div>
                            <button className={cl.submitBtn} onClick={submit}>Reset</button>
                        </>
                    :
                        <div className={cl.inputPair}>
                            <Alert variant="filled" severity="error">This link is not valid</Alert>
                        </div>
                }

            </div>
        </div>
    );
};

export default ResetPassword;