import React, {useEffect, useState} from 'react';
import cl from './DeviceCard.module.css'
import {getBrandById, getTypeById} from "../../http/requests";
import {Skeleton} from "@mui/material";
import {useNavigate} from "react-router-dom";

const DeviceCard = ({deviceInfo}) => {
    const navigate = useNavigate()

    const [brand, setBrand] = useState("")
    const [type, setType] = useState("")

    useEffect(() => {
        getTypeById(deviceInfo.typeId).then(res => {
            setType(res.name)
        })
        getBrandById(deviceInfo.brandId).then(res => {
            setBrand(res.name)
        })
    }, [])

    const goToPage = () => {
        navigate(`/device/${deviceInfo.id}`)
    }

    return (
        <div onClick={goToPage} className={cl.outer}>
            <div className={cl.imageWrapper}>
                <img alt={deviceInfo.name} src={deviceInfo.img} style={{width: "300px", height: "200px", objectFit: "contain"}} />
            </div>
            <div className={cl.panelWrapper}>
                {brand !== "" && type !== ""
                    ?
                        <p>{brand} {type}</p>
                    :
                        <Skeleton variant="text" sx={{
                            fontSize: '20px',
                            width: '100%',
                            marginBottom: '16px',
                            marginTop: '16px'
                        }} />
                }
            </div>
            <p className={cl.name}>{deviceInfo.name}</p>
        </div>
    );
};

export default DeviceCard;