import { useContext } from "react";
import CartContext from "./CartContext";
import './Cart.css'





function Cart() {
   const {setItems ,setProducts,items} = useContext(CartContext);
   let index;
  function amountChange(val,e) {

    setItems(prev => {
      //find object in items In order to update amount
      const find = prev.find(item => item.id === val.id);
      if (find) {
        //index the object in item 
         index = prev.findIndex(x => x.id === find.id);
      }
      // if remove product in items
        if (find.amount === 1 && find.amount > e.target.value) {
          prev.splice(index, 1);
          return prev;
          /// if up amount
        } else if (find.amount < e.target.value) {
          prev[index].amount += 1;
          return prev;
        } // down amount
          else {
            prev[index].amount -= 1;
            return prev;
          }
      }
    );

    // setItems(prev => {return prev.map(item =>
    //   item.id === val.id
    //     ? e.target.value > 0
    //       ? { ...item, amount: +e.target.value }
    //       : prev.splice(prev.map(item => item.id).indexOf(val.id), 1)  
    //     :  item
    //     );
    // });
    setProducts(prev => {
      return prev.map((el) =>
        el.id === val.id ?
          { ...el, amount: val.amount-1 }
        :el
        );
    });
  
  }

    return (
      <>
       <div className="cartFixed">
        <span style={{ fontSize: '23px' ,color: 'rgb(126 127 130)' ,marginLeft :'40px'}}>Shopping Cart</span>
        
        <div className="shopping-cart">
        
          <div className="column-labels">
            <label className="product-image labal">Image</label>
            <label className="product-details labal">Product</label>
            <label className="product-price labal">Price</label>
            <label className="product-quantity labal ">Quantity</label>
            {/* <label className="product-removal">Remove</label> */}
            <label className="product-line-price labal">Total</label>
          </div>
          <div className="cardShop">
        
              {items.map((el) =>
                      
                        <div className="product">
                            <div className="product-image">
                                <img alt={el.title} src={el.image}  />
                            </div>
                            <div className="product-details">
                                <div className="product-title">{el.title}</div>
                                <p className="product-description">{el.description}</p>
                            </div>
                            <div className="product-price">{el.price}</div>
                            <div className="product-quantity">
                                <input onChange={(e)=>amountChange(el,e)}  type="number" value={el.amount} min="0" />
                            </div>
                            {/* <div className="product-removal">
                                <button onClick={()=>deleteCart(el)} className="remove-product">
                                    Remove
                            </button>
                            </div> */}
                            <div className="product-line-price">{el.price * el.amount}</div>
                      </div>)}
            
          </div>
          
          <div className="containerTotal">
                    
            <div className="totals">
            <div className="totals-item">
              <label>Quantity</label>
                  <div style={{float: 'right'}} className="" id="cart-subtotal">
                  {items.reduce((total, curr) => total + curr.amount , 0)}
                  </div>
            </div>
            {/* <div class="totals-item">
              <label>Tax (5%)</label>
              <div class="totals-value" id="cart-tax">3.60</div>
            </div> */}
            {/* <div class="totals-item">
              <label>Shipping</label>
              <div class="totals-value" id="cart-shipping">15.00</div>
            </div> */}
            <div className="totals-item totals-item-total">
              <label>Grand Total</label>
              <div className="totals-value" id="cart-total">
                {items.reduce((total, curr) => total + curr.price * curr.amount, 0).toFixed(2)}
              </div>
            </div>
              </div>
              <div style={{ borderBottom: '3px solid #eee' }}>


                <button style={{ marginBottom: '15px' }} className="checkout">payment</button>
                </div>
              </div>

          </div>
          </div>
            </>
    );
            
}
export default Cart;