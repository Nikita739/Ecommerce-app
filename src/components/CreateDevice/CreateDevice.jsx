import React, {useEffect, useRef, useState} from 'react';
import {Alert, Box, Modal} from "@mui/material";
import cl from '../CreateType/CreateType.module.css'
import {addBrand, addDevice, getBrands, getTypes} from "../../http/requests";
import CustomSelect from "../Select/CustomSelect";
import SetDeviceInfo from "../SetDeviceInfo/SetDeviceInfo";

const CreateDevice = ({modalOpen, setOpen}) => {
    const nameRef = useRef()
    const priceRef = useRef()
    const imgRef = useRef()

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        backgroundColor: '#fff',
        overflowY: 'auto',
        maxHeight: '100vh',
        borderRadius: '30px',
        border: 'none',
        outline: 'none',
        boxShadow: 24,
        p: 4,
    };

    const [nameError, setNameError] = useState({status: false, message: ""})
    const [priceError, setPriceError] = useState({status: false, message: ""})
    const [brandError, setBrandError] = useState({status: false, message: ""})
    const [typeError, setTypeError] = useState({status: false, message: ""})
    const [imgError, setImgError] = useState({status: false, message: ""})

    const [type, setType] = useState(0)
    const [types, setTypes] = useState([])

    const [brand, setBrand] = useState(0)
    const [brands, setBrands] = useState([])

    // Mock data
    const [info, setInfo] = useState([
        {key: "Processor", value: "Pentium 4"},
        {key: "Ubuntu", value: "100500"}
    ])

    useEffect(() => {
        getTypes().then(res => {
            setTypes(res)
        })
        getBrands().then(res => {
            setBrands(res)
        })
    }, [])

    const validate = () => {
        let result = true

        console.log(imgRef.current.files)

        nameRef.current.value = nameRef.current.value.trim()
        priceRef.current.value = priceRef.current.value.trim()

        if(nameRef.current.value.length <= 0) {
            result = false
            setNameError({
                status: true,
                message: "Device name can't be empty"
            })
        } else {
            setNameError({
                status: false,
                message: ""
            })
        }

        if(priceRef.current.value <= 0) {
            result = false
            setPriceError({
                status: true,
                message: "Price can't be less than 0"
            })
        } else {
            setPriceError({
                status: false,
                message: ""
            })
        }

        if(type === 0) {
            result = false
            setTypeError({
                status: true,
                message: "Select device type"
            })
        } else {
            setTypeError({
                status: false,
                message: ""
            })
        }

        if(brand === 0) {
            result = false
            setBrandError({
                status: true,
                message: "Select device brand"
            })
        } else {
            setBrandError({
                status: false,
                message: ""
            })
        }

        if(!imgRef.current.files[0]) {
            result = false
            setImgError({
                status: true,
                message: "Select device image"
            })
        } else {
            setImgError({
                status: false,
                message: ""
            })
        }

        return result
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const submit = async () => {
        if(validate()) {
            const encodedImg = await toBase64(imgRef.current.files[0])
            let encodedInfo = JSON.stringify(info)
            console.log(typeof encodedInfo)
            const res = await addDevice(nameRef.current.value, priceRef.current.value, type, brand, encodedInfo, encodedImg)
            console.log(res)
        }
    }

    return (
        <div>
            <Modal
                open={modalOpen}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h1 className={cl.title}>Add a new device</h1>

                    <div className={cl.inputPair}>
                        <input
                            ref={nameRef}
                            className={cl.input}
                            placeholder="Device name"
                        />
                        {nameError.status
                            &&
                                <Alert sx={{borderRadius: '30px'}} severity="error">{nameError.message}</Alert>
                        }
                    </div>

                    <div className={cl.inputPair}>
                        <input
                            type='number'
                            ref={priceRef}
                            className={cl.input}
                            placeholder="Device price"
                        />
                        {priceError.status
                            &&
                                <Alert sx={{borderRadius: '30px'}} severity="error">{priceError.message}</Alert>
                        }
                    </div>

                    <div className={cl.inputPair}>
                        <CustomSelect title="Type" values={types} value={type} setValue={setType} />
                        {typeError.status
                            &&
                                <Alert sx={{borderRadius: '30px'}} severity="error">{typeError.message}</Alert>
                        }
                    </div>
                    <div className={cl.inputPair}>
                        <CustomSelect title="Brand" style={{marginTop: '30px'}} values={brands} value={brand} setValue={setBrand} />
                        {brandError.status
                            &&
                                <Alert sx={{borderRadius: '30px'}} severity="error">{brandError.message}</Alert>
                        }
                    </div>

                    <SetDeviceInfo info={info} setInfo={setInfo} />

                    <div className={cl.inputPair}>
                        <input
                            style={{marginTop: '30px'}}
                            ref={imgRef}
                            type="file"
                        />
                        {imgError.status
                            &&
                                <Alert sx={{borderRadius: '30px'}} severity="error">{imgError.message}</Alert>
                        }
                    </div>

                    <button onClick={submit} className={cl.submit}>Add</button>
                </Box>
            </Modal>
        </div>
    );
};

export default CreateDevice;