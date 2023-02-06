import CartIcon from "./CartIcon";

import classes from "../Styles/NavCartButton.module.css";

const NavCartButton = (props) => {
  const { countCartItems } = props;

  return (
    <button onClick={props.onClick}>
      <span className={classes.badge}>{countCartItems}</span>
      <span className={classes.icon}>
        <CartIcon />
      </span>
    </button>
  );
};

export default NavCartButton;
