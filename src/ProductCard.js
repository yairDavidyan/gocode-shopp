import './ProductCard.js';
import './productCard.css';


function ProductCard(props) {
  const { productCard } = props;
  return (
    <div className="product-card">
    <div className="product-image">
        <img src={productCard.image}
          alt={productCard.title} title={productCard.description} />
    </div>
    <div className="product-info">
    <h5>{productCard.title}</h5>
    <h6>{productCard.price}</h6>
    </div>
  </div>
  );
}

export default ProductCard;