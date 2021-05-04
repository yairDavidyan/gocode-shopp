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
  const [sliderProduct, setSliderProduct] = useState([]);
  const [value, setValue] = useState([0,1000]);


  const categories = products.map(p => p.category).filter((value, index, array) => array.indexOf(value) === index);

  // if (!isShown) {
  //   setValue([products.reduce((min, p) => p.price < min ? p.price : min, products[0].price),products.reduce((max, p) => p.price > max ? p.price : max, products[0].price)]);
  // }


  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => (setProducts(data),setSliderProduct(data)))
      .then(data=> setProducts(data => {
        return data.map((el) =>
          el.id ?
            { ...el, amount: 0 }
            : el
        );
      }),)
      .then(setShown(false))
    
  }, []);
  console.log(sliderProduct);
  return (
    <CartContext.Provider value={{sliderProduct,products,items,setProducts,setItems,setShown,isShown,setValue,value}}>
      <div>
        <Header  categories={categories} changeDisplay={(category)=>setChoice(category)} />
          <div className="divContainer" >
                <div>
                  <Cart/>
                </div>
                {isShown && <Load />}
              <Products products={products.filter(
            (el) => (el.price > value[0] && el.price < value[1]) && (el.category === choice || choice === "all products" )
          )}  />
            </div>
        </div>
      </CartContext.Provider>
  );
}
export default App;
