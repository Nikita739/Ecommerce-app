import React from 'react';
import cl from './IconButton.module.css'

const IconButton = ({src, style, onClick}) => {
    return (
        <div onClick={onClick} className={[cl.outer, style].join(" ")}>
            <img
                src={src}
                alt={src}
                className={cl.image}
            />
        </div>
    );
};

export default IconButton;