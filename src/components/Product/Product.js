import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {
    const { name, img, seller, price, stock } = props.product;

    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className='product-details'>
                <h3 className='product-name'>{name}</h3><br/>
                <p>by: {seller}</p>
                <p>${price}</p>
                <p>Only {stock} left in stock - Order soon</p>
                <button onClick={() => props.handleAddButton(props.product)} className='main-button'><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
            </div>
        </div>
    );
};

export default Product;