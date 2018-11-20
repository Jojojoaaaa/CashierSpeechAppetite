import React from 'react';
import * as type from '../constants/type'; 
export default function OrderComponent(props) {
    const {order_items} = props;

    return (
        order_items 
            ?
                <div className="order">
                    {(order_items.map(item => {
                        const image = type.IMAGE_PREFIX + item.image;
                        return (
                            <div className="item-card" key={item.menu}>
                                <div className="menu-image-container">
                                    <img id="menu-image" src={image}/>
                                </div>
                                <div className="item-details">
                                    <div id="item-name">{item.menu}</div>
                                    <div id="item-price">Php {item.price}</div>
                                </div>
                                <div className="item-qty">{item.qty}</div>
                                <div className="item-subtotal">Php {item.qty * item.price}</div>
                            </div>
                        )
                    }))}
                </div>
            : 
                null  
    );
}