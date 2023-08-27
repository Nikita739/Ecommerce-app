import React, {useState} from 'react';
import cl from './InputRating.module.css'
import {Alert, Rating} from "@mui/material";

const InputRating = ({rating, setRating, message, setMessage, publish}) => {
    const [ratingError, setRatingError] = useState({
        status: false,
        error: ""
    })
    const [messageError, setMessageError] = useState({
        status: false,
        error: ""
    })

    const validate = () => {
        let result = true

        setMessage(message.trim())

        if(!rating) {
            result = false
            setRatingError({status: true, error: "Please select a rating"})
        } else {
            setRatingError({status: false, error: ""})
        }

        if(message.trim().length === 0) {
            result = false
            setMessageError({status: true, error: "Please provide a message"})
        } else {
            setMessageError({status: false, error: ""})
        }

        return result
    }

    const post = () => {
        if(validate()) {
            publish()
        }
    }

    return (
        <div className={cl.outer}>
            <h2>How would you rate this product?</h2>
            <div className={cl.inputPair}>
                <Rating
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                />
                {ratingError.status
                    &&
                        <Alert severity="error">{ratingError.error}</Alert>
                }
            </div>

            <div className={cl.inputPair}>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={cl.textarea}
                    placeholder="Provide a short description on this product"
                />
                {messageError.status
                    &&
                        <Alert severity="error">{messageError.error}</Alert>
                }
            </div>
            <button onClick={post} className={cl.submit}>Submit</button>
        </div>
    );
};

export default InputRating;