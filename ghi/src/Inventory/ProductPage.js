// Dependencies
import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";

// Components
import ProductCard from "./ProductCard";

//CSS
import "../Styles/ProductPage.css";
import petbanner from "../Images/petbanner.jpg";

const getFilteredItems = (query, items) => {
  if (!query) {
    return items;
  }
  return items.filter((product) => product.name.includes(query))
}

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');

  const filteredItems = getFilteredItems(query, products)

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
  }, []);

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
      <div>
        <label>Search</label>
        <input type="text" onChange={e => setQuery(e.target.value)} />
      </div>
      <div class="container">
        <div class="row">
          {filteredItems.map((product) => (
            <Col sm={12} md={4} lg={3} key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </div>
      </div>
    </div>
  );
}
