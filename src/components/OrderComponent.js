import React from 'react';

export default function OrderComponent(props) {
    const {order_items} = props;

    return (
        order_items 
            ?
                (order_items.map(item => {
                    const image = "data:image/png;base64, " + item.image;
                    return (
                        <div className="item-card" key={item.menu}>
                            <div className="menu-image-container">
                                <img id="menu-image" src={image}/>
                            </div>
                            <div className="item-details">
                                <div className="item-name">{item.menu}</div>
                                <div className="item-price">{item.price}</div>
                            </div>
                            <div className="item-qty">{item.qty}</div>
                            <div className="item-subtotal">Php {item.qty * item.price}</div>
                        </div>
                    )
                }))
            : 
                null  
    );
}