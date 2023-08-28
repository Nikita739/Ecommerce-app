import './App.css';
import AppRouter from "./routing/AppRouter";
import {createContext, useEffect, useState} from "react";
import axios from "axios";
import jwt from 'jwt-decode'
import Navbar from "./components/Navbar/Navbar";
import {baseUrl} from "./http/requests";

export const AuthContext = createContext(null)

function App() {
    const checkToken = (token) => {
        if(token === "" || !token) {
            authController[1]({
                isAuth: false,
                user: {},
                checkToken: checkToken
            })
            return
        }

        axios({
            method: 'get',
            url: `${baseUrl}/api/user/auth`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(r => {
            if(r.data.token) {
                const userObj = jwt(r.data.token)
                authController[1]({
                    isAuth: true,
                    user: userObj,
                    checkToken: checkToken
                })
            }
        }).catch((e) => {
            console.log(e.response.data)
        })
    }

    const authObj = {
        isAuth: false,
        user: {},
        checkToken: checkToken
    }
    const authController = useState(authObj)

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`
        checkToken(localStorage.getItem("token"))
    }, [])

    return (
        <AuthContext.Provider value={authController}>
            <div className="App">
                <Navbar />
                <AppRouter />
            </div>
        </AuthContext.Provider>
    );
}

export default App;
