import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart;

    // const total = cart.reduce((total, pd) => pd.price + total, 0);
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
    }

    let shipping = 0;
    if (total > 35) {
        shipping = 0
    }
    else if (total > 15) {
        shipping = 4.99
    }
    else if (total > 0) {
        shipping = 12.99
    }

    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return precision;
    }

    return (
        <div>
            <h1>Order Summary</h1>
            <h3>Items Ordered: {cart.length}</h3>
            <p>Product Price: {formatNumber(total)}</p>
            <p> <small>Shipping Cost: ${shipping}</small> </p>
            <p><small>Tax + VAT: {tax}</small></p>
            <p>Total Price: {grandTotal}</p>
            {
                props.children
            }

        </div>
    );
};

export default Cart;