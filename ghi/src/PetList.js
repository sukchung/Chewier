import React, { useEffect, useState } from "react";
import { useAuthContext } from "./Auth";
import { NavLink } from "react-router-dom";
import "./Styles/PetList.css";
// import { Link } from "react-router-dom";
// import { useJwt } from "react-jwt";

function PetList() {
  const [pets, setPets] = useState([]);
  const { token } = useAuthContext();
  //   const { decodedToken, isExpired } = useJwt(token);

  useEffect(() => {
    async function getPets() {
      const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/pets`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setPets(data);
      }
    }
    getPets();
  }, [setPets]);

  console.log(pets);

  return (
    <div>
      <h1 className="center">My Pets</h1>
      <div className="center-button">
        <button className="button-color">
          <NavLink to="/account" className="purple-text">My Account</NavLink>
        </button>
      </div>
      <div className="smaller-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Breed</th>
              <th>Size</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {pets
              .filter((pet) => pet.account_id === token?.account.id)
              .map((pet) => (
                <tr key={pet.id}>
                  <td>{pet.name}</td>
                  <td>{pet.breed}</td>
                  <td>{pet.size}</td>
                  <td>{pet.age}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PetList;
