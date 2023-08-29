import React from 'react';
import DeviceCard from "../DeviceCard/DeviceCard";
import cl from './DevicesDisplay.module.css'
import {Skeleton} from "@mui/material";

const DevicesDisplay = ({devices, isLoading=false, perPage=50}) => {
    return (
        <div className={cl.outer}>
            {isLoading
                ?
                    [...Array(perPage)].map((el, index) =>
                        <Skeleton key={index} style={{margin: 20}} variant="rounded" width={300} height={268} />
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