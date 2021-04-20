import ProductCard from './ProductCard.js';
import './products.css';

function Products({products}) {
 
  return (
    <section className="Products">
      {products.map(product => (
        <ProductCard
          key={product.id}
          image={product.image}
          title={product.title}
          description={product.description}
          category={product.category}
        />
      ))}
 </section> 
  );
}

export default Products;