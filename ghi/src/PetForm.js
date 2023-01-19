import { useState } from 'react';
import { useAuthContext } from "./Auth";

function FancyBootStrappin(props) {
    const { id, placeholder, labelText, value, onChange, type } = props;



    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{labelText}</label>
            <input value = {value} onChange = {onChange} required type={type} className="form-control" id={id} placeholder={placeholder}/>
        </div>

    );
}

function PetForm(props) {
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [size, setSize] = useState('');
    const [age, setAge] = useState('');
    const { token } = useAuthContext();
    // console.log(token)

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
            }
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newPet = await response.json();
            // console.log(newPet)

            clearState();
        }
    };

    const clearState = () => {
        setName('');
        setBreed('');
        setSize('');
        setAge('');
    };

    return (
    <form onSubmit={handleSubmit} id= "pets-form">
        <FancyBootStrappin
            id="petName"
            placeholder = "Plz to give name"
            labelText = "What's your crites name?  Don't leave us hanging, now."
            value = {name}
            onChange = {e => setName(e.target.value)}
            type = "text"/>
        <FancyBootStrappin
            id="petType"
            placeholder = "Doggo or catto?"
            labelText = "Is it a dog? Is it a cat?  Let us know!  Unless it's a catdog, and then maybe you should just head to the vet instead."
            value = {breed}
            onChange = {e => setBreed(e.target.value)}
            type = "text"/>
        <FancyBootStrappin
            id="petSize"
            placeholder = "It's okay, we love the chonks and won't judge."
            labelText = "Are they a big 'un you can ride like a pony?  Or can you lose them in a laundry pile?  Give us the deets."
            value = {size}
            onChange = {e => setSize(e.target.value)}
            type = "text"/>
        <FancyBootStrappin
            id="petAge"
            placeholder = "All pets are bebbies, but we're going to need an actual number here."
            labelText = "Are they bebby?  A moody teenager?  A super duper senior?"
            value = {age}
            onChange = {e => setAge(e.target.value)}
            type = "text"/>

            <button type="submit" className ="btn btn-primary">Add pet</button>
            </form>
            );
}
export default PetForm;
