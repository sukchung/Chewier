// import { useState } from 'react';

// function FancyBootStrappin(props) {
//     const { id, placeholder, labelText, value, onChange, type } = props;



//     return (
//         <div className="mb-3">
//             <label htmlFor={id} className="form-label">{labelText}</label>
//             <input value = {value} onChange = {onChange} required type={type} className="form-control" id={id} placeholder={placeholder}/>
//         </div>

//     );
// }

// function PetForm(props) {
//     const [petName, setPetName] = useState('');
//     const [petType, setPetType] = useState('');
//     const [petSize, setPetSize] = useState('');
//     const [petAge, setPetAge] = useState('');

//     return (
//     <form>
//         <FancyBootStrappin
//             id="petName"
//             placeholder = "Plz to give name"
//             labelText = "What's your crites name?  Don't leave us hanging, now."
//             value = {token?.account.petName}
//             onChange = {e => setPetName(e.target.value)}
//             type = "text"/>
//         <FancyBootStrappin
//             id="petType"
//             placeholder = "Doggo or catto?"
//             labelText = "Is it a dog? Is it a cat?  Let us know!  Unless it's a catdog, and then maybe you should just head to the vet instead."
//             value = {token?.account.petType}
//             onChange = {e => setPetType(e.target.value)}
//             type = "text"/>
//         <FancyBootStrappin
//             id="petSize"
//             placeholder = "It's okay, we love the chonks and won't judge."
//             labelText = "Are they a big 'un you can ride like a pony?  Or can you lose them in a laundry pile?  Give us the deets."
//             value = {token?.account.petSize}
//             onChange = {e => setPetSize(e.target.value)}
//             type = "text"/>
//         <FancyBootStrappin
//             id="petAge"
//             placeholder = "All pets are bebbies, but we're going to need an actual number here."
//             labelText = "Are they bebby?  A moody teenager?  A super duper senior?"
//             value = {token?.account.petAge}
//             onChange = {e => setPetAge(e.target.value)}
//             type = "text"/>

//             <button type="submit" className ="btn btn-primary">Add pet</button>
//             </form>
//             );
// }
// export default PetForm;
