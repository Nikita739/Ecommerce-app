import React, {useRef, useState} from 'react';
import {Alert, Box, Modal} from "@mui/material";
import cl from '../CreateType/CreateType.module.css'
import {addBrand} from "../../http/requests";

const CreateBrand = ({modalOpen, setOpen}) => {
    const brandRef = useRef()

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: '30px',
        border: 'none',
        outline: 'none',
        boxShadow: 24,
        p: 4,
    };

    const [showError, setShowError] = useState({
        status: false,
        message: ""
    })

    const validate = () => {
        let result = true

        brandRef.current.value = brandRef.current.value.trim()
        if(brandRef.current.value.length <= 0) {
            result = false
            setShowError({
                status: true,
                message: "Brand name can't be empty"
            })
        } else {
            setShowError({
                status: false,
                message: ""
            })
        }

        return result
    }

    const submit = () => {
        if(validate()) {
            addBrand(brandRef.current.value).then(res => {
                console.log(res)
            })
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
                    <h1 className={cl.title}>Add a new brand</h1>
                    <input
                        ref={brandRef}
                        className={cl.input}
                        placeholder="Brand name"
                    />
                    {showError.status
                    &&
                    <Alert sx={{borderRadius: '30px'}} severity="error">{showError.message}</Alert>
                    }
                    <button onClick={submit} className={cl.submit}>Add</button>
                </Box>
            </Modal>
        </div>
    );
};

export default CreateBrand;