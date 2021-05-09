import './productCard.css';
import { useContext } from 'react';
import CartContext from "./CartContext";
import { Link } from 'react-router-dom';

function ProductCard({title, price, image, description, product,amount ,id}) {
  const {setItems ,setProducts } = useContext(CartContext);

  function addCart() {
    setProducts(prev => { return prev.map(item =>
        item.id === product.id
          ?{...item, amount: item.amount + 1}              
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

    setProducts(prev => {
     
      return prev.map(item =>
         item.id === product.id
          ?product.amount > 0
            ?{ ...item, amount: item.amount - 1 }  
          : item
        :item
           );
    });
   
    setItems(prev => {
      let index;
      const find = prev.find(item => item.id === product.id);
      console.log(find);
      if (find) {
        index = prev.findIndex(x => x.id === find.id);
        console.log(index);
      }
      if (product.amount > 0) {
        if (find.amount === 1) {
          prev.splice(index, 1);
          return prev;
        } else {
          prev[index].amount -= 1;
          return prev;
        }
      } else {
        return prev
      }
      }
    );
  }
  return (
    <>

      <div className="product-card">
        {/* <button className="button"><sp</button> */}
        <Link to={`products/${id}`}>
        <div className="productImage">
        <img src={image} alt={title} title={description} />
          </div>
          </Link>
      <div className="product-info">
          <h5>{title}</h5>
        <h6 className="hh6">{price}</h6>
        <div className="plusMinus" style={{display:'flex'}}>
          <button  className="minus-button" onClick={deleteCart} >-</button>
          <h3 style={{ marginTop: '9px'}}>{amount}</h3>
          <button className="plus-button" onClick={addCart}>+</button>
        </div>
      </div>
        </div>
      
      </>
  );
}

export default ProductCard;