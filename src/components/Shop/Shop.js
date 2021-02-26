import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const first20 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first20);
    const [cart, setCart] = useState([]);

    const handleAddButton = (product) => {
       const newCart = [...cart, product];
       setCart(newCart);
    }
   
    return (
        <div className='shop-container'>
            <div className="product-container">
            <ul>
                {
                    products.map(pd => <Product product={pd} handleAddButton={handleAddButton}></Product>)
                }
            </ul>
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
            
        </div>
    );
};

export default Shop;