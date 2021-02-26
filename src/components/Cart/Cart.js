import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart;
    
    // const total = cart.reduce((total, pd) => pd.price + total, 0);
   let total = 0;

   for (let i = 0; i < cart.length; i++) {
       const product = cart[i];
       total = total + product.price;
   }

   let shipping = 0;
   if(total > 35){
       shipping = 0
   }
   else if(total > 15){
       shipping = 4.99
   }
   else if(total > 0){
       shipping = 12.99
   }

   const tax = total * 0.1;

   const formatNumber = num => {
       const precision = num.toFixed(2);
       return precision;
   }

   const grandTotal = total + shipping + tax;

    return (
        <div className='cart-details'>
            <h1 className='order'>Order Summary</h1>
            <h3>Items Ordered: {cart.length}</h3>
            <p>Product Price: ${formatNumber(total)}</p>
            <p> <small>Shipping Cost: ${shipping}</small> </p>
            <p><small>Tax + VAT: ${formatNumber(tax)}</small></p>
            <h2>Total Price: <span className='last-total'>${formatNumber(grandTotal)}</span></h2>
            <button className='main-button'>Review Your Order</button>
            
        </div>
    );
};

export default Cart;