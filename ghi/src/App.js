// Dependencies
import { AuthProvider, useToken } from "./Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Components
import Construct from "./Construct.js";
import NavSuk from "./NavSuk";
import SignupForm from "./Accounts/SignupForm";

function GetToken() {
    useToken();
    return null
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GetToken />
        <NavSuk />
        <Routes>
          <Route path="/" element={<Construct />} />
          <Route path="accounts">
            <Route path="new" element={<SignupForm />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
