import React, {useEffect, useState} from 'react';
import cl from './BasketCard.module.css'
import {getBrandById, getTypeById} from "../../http/requests";
import { Transition } from 'react-transition-group';

const BasketCard = ({itemFull, deleteCard}) => {
    const [item, setItem] = useState(itemFull.item)

    useEffect(() => {
        setItem(itemFull.item)
    }, [itemFull])

    const [info, setInfo] = useState("")
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        getBrandById(item.brandId).then(brand => {
            getTypeById(item.typeId).then(type => {
                setInfo(`${type.name} ${brand.name}`)
            })
        })
    }, [])

    const remove = () => {
        setVisible(false)
        setTimeout(() => {
            console.log("================================ DELETE ====================================")
            deleteCard(itemFull.id)
        }, 500)
    }

    return (
        <Transition
            in={visible}
            timeout={500}
        >
            {state =>
                <div className={[cl.outer, cl[state]].join(" ")}>
                    <img style={{height: '100px', width: "200px", objectFit: "contain"}} alt={item.name} src={item.img} />
                    <div className={cl.block}>
                        <p className={cl.deviceName}>{item.name}</p>
                        <p className={cl.deviceInfo}>{info}</p>
                    </div>
                    <div className={cl.block}>
                        <p className={cl.deviceName}>{item.price}$</p>
                    </div>
                    <div className={cl.block}>
                        <div className={cl.closeBtn} onClick={remove}>
                            <img
                                alt="Close"
                                src="https://seekicon.com/free-icon-download/close_17.svg"
                                width={15}
                                height={15}
                            />
                        </div>
                    </div>
                </div>
            }
        </Transition>
    );
};

export default BasketCard;