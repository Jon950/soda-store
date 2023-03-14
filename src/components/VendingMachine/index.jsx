// Data
import { testSoda } from '../../data/testData'

// CSS
import './vendingMachine.css'

// Icons
import { TiDelete } from 'react-icons/ti';

import { useEffect, useState } from 'react';

const checkQuantity = ({order, productItem}) => {
    if(order && order.length > 0 && order[order.findIndex((item) => item.id === productItem.id)] && productItem.maxQuantity <= order[order.findIndex((item) => item.id === productItem.id)].quantity) {
        return "vmProduct disabled"
    }
    return "vmProduct" 
}

const VendingMachine = () => {
    const [totalCost, setTotalCost] = useState("")
    const [sodaList, setSodaList] = useState(testSoda)
    const [order, setOrder] = useState([])

    useEffect(() => {
        let newTotalCost = 0
        if(order.length > 0) {
            order.forEach((item) => {
                newTotalCost += (item.cost * item.quantity)
            })
            
            setTotalCost(`${sodaList[0].currencySymbol}${(newTotalCost / 100).toFixed(2)}`)
        } else {
            setTotalCost(`${sodaList[0].currencySymbol}${(0).toFixed(2)}`)
        }
    }, [order])

    return (
        <div id="vendingMachine">
            <div id="vmHeader">
                <p>Virtual Soda</p>
            </div>

            <div id="vmSodaGridBox">
                {sodaList.map((productItem) => (
                    <div className={checkQuantity({order, productItem})} key={productItem.id} onClick={() => {
                        setOrder((thisOrder) => {
                            const index = thisOrder.findIndex((item) => item.id === productItem.id)
                            if(index != -1) {
                                const newOrder = [...thisOrder]
                                newOrder[index] = { ...newOrder[index], quantity: newOrder[index].quantity + 1 };
                                return newOrder;
                            }
                            return [...thisOrder, {...productItem, 
                                orderID: productItem.id + new Date().getTime(),
                                quantity: 1
                            }]
                        })
                    }}>
                        <img src={productItem.img} alt="" width="100" height="100" />
                        <p>{productItem.productName}</p>
                        <p>{productItem.currencySymbol}{(productItem.cost / 100).toFixed(2)}</p>
                    </div>
                ))}
            </div>
            <div id="vmCart">
                <div id="vmCartHeader">
                    <div>
                        <p>YOUR CART</p>
                    </div>
                    <div>
                        <p>TOTAL: {totalCost}</p>
                    </div>
                </div>
                <div id="vmCartGrid">
                    {order.map((cartItem) => (
                        <div className="vmCartProduct" key={cartItem.orderID}>
                            <img src={cartItem.img} alt="" width="100" height="100" />
                            <div id='vmCartProductInfo'>
                                <p>{cartItem.productName}</p>
                                <p>{cartItem.currencySymbol}{(cartItem.cost / 100).toFixed(2)}</p>
                                <p>{cartItem.quantity}</p>
                            </div>
                            <TiDelete className='CartProductIcon' onClick={() => 
                        setOrder((thisOrder) => {
                            const thisNewOrder = [...thisOrder]
                            thisNewOrder.splice(thisOrder.findIndex((item) => item.id === cartItem.id), 1)
                            return thisNewOrder
                        })} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default VendingMachine