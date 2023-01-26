// Dependencies
import { AuthProvider, useToken } from "./Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AccountDetail from "./AccountDetail";
import MainPage from "./MainPage";
import PetForm from "./PetForm";
import PetList from "./PetList";
import Nav from "./Nav";
import SignupForm from "./Accounts/SignupForm";
import ProductPage from "./Inventory/ProductPage";
import LogInForm from "./LoginForm";
import Cart from "./Cart/Cart";
import "./App.css";
import CustomizationForm from "./CustomizationForm";

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

// import { useEffect, useState } from 'react';
// import Construct from './Construct.js'
// import ErrorNotification from './ErrorNotification';
// import './App.css';

// function App() {
//   const [launch_info, setLaunchInfo] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function getData() {
//       let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
//       console.log('fastapi url: ', url);
//       let response = await fetch(url);
//       console.log("------- hello? -------");
//       let data = await response.json();

//       if (response.ok) {
//         console.log("got launch data!");
//         setLaunchInfo(data.launch_details);
//       } else {
//         console.log("drat! something happened");
//         setError(data.message);
//       }
//     }
//     getData();
//   }, [])

//   return (
//     <div>
//       <ErrorNotification error={error} />
//       <Construct info={launch_info} />
//     </div>
//   );
// }

// export default App;
