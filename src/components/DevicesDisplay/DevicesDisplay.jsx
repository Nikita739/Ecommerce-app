import React from 'react';
import DeviceCard from "../DeviceCard/DeviceCard";
import cl from './DevicesDisplay.module.css'
import {CircularProgress, Skeleton} from "@mui/material";

const DevicesDisplay = ({devices, isLoading=false, perPage=50}) => {
    return (
        <div className={cl.outer}>
            {isLoading
                ?
                    [...Array(perPage)].map(el =>
                        <Skeleton style={{margin: 20}} variant="rounded" width={300} height={268} />
                    )
                :
                    devices.length > 0
                        ?
                            devices.map(el =>
                                <DeviceCard key={el.id} deviceInfo={el}/>
                            )
                        :
                            <h1>Nothing to show</h1>
            }
        </div>
    );
};

export default DevicesDisplay;