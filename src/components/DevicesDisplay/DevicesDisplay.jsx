import React from 'react';
import DeviceCard from "../DeviceCard/DeviceCard";
import cl from './DevicesDisplay.module.css'

const DevicesDisplay = ({devices}) => {
    return (
        <div className={cl.outer}>
            {devices.length > 0
                ?
                    devices.map(el =>
                        <DeviceCard key={el.id} deviceInfo={el} />
                    )
                :
                    <h1>Nothing to show</h1>
            }

        </div>
    );
};

export default DevicesDisplay;