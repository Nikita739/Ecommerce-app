import React, {useState} from 'react';
import cl from './Admin.module.css'
import CreateType from "../../components/CreateType/CreateType";
import CreateBrand from "../../components/CreateBrand/CreateBrand";
import CreateDevice from "../../components/CreateDevice/CreateDevice";

const Admin = () => {
    const [typeOpen, setTypeOpen] = useState(false)
    const [brandOpen, setBrandOpen] = useState(false)
    const [deviceOpen, setDeviceOpen] = useState(false)

    return (
        <div className={cl.outer}>
            <CreateType modalOpen={typeOpen} setOpen={setTypeOpen} />
            <CreateBrand modalOpen={brandOpen} setOpen={setBrandOpen} />
            <CreateDevice modalOpen={deviceOpen} setOpen={setDeviceOpen} />
            <button onClick={() => setTypeOpen(true)} className={cl.add}>Add type</button>
            <button onClick={() => setBrandOpen(true)} className={cl.add}>Add brand</button>
            <button onClick={() => setDeviceOpen(true)} className={cl.add}>Add device</button>
        </div>
    );
};

export default Admin;