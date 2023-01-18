import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useToken } from "./Auth";
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
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/pets" element ={<PetForm pet = {props.pet}/>} />
        </Routes>
        <Routes>
          <Route path="account" element={<AccountDetail/>} />
        </Routes>
      </div>
      <AuthProvider>
        <GetToken />
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="petslist" element={<PetList pets={props.pets} />} />
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
