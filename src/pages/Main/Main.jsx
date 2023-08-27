import React, {useEffect, useMemo, useState} from 'react';
import cl from './Main.module.css'
import OpenSelect from "../../components/OpenSelect/OpenSelect";
import {getBrands, getDevices, getTypes} from "../../http/requests";
import DevicesDisplay from "../../components/DevicesDisplay/DevicesDisplay";
import MainPagination from "../../components/Pagination/MainPagination";

const Main = () => {
    const PER_PAGE = 1

    const [types, setTypes] = useState([])
    const [type, setType] = useState(0)

    const [brands, setBrands] = useState([])
    const [brand, setBrand] = useState(0)

    const [devices, setDevices] = useState([])
    const [devicesCount, setDevicesCount] = useState(0)

    const [page, setPage] = useState(1)

    useEffect(() => {
        getTypes().then(res => {
            setTypes([{id: 0, name: "All"}, ...res])
        })
        getBrands().then(res => {
            setBrands([{id: 0, name: "All"}, ...res])
        })
        getDevices(null, null, PER_PAGE, page).then(res => {
            setDevices(res.rows)
            setDevicesCount(Math.ceil(res.count / PER_PAGE))
        })
    }, [])

    const reloadDevices = (type, brand) => {
        let values = [null, null, PER_PAGE, page]
        if(type !== 0) {
            values[0] = type
        }
        if(brand !== 0) {
            values[1] = brand
        }
        getDevices(...values).then(res => {
            setDevices(res.rows)
            setDevicesCount(Math.ceil(res.count / PER_PAGE))
        })
    }

    // Watch state changes (type, brand, page)
    useMemo(() => {
        reloadDevices(type, brand)
    }, [type, brand, page])

    return (
        <div className={cl.outer}>
            <div className={cl.sidebar}>
                <OpenSelect style={{marginBottom: '40px'}} options={types} currentOption={type} setCurrentOption={setType} />
                <OpenSelect options={brands} currentOption={brand} setCurrentOption={setBrand} />
            </div>
            <div className={cl.main}>
                <DevicesDisplay devices={devices} />
                {devices.length > 0
                    &&
                        <MainPagination page={page} setPage={setPage} pagesCount={devicesCount} />
                }
            </div>
        </div>
    );
};

export default Main;