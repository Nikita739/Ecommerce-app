import React, {useRef, useState} from 'react';
import {Alert, Box, Modal} from "@mui/material";
import cl from './CreateType.module.css'
import {addType} from "../../http/requests";

const CreateType = ({modalOpen, setOpen}) => {
    const typeRef = useRef()

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

        typeRef.current.value = typeRef.current.value.trim()
        if(typeRef.current.value.length <= 0) {
            result = false
            setShowError({
                status: true,
                message: "Type name can't be empty"
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
            addType(typeRef.current.value).then(res => {
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
                    <h1 className={cl.title}>Add a new type</h1>
                    <input
                        ref={typeRef}
                        className={cl.input}
                        placeholder="Type name"
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

export default CreateType;