import React from 'react';
import cl from './BasketItems.module.css'
import BasketCard from "../BasketCard/BasketCard";
import {removeFromBasket} from "../../http/requests";
import {Skeleton} from "@mui/material";

const BasketItems = ({items, uid, loading, setItems, totalPrice, setTotalPrice}) => {
    const deleteCard = (id, index, price) => {
        removeFromBasket(uid, id.toString()).then(res => {
            setItems(items.toSpliced(index, 1));
            setTotalPrice(totalPrice - price);
        });
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
                                    <BasketCard key={index} itemFull={el} deleteCard={deleteCard} index={index} />
                                )
                            :
                                <p className={cl.noItems}>Nothing to show</p>
                }
            </div>
        </div>
    );
};

export default BasketItems;