import ProductCard from './ProductCard.js';
import './products.css';

function Products(props) {

  const { products } = props;
  return (
 <section className="Products">
      {products.map(product => <ProductCard key={product.id} productCard={product} />)}
 </section> 
  );
}

export default Products;