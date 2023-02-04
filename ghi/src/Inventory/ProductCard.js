// Dependencies
import React, { useState } from "react";
import { Card } from "react-bootstrap";

// CSS
import "../Styles/ProductCard.css";
import addtocart from "../Images/addtocart.png";

export default function ProductCard(props) {
  const { product, onAdd } = props;
  const [showCartButton, setCartButton] = useState(false);

  function showButton() {
    setCartButton(true);
  }

  function hideButton() {
    setCartButton(false);
  }

  return (
    <Card className="my-3 p-3 rounded border-0">
      <div
        className="image-container"
        onMouseEnter={showButton}
        onMouseLeave={hideButton}
      >
        <Card.Img
          className="product-image"
          src={product.picture_url}
          alt={product.name}
        />
        {showCartButton && (
          <button
            className="btn-xs btn-light rounded-pill cart-button"
            onClick={() => onAdd(product)}
          >
            <img src={addtocart} className="icon" alt="icon" />
          </button>
        )}
      </div>
      <Card.Body className="card-text-padding">
        <Card.Text className="my-3">{product.name}</Card.Text>
        <Card.Text className="my-3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}
