// Dependencies
import { React } from "react";
import { Card } from "react-bootstrap";
// import ProductItemForm from "./FoodProductForm";




// CSS
import "../Styles/ProductCard.css";



export default function ProductCard(props) {

  const { product, onAdd } = props;
    // console.log(props)



  return (
    <Card className="my-3 p-3 rounded border-0">
      <Card.Img className="rounded-corners" src={product.picture_url} />
      <Card.Body>
        <Card.Title>
          <p>{product.name}</p>
        </Card.Title>
        <Card.Text>
          <div className="my-3">${product.price}</div>
        </Card.Text>
        {/* <div>
            <ProductItemForm/>
        </div> */}
        <div className="actions">
          <button onClick={() => onAdd(product)} className="button">
            + Add To Cart
          </button>
        </div>
      </Card.Body>
    </Card>
  );
}
