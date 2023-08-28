import React, {useEffect, useMemo, useState} from 'react';
import cl from './Main.module.css'
import OpenSelect from "../../components/OpenSelect/OpenSelect";
import {getBrands, getDevices, getTypes} from "../../http/requests";
import DevicesDisplay from "../../components/DevicesDisplay/DevicesDisplay";
import MainPagination from "../../components/Pagination/MainPagination";

const Main = () => {
    const PER_PAGE = 1;

    const [types, setTypes] = useState([]);
    const [type, setType] = useState(0);
    const [typesLoading, setTypesLoading] = useState(false);

    const [brands, setBrands] = useState([]);
    const [brand, setBrand] = useState(0);
    const [brandsLoading, setBrandsLoading] = useState(false);

    const [devices, setDevices] = useState([]);
    const [devicesCount, setDevicesCount] = useState(0);
    const [devicesLoading, setDevicesLoading] = useState(false);

    const [page, setPage] = useState(1);

    useEffect(() => {
        setTypesLoading(true);
        getTypes().then(res => {
            setTypes([{id: 0, name: "All"}, ...res]);
            setTypesLoading(false);
        });

        setBrandsLoading(true);
        getBrands().then(res => {
            setBrands([{id: 0, name: "All"}, ...res]);
            setBrandsLoading(false);
        });

        setDevicesLoading(true);
        getDevices(null, null, PER_PAGE, page).then(res => {
            setDevices(res.rows);
            setDevicesCount(Math.ceil(res.count / PER_PAGE));
            setDevicesLoading(false);
        });
    }, [])

    const reloadDevices = (type, brand) => {
        setDevicesLoading(true);
        getDevices(type !== 0 ? type : null, brand !== 0 ? brand : null, PER_PAGE, page).then(res => {
            setDevices(res.rows);
            setDevicesCount(Math.ceil(res.count / PER_PAGE));
            setDevicesLoading(false);
        })
    }

    // Watch state changes (type, brand, page)
    useMemo(() => {
        reloadDevices(type, brand)
    }, [type, brand, page])

    return (
        <div className={cl.outer}>
            <div className={cl.sidebar}>
                <OpenSelect isLoading={typesLoading} style={{marginBottom: '40px'}} options={types} currentOption={type} setCurrentOption={setType} />
                <OpenSelect isLoading={brandsLoading} options={brands} currentOption={brand} setCurrentOption={setBrand} />
            </div>
            <div className={cl.main}>
                <DevicesDisplay isLoading={devicesLoading} devices={devices} perPage={PER_PAGE} />
                {devices.length > 0
                    &&
                        <MainPagination page={page} setPage={setPage} pagesCount={devicesCount} />
                }
            </div>
        </div>
    );
};

export default Main;