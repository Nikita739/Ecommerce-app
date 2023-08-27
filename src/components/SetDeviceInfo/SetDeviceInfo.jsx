import React from 'react';
import cl from './SetDeviceInfo.module.css'

const SetDeviceInfo = ({info, setInfo}) => {
    const modifyKey = (value, index) => {
        const newInfo = [...info]
        newInfo[index].key = value
        setInfo(newInfo)
    }

    const modifyValue = (value, index) => {
        const newInfo = [...info]
        newInfo[index].value = value
        setInfo(newInfo)
    }

    const deleteRow = (index) => {
        const newInfo = info.filter((el, i) => i !== index)
        setInfo(newInfo)
    }

    const addRow = () => {
        setInfo([...info, {key: "", value: ""}])
    }

    return (
        <div className={cl.outer}>
            <div className={cl.infoWrapper}>
                {info.map((el, index) =>
                    <div key={index} className={cl.infoRow}>
                        <input
                            value={el.key}
                            onChange={(e) => modifyKey(e.target.value, index)}
                            placeholder="Key"
                            className={cl.infoItem}
                        />
                        <input
                            value={el.value}
                            onChange={(e) => modifyValue(e.target.value, index)}
                            placeholder="Value"
                            className={cl.infoItem}
                        />
                        <button onClick={() => deleteRow(index)}>
                            Delete
                        </button>
                    </div>
                )}
            </div>
            <button onClick={addRow}>Add</button>
        </div>
    );
};

export default SetDeviceInfo;