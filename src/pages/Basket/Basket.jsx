import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../App";
import {getBasket, getBasketTotal, getDeviceDetails} from "../../http/requests";
import BasketItems from "../../components/BasketItems/BasketItems";
import cl from './Basket.module.css'
import MainPagination from "../../components/Pagination/MainPagination";

const Basket = () => {
    const [auth, setAuth] = useContext(AuthContext);
    const PER_PAGE = 4;

    const [items, setItems] = useState([]);
    const [itemsCount, setItemsCount] = useState(0);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const [itemsLoading, setItemsLoading] = useState(true);

    useEffect(() => {
        getBasketItems();
    }, [page]);

    const getBasketItems = () => {
        const userId = auth.user.id;
        if(userId) {
            setItemsLoading(true);

            getBasket(userId, PER_PAGE, page).then(res => {
                setItems(res.rows);
                setItemsCount(Math.ceil(res.count / PER_PAGE));
                setItemsLoading(false);
            });

            getBasketTotal(userId).then(res => {
                setTotal(res.total);
            });
        }
    }

    return (
        <div className={cl.outer}>
            <BasketItems loading={itemsLoading} uid={auth.user.id} items={items} setItems={setItems} totalPrice={total} setTotalPrice={setTotal} />
            <MainPagination page={page} setPage={setPage} pagesCount={itemsCount} />
            <p className={cl.total}>Total: {total}$</p>
        </div>
    );
};

export default Basket;