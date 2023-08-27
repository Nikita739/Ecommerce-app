import React from 'react';
import cl from './BasketItems.module.css'
import BasketCard from "../BasketCard/BasketCard";
import {removeFromBasket} from "../../http/requests";
import {Skeleton} from "@mui/material";

const BasketItems = ({items, reloadBasket, uid, loading}) => {
    const deleteCard = (id) => {
        console.log(id)
        removeFromBasket(uid, id.toString()).then(res => {
            console.log(res)
            reloadBasket()
        })
    }

    return (
        <div className={cl.outer}>
            <h1 className={cl.title}>Your basket</h1>
            <div className={cl.cards}>

                {loading
                    ?
                        <div>
                            <Skeleton sx={{marginBottom: '20px'}} height={125} variant="rounded" />
                            <Skeleton sx={{marginBottom: '20px'}} height={125} variant="rounded" />
                            <Skeleton sx={{marginBottom: '20px'}} height={125} variant="rounded" />
                            <Skeleton sx={{marginBottom: '20px'}} height={125} variant="rounded" />
                        </div>
                    :
                        items.length > 0
                            ?
                                items.map((el, index) =>
                                    <BasketCard key={index} itemFull={el} deleteCard={deleteCard} />
                                )
                            :
                                <p className={cl.noItems}>Nothing to show</p>
                }
            </div>
        </div>
    );
};

export default BasketItems;