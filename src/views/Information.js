import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './information.css';

function Information() {

    const { id } = useParams();
    const [bool, setBool] = useState(false);
    const [infoProduct, setInfoProduct] = useState([]);
    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(data=>setInfoProduct(data))
            
    }, []);

    return (
        <div>
            <div class="product-card-information">
		<div class="badge-information">Hot</div>
		<div class="product-tumb-information">
			<img src={infoProduct.image} alt={infoProduct.title}/>
		</div>
		<div class="product-details-information">
					<span class="product-catagory-information">{infoProduct.category}</span>
			{/* <h4><a href="">Women leather bag</a></h4> */}
			<p>{infoProduct.description}</p>
			<div class="product-bottom-details-information">
				<div class="productPrice-information"><small></small>{infoProduct.price}</div>
				<div class="product-links=information">
					{/* <a href=""><i class="fa fa-heart-information"></i></a>
					<a href=""><i class="fa fa-shopping-cart-information"></i></a> */}
				</div>
			</div>
		</div>
	</div>
            
            </div>

    );
}
export default Information;