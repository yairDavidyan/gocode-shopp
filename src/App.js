import './App.css';
import Header from './components/Header.js';
import Products from './components/Products.js';
import { useState,useEffect } from 'react';
import CartContext from './components/CartContext';
import Cart from './components/Cart';
import Load from './components/Load';



function App() {
  const [products, setProducts] = useState([]);
  const [filterList, setFilter] = useState([]);
    const [ count, setCount ] = useState(0);
  const [isShown, setShown] = useState(true);
  const [items, setItems] = useState([]);
  
const groupBy = (xs, key) => xs.reduce((rv, x) => {
  (rv[x[key]] = true || []);
  return rv;
}, {});

const categories = Object.keys(groupBy(products, 'category'));

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => (setProducts(data), setFilter(data)))
      .then(setShown(false))
  }, []);

  function changeDisplay(category) {
    setFilter(products.filter(el=> (el.category === category) ||(category === "all products")));
  }
  
  return (
    <CartContext.Provider value={{items ,setItems,isShown,setShown,setCount,filterList}}>
      <div>
        <Header categories={categories} changeDisplay={changeDisplay} />
          <div className="divContainer" >
                <div>
                  <Cart/>
                </div>
                {isShown && <Load />}
              <Products products={filterList}  />
            </div>
        </div>
      </CartContext.Provider>
   
  );
}
export default App;
