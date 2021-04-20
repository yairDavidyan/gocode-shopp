import './ProductCard.js';
import './productCard.css';


function ProductCard({id,title,price,image,description}) {

  return (
    <div className="product-card">
    <div className="product-image">
        <img src={image}
          alt={title} title={description} />
    </div>
    <div className="product-info">
    <h5>{title}</h5>
    <h6>{price}</h6>
    </div>
  </div>
  );
}

export default ProductCard;