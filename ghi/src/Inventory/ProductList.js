// Dependencies
import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";

// Components
import ProductCard from "./ProductCard";

//CSS

export default function ProductList() {
   const [products, setProducts] = useState([]);
   // const [cart, setCart] = useState([])

   useEffect(() => {
      async function getProducts() {
         const url = `${process.env.REACT_APP_INVENTORY_HOST}/products`;
         const response = await fetch(url);
         if (response.ok) {
            const data = await response.json();
            setProducts(data);
         }
      }
      getProducts();
   }, [setProducts]);

   return (
      <div>
         <h1>Chewier Picks</h1>
         <Row>
            {products.map(product => (
               <Col sm={12} md={3} lg={2} key={product.id}>
                  <div className="product-card">
                     <ProductCard product={product} />
                  </div>
               </Col>
            ))}
         </Row>
      </div>
   );
}
