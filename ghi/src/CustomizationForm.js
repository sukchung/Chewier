import { useState } from "react";
import { useAuthContext } from "./Auth";

function BootstrapInput(props) {
  const { id, placeholder, labelText, value, onChange, type } = props;

  return (
    <div className="mb-3">
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

function CustomizationForm(props) {
  const [goal, setGoals] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [allergies, setAllergies] = useState("");
  const [activity, setActivity] = useState("");
  const [protein, setProtein] = useState("");
  const [state, setState] = useState("");
  const [name, setName] = useState("");
  const { token } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accountId = token?.account.id;
    const data = {
      goal: goal,
      breed: breed,
      age: age,
      allergies: allergies,
      activity: activity,
      protein: protein,
      state: state,
      account_id: accountId,
      name: name,
    };
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/customs`;
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
      const newCustom = await response.json();
      console.log(newCustom);

      clearState();
    }
  };

  const clearState = () => {
    setGoals("");
    setBreed("");
    setAge("");
    setAllergies("");
    setActivity("");
    setProtein("");
    setState("");
    setName("");
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="p-4 mt-4 smaller-container">
          <div className="mb-3">
            <h2>Hello {token?.account.first_name}!</h2>
          </div>
          <form onSubmit={handleSubmit} id="customs-form">
            <BootstrapInput
              id="setGoals"
              placeholder="I want my pet to..."
              labelText="What are your goals for your pet"
              value={goal}
              onChange={(e) => setGoals(e.target.value)}
              type="text"
            />
            <BootstrapInput
              id="setBreed"
              placeholder="Breed"
              labelText="What is the breed of your pet?"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              type="text"
            />
            <BootstrapInput
              id="setAge"
              placeholder="Age"
              labelText="How old is your pet?"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="text"
            />
            <BootstrapInput
              id="setAllergies"
              placeholder="Allergies"
              labelText="Any allergies we should be aware of?"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              type="text"
            />
            <BootstrapInput
              id="setActivity"
              placeholder="Semi-active, Active, Sedentary, etc..."
              labelText="How active is your pet?"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              type="text"
            />
            <BootstrapInput
              id="setProtein"
              placeholder="Chicken, Beef, Salmon, etc..."
              labelText="What protein base would you like?"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
              type="text"
            />
            <BootstrapInput
              id="setState"
              placeholder="Wet or Dry?"
              labelText="How do you want the state of your custom food?"
              value={state}
              onChange={(e) => setState(e.target.value)}
              type="text"
            />
            <BootstrapInput
              id="setName"
              placeholder="Fido's Yummy Blend!"
              labelText="Name your custom food blend!"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
            <button type="submit" className="btn btn-primary">
              Create Custom Formula
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomizationForm;
