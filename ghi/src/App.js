// Dependencies
import { AuthProvider, useToken } from "./Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Nav from "./Nav";
import MainPage from "./MainPage";
import SignupForm from "./Accounts/SignupForm";
import LogInForm from "./Accounts/LoginForm";
import AccountDetail from "./Accounts/AccountDetail";
import PetForm from "./Accounts/PetForm";
import PetList from "./Accounts/PetList";
import ProductPage from "./Inventory/ProductPage";
import Cart from "./Cart/Cart";
import CustomizationForm from "./Customization/CustomizationForm";

// CSS
import "./App.css";

function GetToken() {
  useToken();
  return null;
}

const domain = /https:\/\/[^/]+/;
const basename = process.env.PUBLIC_URL.replace(domain, "");

function App(props) {
  const [cartItems, setCartItems] = useState([]);
  const [cartIsShown, setCartIsSHown] = useState(false);

  const showCartHandler = () => {
    setCartIsSHown(true);
  };

  const hideCartHandler = () => {
    setCartIsSHown(false);
  };

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <GetToken />
        <Nav onShowCart={showCartHandler} countCartItems={cartItems.length} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="products"
            element={
              <>
                <ProductPage onAdd={onAdd} />
                {cartIsShown && (
                  <Cart
                    onAdd={onAdd}
                    onRemove={onRemove}
                    cartItems={cartItems}
                    onClose={hideCartHandler}
                    setCartItems={setCartItems}
                  />
                )}
              </>
            }
          />
          <Route path="signup" element={<SignupForm />} />
          <Route path="login" element={<LogInForm />} />
          <Route path="petslist" element={<PetList pets={props.pets} />} />
          <Route path="petsform" element={<PetForm pet={props.pet} />} />
          <Route
            path="account"
            element={<AccountDetail account={props.account} />}
          />
          <Route path="custom" element={<CustomizationForm />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
