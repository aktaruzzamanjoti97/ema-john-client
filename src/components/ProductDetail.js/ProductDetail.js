import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Product from "../Product/Product";

const ProductDetail = () => {
  const { productKey } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch("https://blooming-stream-08071.herokuapp.com/product/"+ productKey)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [productKey]);

  console.log(product);
  return (
    <div>
      <h1>Your Product Detail</h1>
      <Product showAddToCart={false} product={product}></Product>
    </div>
  );
};

export default ProductDetail;
<h1>Product detail coming soon</h1>;
