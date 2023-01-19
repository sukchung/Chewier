// Dependencies
import React from "react";
import { Card } from "react-bootstrap";

// CSS
import "../Styles/ProductCard.css";

export default function ProductCard({ product }) {
  return (
    <Card className="my-3 p-3 rounded border-0">
        <Card.Img className="rounded-corners" src={product.picture_url} />
        <Card.Body>
            <Card.Title>
                <p>
                    {product.name}
                </p>
            </Card.Title>
            <Card.Text>
                <div className="my-3">
                    ${product.price}
                </div>
            </Card.Text>
        </Card.Body>
    </Card>
  );
}
