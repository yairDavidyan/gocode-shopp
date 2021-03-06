import React from "react";
import ProductCard from "./ProductCard.js";
import "./products.css";

function Products({ products }) {
  return (
    <>
      <section className="Products">
        {products.map((product) => (
          <ProductCard
            id={product._id}
            key={product._id}
            image={product.image}
            title={product.title}
            description={product.description}
            category={product.category}
            price={product.price}
            product={product}
            amount={product.amount}
          />
        ))}
      </section>
    </>
  );
}

export default Products;
