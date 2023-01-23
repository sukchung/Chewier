import classes from "./Cart.module.css";
import "./Cart.css";
import CartModal from "./CartModal";

const Cart = (props) => {
  const { cartItems, onAdd, onRemove } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const taxPrice = itemsPrice * 0.14;
  const shippingPrice = itemsPrice > 150 ? 0 : 9.99;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  console.log("CARTITEMS", props);
  return (
    <CartModal onClose={props.onClose}>
      <h2>Cart Items</h2>
      <div>
        {cartItems.length === 0 && <div>Cart Is Empty</div>}
        {cartItems.map((item) => (
          <div key={item.id} className="row">
            <div className="col-2">{item.name}</div>
            <div className="col-2">
              <button onClick={() => onAdd(item)} className="add">
                +
              </button>
              <button onClick={() => onRemove(item)} className="remove">
                -
              </button>
            </div>
            <div className="col-2 text-right">
              {item.qty} x ${item.price.toFixed(2)}
            </div>
          </div>
        ))}
        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className={classes.actions}>
              <button
                className={classes["button--alt"]}
                onClick={props.onClose}
              >
                Close
              </button>
              <button
                onClick={() => alert("Thank you for your purchase!")}
                className={classes.button}
              >
                Checkout
              </button>
            </div>
            <div>
              <div>Items Price</div>
              <div>${itemsPrice.toFixed(2)}</div>
            </div>
            <div>
              <div>Taxes</div>
              <div>${taxPrice.toFixed(2)}</div>
            </div>
            <div>
              <div>Shipping Fee</div>
              <div>${shippingPrice.toFixed(2)}</div>
            </div>
            <div>
              <div>Total Price</div>
              <div>
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
            </div>
          </>
        )}
      </div>
    </CartModal>
  );
};

export default Cart;
