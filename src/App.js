import './App.css';
import Header from './components/Header.js';
import Products from './components/Products.js';
import { useState,useEffect } from 'react';
import CartContext from './components/CartContext';
import Cart from './components/Cart';
import Load from './components/Load';


function App() {
  const [choice, setChoice] = useState("all products");
  const [products, setProducts] = useState([]);
  const [isShown, setShown] = useState(true);
  const [items, setItems] = useState([]);
  const categories = products.map(p => p.category).filter((value, index, array) => array.indexOf(value)===index);


  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => (setProducts(data)))
      .then(setShown(false))
  }, []);
  
  return (
    <CartContext.Provider value={{items,setProducts,setItems,setShown}}>
      <div>
        <Header categories={categories} changeDisplay={(category)=>setChoice(category)} />
          <div className="divContainer" >
                <div>
                  <Cart/>
                </div>
                {isShown && <Load />}
              <Products products={products.filter(
            (el) => el.category === choice || choice === "all products"
          )}  />
            </div>
        </div>
      </CartContext.Provider>
  );
}
export default App;
