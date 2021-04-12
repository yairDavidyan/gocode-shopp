import './ProductCard.js';
import './App.css';


function ProductCard() {
    
  async function title() {
    let res = await fetch("https://fakestoreapi.com/products");

    let json = await res.json();

    console.log(json);
  }
  title();
  const listItems = json.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}
export default ProductCard;