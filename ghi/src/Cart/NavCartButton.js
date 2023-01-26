import CartIcon from "./CartIcon";
import classes from "./NavCartButton.module.css";

const NavCartButton = (props) => {
  const { countCartItems } = props;

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{countCartItems}</span>
    </button>
  );
};

export default NavCartButton;
