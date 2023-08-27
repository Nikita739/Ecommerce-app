import React from 'react';
import {Pagination} from "@mui/material";
import cl from './Pagination.module.css'

const MainPagination = ({pagesCount, page, setPage}) => {
    const movePage = (e, value) => {
        setPage(value)
    }

    return (
        <div className={cl.outer}>
            {pagesCount > 0
                &&
                    <Pagination page={page} onChange={movePage} count={pagesCount} color="primary" />
            }
        </div>
    );
};

export default MainPagination;