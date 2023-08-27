import React, {useContext} from 'react';
import cl from './RatingCard.module.css'
import {Rating} from "@mui/material";
import {AuthContext} from "../../App";
import {deleteRating} from "../../http/requests";

const RatingCard = ({rating, reloadRatings, snack, setSnack}) => {
    const [auth, setAuth] = useContext(AuthContext)

    const deleteRatingObj = () => {
        // Double check
        if(auth.user.id === rating.userId) {
            deleteRating(rating.id).then(res => {
                reloadRatings()
                setSnack({
                    open: true,
                    message: "Rating deleted successfully"
                })
            })
        }
    }

    return (
        <div className={cl.outer}>
            <div className={cl.headerWrapper}>
                <p>{rating.nickname}</p>
                <Rating name="read-only" value={rating.rate} readOnly />
            </div>
            <p className={cl.message}>{rating.message}</p>
            {auth.user.id === rating.userId
                &&
                    <button className={cl.delete} onClick={deleteRatingObj}>Delete</button>
            }
        </div>
    );
};

export default RatingCard;