// Dependencies
import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";

//CSS
import "../Styles/ProductPage.css";
import petbanner from "../Images/petbanner.jpg";

const getFilteredItems = (query, items) => {
  if (!query) {
    return items;
  }

  return items.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
};

export default function ProductPage(props) {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [copyProducts, setCopyProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { onAdd } = props;
  const filteredItems = getFilteredItems(query, products);

  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      const url = `${process.env.REACT_APP_INVENTORY_HOST}/products`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        setCopyProducts(data);
      }
      setLoading(false);
    }
    getProducts();
  }, [setProducts]);

  const handleBtns = (e) => {
    let word = e.target.value;
    if (word === "All") {
      setProducts(copyProducts);
    } else if (word === "Dry") {
      const filtered = products.filter((item) => item.state === "Dry");
      setProducts(filtered);
    } else if (word === "Wet") {
      const filtered = products.filter((item) => item.state === "Wet");
      setProducts(filtered);
    }
  };

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
        <input type="text" onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className="btns">
        <button value="All" onClick={handleBtns}>
          All
        </button>
        <button value="Dry" onClick={handleBtns}>
          Dry
        </button>
        <button value="Wet" onClick={handleBtns}>
          Wet
        </button>
      </div>
      <div className="container">
        <div className="row">
          {filteredItems.map((product) => (
            <Col sm={12} md={4} lg={3} key={product.id}>
              <ProductCard product={product} id={product.id} onAdd={onAdd} />
            </Col>
          ))}
        </div>
      </div>
    </div>
  );
}
