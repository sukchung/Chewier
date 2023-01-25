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
  const [copyProducts, setCopyProducts] = useState([]);

  const [loading, setLoading] = useState(true);

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
  }, []);

  const handleBtns = (e) =>{
  let word = e.target.value;
  if (word === "All") {
     setProducts(copyProducts)
  } else if (word === "Dry") {
     const filtered = products.filter(item => item.state === "Dry")
     setProducts(filtered)
  } else if (word === "Wet") {
     const filtered = products.filter(item => item.state === "Wet")
     setProducts(filtered)
  }
 }

  if (loading) {
    return (
      <div className="center-div">
        Loading some Chewier goodies... ᶠᵉᵉᵈ ᵐᵉ /ᐠ-ⱉ-ᐟ\ﾉ
      </div>
    );
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
      <div>
        <label>Search</label>
        <input type="text" onChange={e => setQuery(e.target.value)} />
      </div>
      <div className = "btns">
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
      <Row>
        {filteredItems.map((product) => (
          <Col sm={12} md={3} lg={2} key={product.id}>
            <div className="product-card">
              <ProductCard product={product} id={product.id} />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

// {Array.isArray(products) &&
//   products.length > 0 &&
//   products.map((product) => (
//     <Col sm={12} md={4} lg={3} key={product.id}>
//       <div className="product-card">
//         <ProductCard product={product} />
//       </div>
//     </Col>
//   ))}
