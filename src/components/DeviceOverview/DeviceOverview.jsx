import React, {useContext, useState} from 'react';
import cl from './DeviceOverview.module.css'
import {Alert, Rating, Skeleton, Snackbar, Tooltip} from "@mui/material";
import {AuthContext} from "../../App";
import {addToBasket} from "../../http/requests";

const DeviceOverview = ({deviceInfo}) => {
    let decodedInfo = null

    if(deviceInfo.info) {
        decodedInfo = JSON.parse(deviceInfo.info)
    }

    const [auth, setAuth] = useContext(AuthContext)
    const [snackOpen, setSnackOpen] = useState(false)

    const addItem = () => {
        const device = deviceInfo
        const userId = auth.user.id

        console.log(device)

        addToBasket(userId, device).then(res => {
            console.log(res)
            if(res.id) {
                setSnackOpen(true)
            }
        })
    }

    return (
        <div className={cl.outer}>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={snackOpen} autoHideDuration={6000} onClose={() => setSnackOpen(false)}>
                <Alert onClose={() => setSnackOpen(false)} severity="success" sx={{ width: '100%' }}>
                    Item added to your basket!
                </Alert>
            </Snackbar>
            <div className={cl.firstRow}>
                {deviceInfo.img
                    ?
                        <img alt={deviceInfo.name} src={deviceInfo.img} width={400} />
                    :
                        <Skeleton variant="rectangular" width={400} height={200} />
                }
                <div className={cl.infoWrapper}>
                    {deviceInfo.name
                        ?
                            <h1>{deviceInfo.name}</h1>
                        :
                            <Skeleton variant="text" sx={{fontSize: "40px", width: '300px'}} />
                    }
                    {deviceInfo.price
                        ?
                            <p>Price: {deviceInfo.price}$</p>
                        :
                            <Skeleton variant="text" sx={{fontSize: "20px", width: '200px'}} />
                    }
                </div>
            </div>

            <div className={cl.secondRow}>
                <Rating name="read-only" value={deviceInfo.rating !== undefined ? deviceInfo.rating : 0} readOnly />
            </div>

            {auth.isAuth
                ?
                    <button onClick={addItem} className={cl.addToBasket}>Add to cart</button>
                :
                    <Tooltip title="Login to add items to your cart">
                        <button className={[cl.addToBasket, cl.disabled].join(" ")}>Add to cart</button>
                    </Tooltip>
            }

            {decodedInfo
                ?
                    <ul className={cl.displayInfo}>
                        {decodedInfo.map(el =>
                            <li key={el.key}>{el.key}: {el.value}</li>
                        )}
                    </ul>
                :
                    <ul className={cl.displayInfo}>
                        <Skeleton variant="rectangular" height={38} />
                        <Skeleton variant="rectangular" height={38} />
                        <Skeleton variant="rectangular" height={38} />
                        <Skeleton variant="rectangular" height={38} />
                    </ul>
            }
        </div>
    );
};

export default DeviceOverview;