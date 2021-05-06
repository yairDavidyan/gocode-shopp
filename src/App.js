import './App.css';
import Header from './components/Header.js';
import Products from './components/Products.js';
import { useState,useEffect } from 'react';
import CartContext from './components/CartContext';
import Cart from './components/Cart';
import Load from './components/Load';
import { Route, Switch } from 'react-router';
import Information from './views/Information';


function App() {
  const [choice, setChoice] = useState("all products");
  const [products, setProducts] = useState([]);
  const [isShown, setShown] = useState(true);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState([0, 1000]);

 
 
  const categories = products.map(p => p.category).filter((value, index, array) => array.indexOf(value) === index);
  
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => (setProducts(data), setValue([data.reduce((min, p) => p.price < min ? p.price : min, data[0].price),
        data.reduce((max, p) => p.price > max ? p.price : max, data[0].price)])))
      .then(data=>setProducts(data => {
        return data.map((el) =>
          el.id ?
            { ...el, amount: 0 }
            : el
        );
      }),)
      .then(setShown(false))    
  }, []);
  
  function changeDisplay(category) {  
    setChoice(category);
  
}

  return (
    <CartContext.Provider value={{ products, items, setProducts, setItems, setValue, value }}>
       
      
      <Switch>
        <Route path="/products/:id">
        <Information/>
        </Route>
        <Route exact path="/" >
      <div>
        <Header categories={categories} changeDisplay={changeDisplay} />
          <div className="divContainer" >
                <div>
                  <Cart/>
                </div>
              {isShown ? <Load /> : (
                <Products products={products.filter(
                  (el) => ((el.category === choice || choice === "all products") &&
                    (el.price >= value[0] && el.price <= value[1]))
                )} />
              )}
            </div>
          </div>
          </Route>
        </Switch>
      </CartContext.Provider>
  );
}
export default App;
//(category) => setValue([products.reduce((min, p) => p.category === category ? p.price < min ? p.price : min : min, products[0].price)
//, products.reduce((max, p) => p.category === category? p.price > max ? p.price : max:max, products[0].price)])
