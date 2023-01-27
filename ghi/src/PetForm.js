import { useState } from "react";
import { useAuthContext } from "./Auth";
import "./PetForm.css"


function FancyBootStrappin(props) {
  const { id, placeholder, labelText, value, onChange, type } = props;

  return (
    <div className="mt-5 mb-5 input">
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <input
        value={value}
        onChange={onChange}
        required
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
}

function PetForm(props) {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [size, setSize] = useState("");
  const [age, setAge] = useState("");
  const { token } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accountId = token?.account.id;
    const data = {
      name: name,
      breed: breed,
      size: size,
      age: age,
      account_id: accountId,
    };
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/pets`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newPet = await response.json();
      console.log(newPet);

      clearState();
    }
  };

  const clearState = () => {
    setName("");
    setBreed("");
    setSize("");
    setAge("");
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="p-4 mt-4 smaller-container">
          <div className="mb-3">
            <h1 className ="petHead">Add a Pet!</h1>
          </div>
            <form onSubmit={handleSubmit} id="pets-form">
              <FancyBootStrappin
                id="petName"
                placeholder="Tell us here"
                labelText="What's your pets name?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
              <FancyBootStrappin
                id="petType"
                placeholder="Dog or cat"
                labelText="What kind of pet do you have?"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                type="text"
              />
              <FancyBootStrappin
                id="petSize"
                placeholder="Eg: small, medium, large, extra large"
                labelText="How large is your pet?"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                type="text"
              />
              <FancyBootStrappin
                id="petAge"
                placeholder="Please enter a number here"
                labelText="How old is your pet?"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="text"
              />

              <button id = "add" className = "add-button">
                Add pet
              </button>
            </form>
          </div>
        </div>
    </div>
  );
}
export default PetForm;
