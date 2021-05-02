import './productCard.css';
import { useContext, useEffect, useState } from 'react';
import CartContext from "./CartContext";

function ProductCard({title, price, image, description, product,amount }) {
  
  const { setItems ,setFilter } = useContext(CartContext);
  useEffect(() => {
    setFilter(prev => {
      return prev.map((el) =>
        el.id ?
          { ...el, amount: 0 }
          : el
      );
    });
  }, []);



  function addCart() {
    setFilter(prev => { return prev.map(item =>
        item.id === product.id
          ?{...item, amount: item.amount +1}              
          :item
          );
    });
    setItems(prev => {
      const isFound = prev.find(item => item.id === product.id);
      if (isFound) {
          return prev.map(item =>
          item.id === product.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...product, amount: 1 }];
    });
  }



  function deleteCart() {
    setFilter(prev => { return prev.map(item =>
         item.id === product.id
          ?product.amount > 0
            ?{ ...item, amount: item.amount - 1 }
          : item
        :item
           );
     });
    setItems(prev => {
      return prev.map(item =>
          //Looking for the item to delete
        item.id === product.id ?
             item.amount > 1  ?
            { ...item, amount: item.amount - 1 }
            //Deletes the item from the cart
              : prev.splice(prev.map(item => item.id).indexOf(product.id), 1)
            :item
        );
      }
    );
  }
  return (
    <div className="product-card">
        <div className="productImage">
        <img src={image} alt={title} title={description} />
        </div>
      <div className="product-info">
          <h5>{title}</h5>
        <h6 className="hh6">{price}</h6>
        <div className="plusMinus" style={{display:'flex'}}>
          <button className="minus-button" onClick={deleteCart} >-</button>
          <h3 style={{ margin: '12px 15px 13px 16px'}}>{amount}</h3>
          <button className="plus-button" onClick={addCart}>+</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;