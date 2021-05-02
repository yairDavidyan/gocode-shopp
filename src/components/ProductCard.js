import './productCard.css';
import { useContext, useState } from 'react';
import CartContext from "./CartContext";

function ProductCard({title, price, image, description, product,amount }) {
  
  const { setItems ,setFilter } = useContext(CartContext);
  const [count, setCount] = useState(0);

  
  
  function addCart()
  {
    // setFilter(prev => {

      
    //   return prev.map(item =>
    //     item.id === product.id
    //       ? { ...item,amount: item.amount }
    //       :item
    //       );
    // });
    setCount(prev => prev + 1);

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

  function del(prev,product) {
    var removeIndex = prev.map(item => item.id)
    .indexOf(product.id);
    return prev.splice(removeIndex, 1);
}

  function deleteCart() {
    setCount(prev => prev !== 0 ? prev - 1 : prev = 0);
   
    setItems(prev => {

      return prev.map(item =>
          //Looking for the item to delete
        item.id === product.id ?
             item.amount > 1  ?
            { ...item, amount: item.amount - 1 }
            //Deletes the item from the cart
              : del(prev,product)
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
          <h3 style={{ margin: '12px 15px 13px 16px'}}>{count}</h3>
          <button className="plus-button" onClick={addCart}>+</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;