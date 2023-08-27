import React from 'react';
import cl from './OpenSelect.module.css'

const OpenSelect = ({options, currentOption, setCurrentOption, style}) => {
    const changed = (id) => {
        setCurrentOption(id)
    }

    return (
        <ul style={style} className={cl.outer}>
            {options.map(el =>
                <li
                    key={el.id}
                    onClick={() => changed(el.id)}
                    className={el.id === currentOption ? cl.active : null}
                >
                    {el.name}
                </li>
            )}
        </ul>
    );
};

export default OpenSelect;