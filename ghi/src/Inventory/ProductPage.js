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
      <Row className="banner-container">
        <img
          src={petbanner}
          className="center-banner pb-6"
          alt="purple banner with dog"
        />
        <div className="center-text">Chewier Picks</div>
      </Row>
      <Row className="flex justify-center">
        <Col sm={12} xl={6} className="mb-3">
          <input
            type="search"
            className="form-control block w-2/4 h-10 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Search for Chewier products..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </Col>
        <Col className="btns">
          <button
            className="bg-violet-500 hover:bg-violet-400 text-slate-50 font-bold py-2 px-4 rounded-l"
            value="All"
            onClick={handleBtns}
          >
            All
          </button>
          <button
            className="bg-violet-500 hover:bg-violet-400 text-slate-50 font-bold py-2 px-4 rounded-m"
            value="Dry"
            onClick={handleBtns}
          >
            Dry
          </button>
          <button
            className="bg-violet-500 hover:bg-violet-400 text-slate-50 font-bold py-2 px-4 rounded-r"
            value="Wet"
            onClick={handleBtns}
          >
            Wet
          </button>
        </Col>
      </Row>
      <div>
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
