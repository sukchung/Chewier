// Dependencies
import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";

// Components
import ProductCard from "./ProductCard";

//CSS
import "../Styles/ProductPage.css";
import petbanner from "../Images/petbanner.jpg";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      const url = `${process.env.REACT_APP_INVENTORY_HOST}/products`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
      setLoading(false);
    }
    getProducts();
  }, []);

  if (loading) {
    return <div className="center-div">Loading some Chewier goodies...</div>;
  }

  return (
    <div className="products-page">
      <div className="banner-container">
        <img
          src={petbanner}
          className="center-banner"
          alt="purple banner with dog"
        />
        <div className="center-text">Chewier Picks</div>
      </div>
      <Row>
        {Array.isArray(products) &&
          products.length > 0 &&
          products.map((product) => (
            <Col sm={12} md={4} lg={3} key={product.id}>
              <div className="product-card">
                <ProductCard product={product} />
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
}
