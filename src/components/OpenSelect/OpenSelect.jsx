import React from 'react';
import cl from './OpenSelect.module.css'
import {Skeleton} from "@mui/material";

const OpenSelect = ({options, currentOption, setCurrentOption, style, isLoading}) => {
    const changed = (id) => {
        setCurrentOption(id);
    }

    return (
        <ul style={style} className={cl.outer}>
            {!isLoading
                ?
                    options.length > 0
                        ?
                            options.map(el =>
                                <li
                                    key={el.id}
                                    onClick={() => changed(el.id)}
                                    className={el.id === currentOption ? cl.active : null}
                                >
                                    {el.name}
                                </li>
                            )
                        :
                            <p>Nothing here</p>
                :
                    <div>
                        <Skeleton variant="rounded" height={150} />
                    </div>
            }
        </ul>
    );
};

export default OpenSelect;