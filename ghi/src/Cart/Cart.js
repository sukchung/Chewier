import classes from "./Cart.module.css";
import "./Cart.css";
import CartModal from "./CartModal";
import { useEffect, useState } from "react";
import { useAuthContext } from "../Auth";

const Cart = (props) => {
  const { setCartItems, cartItems, onAdd, onRemove } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const taxPrice = itemsPrice * 0.0725;
  const shippingPrice = itemsPrice > 150 ? 0 : 9.99;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;
  const [customs, setCustoms] = useState([]);
  const { token } = useAuthContext();
  const [cartItemsClone, setCartItemsClone] = useState([]);
  const [customFoodCount, setCustomFoodCount] = useState(0);

  // Getting all custom food
  useEffect(() => {
    async function getCustoms() {
      const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/customs`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setCustoms(
          data.filter((custom) => custom.account_id === token?.account.id)
        );
      }
    }
    getCustoms();
  }, [setCustoms]);

  // clone custom food and cart items into cart clone
  useEffect(() => {
    const custom_food = customs.reduce((a, v) => {
      return [...a, { ...v, qty: 1 }];
    }, []);
    setCartItemsClone([...custom_food, ...cartItems]);
  }, [customs, cartItems]);

  useEffect(() => {
    setCustomFoodCount(customs.length);
  }, [customs]);

  // useEffect(() => {
  //   if (cartItemsClone.length !== 0) {
  //     customs.map((custom_food) => {setCartItemsClone([...cartItemsClone, {...custom_food, qty: 1}])})
  //   }
  // }, [customs])

  const onAddCustom = (custom) => {
    const exist = cartItemsClone.find((x) => x.id === custom.id);
    if (exist) {
      setCartItemsClone(
        cartItemsClone.map((x) =>
          x.id === custom.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
      setCustomFoodCount(customFoodCount + 1);
    } else {
      setCartItemsClone([...cartItemsClone, { ...custom, qty: 1 }]);
      setCustomFoodCount(customFoodCount + 1);
    }
  };

  const onRemoveCustom = (custom) => {
    const exist = cartItemsClone.find((x) => x.id === custom.id);
    if (exist.qty === 1) {
      setCartItemsClone(cartItemsClone.filter((x) => x.id !== custom.id));
      setCustomFoodCount(customFoodCount - 1);
    } else {
      setCartItemsClone(
        cartItemsClone.map((x) =>
          x.id === custom.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
      setCustomFoodCount(customFoodCount - 1);
    }
  };

  console.log("CARTITEMS", props);
  return (
    <CartModal onClose={props.onClose}>
      <h2>Cart Items</h2>
      <div>
        {cartItemsClone.length === 0 && <div>Cart Is Empty</div>}
        {cartItemsClone.map((item) => (
          <div key={item.id} className="row">
            <div className="col-2">{item.name}</div>
            <div className="col-2">
              {item.goal ? (
                <button onClick={() => onAddCustom(item)} className="add">
                  +
                </button>
              ) : (
                <button onClick={() => onAdd(item)} className="add">
                  +
                </button>
              )}
              {item.goal ? (
                <button onClick={() => onRemoveCustom(item)} className="remove">
                  -
                </button>
              ) : (
                <button onClick={() => onRemove(item)} className="remove">
                  -
                </button>
              )}
            </div>
            <div className="col-2 text-right">
              {item.qty} x ${item.price.toFixed(2)}
            </div>
          </div>
        ))}
        {cartItemsClone.length !== 0 && (
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
              {/* {console.log(customs)}
              {console.log(
                customs.filter(
                  (custom) => custom.account_id === token?.account.id
                ) !== []
                  ? 100
                  : 0
              )} */}
              <div>
                $
                {((customs.length !== 0 ? parseFloat(customFoodCount * 70.99) : 0) +
                  parseFloat(itemsPrice)).toFixed(2)}
              </div>
            </div>
            <div>
              <div>Taxes</div>
              <div>
                $
                {((customs.length !== 0 ? parseFloat(customFoodCount * 70.99 * 0.0725) : 0) +
                  parseFloat(taxPrice)).toFixed(2)}
              </div>
            </div>
            <div>
              <div>Shipping Fee</div>
              <div>${shippingPrice.toFixed(2)}</div>
            </div>
            <div>
              <div>Total Price</div>
              <div>
                <strong>
                  $
                  {((customs.length !== 0 ? parseFloat(customFoodCount * 70.99 * 1.0725) : 0) +
                    parseFloat(totalPrice)).toFixed(2)}
                </strong>
              </div>
            </div>
          </>
        )}
      </div>
    </CartModal>
  );
};

export default Cart;
