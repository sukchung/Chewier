import React, { useEffect, useState } from "react";
import { useAuthContext } from "../Auth";
import { NavLink } from "react-router-dom";

import "../Styles/PetList.css";
import dogstare from "../Images/dogstare.jpeg";
import cattree from "../Images/cattree.jpeg";

function PetList() {
  const [pets, setPets] = useState([]);
  const { token } = useAuthContext();

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

  return (
    <>
      <div className="container1">
        <h2 style={{ fontSize: "34px" }} className="heading pt-4">
          My Pets
        </h2>
      </div>
      <div className="flex justify-center space-x-4">
        <button
          className="bg-violet-500 text-slate-100 px-4 py-1 rounded-lg"
          type="button"
        >
          <NavLink to="/account">My Account</NavLink>
        </button>
        <button
          className="bg-violet-500 text-slate-100 px-4 py-1 rounded-lg"
          type="button"
        >
          <NavLink to="/petsform">Add a Pet</NavLink>
        </button>
      </div>
      <div>
        {pets
          .filter((pet) => pet.account_id === token?.account.id)
          .map((pet) => (
            <section className="text-gray-600 body-font" key={pet.id}>
              <div className="container1 pt-0 px-5 py-24 mx-auto">
                <div className="p-4 md:w-1/3">
                  <div className="h-full rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
                    {pet.breed.toLowerCase() === "dog" ? (
                      <img
                        className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
                        src={dogstare}
                        alt="dog staring"
                      />
                    ) : (
                      <img
                        className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
                        src={cattree}
                        alt="cat in a tree"
                      />
                    )}
                    <div className="p-6">
                      <h1 className="title-font text-lg font-medium text-gray-600 mb-3">
                        {pet.name}
                      </h1>
                      <p className="leading-relaxed mb-3">Breed: {pet.breed}</p>
                      <p className="leading-relaxed mb-3">Size: {pet.size}</p>
                      <p className="leading-relaxed mb-3">Age: {pet.age}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
      </div>
    </>
  );
}

export default PetList;
