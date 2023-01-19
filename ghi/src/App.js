// Dependencies
import { AuthProvider, useToken } from "./Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Components
import Construct from "./Construct.js";
import NavSuk from "./NavSuk";
import SignupForm from "./Accounts/SignupForm";
import ProductList from "./Inventory/ProductList";

function GetToken() {
    useToken();
    return null
}

function App() {
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useToken } from "./Auth";
import AccountDetail from "./AccountDetail";
import MainPage from "./MainPage";
import PetForm from "./PetForm";
import PetList from "./PetList";

function GetToken() {
  // Get token from JWT cookie (if already logged in)
  useToken();
  return null;
}


function App(props) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GetToken />
        <NavSuk />
        <Routes>
          <Route path="/" element={<Construct />} />
          <Route path="products" element={<ProductList />} />
          <Route path="accounts">
            <Route path="new" element={<SignupForm />} />
          </Route>
        </Routes>
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="petslist" element={<PetList pets={props.pets} />} />
            <Route path="pets" element ={<PetForm pet = {props.pet}/>} />
            <Route path="account" element={<AccountDetail account = {props.account}/>} />
          </Routes>
        </div>
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
