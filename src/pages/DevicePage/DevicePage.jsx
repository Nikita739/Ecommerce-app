import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getDeviceDetails} from "../../http/requests";
import DeviceOverview from "../../components/DeviceOverview/DeviceOverview";
import cl from './DevicePage.module.css'
import DeviceRating from "../../components/DeviceRating/DeviceRating";

const DevicePage = () => {
    const params = useParams()
    const id = params.id

    const [deviceInfo, setDeviceInfo] = useState({})

    useEffect(() => {
        getDeviceDetails(id).then(res => {
            setDeviceInfo(res)
        })
    }, [])

    return (
        <div className={cl.outer}>
            <DeviceOverview deviceInfo={deviceInfo} />
            <DeviceRating deviceId={id} />
        </div>
    );
};

export default DevicePage;