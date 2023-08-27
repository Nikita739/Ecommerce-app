import React, {useContext, useEffect, useState} from 'react';
import {addRating, checkRating, getRatings, getUser, recalculateRating} from "../../http/requests";
import {AuthContext} from "../../App";
import cl from './DeviceRating.module.css'
import RatingCard from "../RatingCard/RatingCard";
import InputRating from "../InputRating/InputRating";
import {Alert, Snackbar} from "@mui/material";

const DeviceRating = ({deviceId}) => {
    const [auth, setAuth] = useContext(AuthContext)
    const [ratings, setRatings] = useState([])

    const [rating, setRating] = useState(null)
    const [message, setMessage] = useState("")

    const [canAdd, setCanAdd] = useState(false)

    const [snack, setSnack] = useState({
        open: false,
        message: ""
    })

    useEffect(() => {
        getDeviceRatings()
    }, [])

    useEffect(() => {
        if(auth.user.id) {
            checkRating(auth.user.id, deviceId).then(res => {
                setCanAdd(!res.value)
            })
        }
    }, [auth, ratings])

    const getDeviceRatings = () => {
        getRatings(deviceId).then(res => {
            let fullRatings = []

            const add = async (el) => {
                let fullEl = {...el}
                const user = await getUser(el.userId)

                fullEl.nickname = user.nickname
                fullRatings.push(fullEl)
            }

            const loop = async () => {
                for(let i = 0; i < res.length; i++) {
                    await add(res[i])
                }
            }

            loop().then(() => {
                setRatings(fullRatings)
            })
        })
    }

    const postRate = () => {
        addRating(auth.user.id, deviceId, rating, message).then(res => {
            console.log(res)
            recalculateRating(deviceId).then(res => {
                console.log(res)
                getDeviceRatings()
                setSnack({
                    open: true,
                    message: "Rating added successfully"
                })
            })
        })
    }

    return (
        <div className={cl.outer}>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snack.open}
                autoHideDuration={6000}
                onClose={() => setSnack({...snack, open: false})}
            >
                <Alert onClose={() => setSnack({...snack, open: false})} severity="success" sx={{ width: '100%' }}>
                    {snack.message}
                </Alert>
            </Snackbar>
            {canAdd
                &&
                    <InputRating
                        rating={rating}
                        setRating={setRating}
                        message={message}
                        setMessage={setMessage}
                        publish={postRate}
                    />
            }
            <div className={cl.ratings}>
                {ratings.map(el =>
                    <RatingCard
                        key={el.id}
                        rating={el}
                        reloadRatings={getDeviceRatings}
                        snack={snack}
                        setSnack={setSnack}
                    />
                )}
            </div>
        </div>
    );
};

export default DeviceRating;