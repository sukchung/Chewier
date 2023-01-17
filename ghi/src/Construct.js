// function Construct(props) {

//     const pad2 = num => String(num).padStart(2, '0');

//     return (
//         <div className="App">
//             <header className="App-header">
//                 <h1>Under construction</h1>
//                 <h2>Coming on (or before)</h2>
//                 <h2>{props.info.year}-{pad2(props.info.month)}-{pad2(props.info.day)}</h2>
//                 <h2>by or <strong>WELL BEFORE</strong> {pad2(props.info.hour)}:{pad2(props.info.min)}</h2>

//             </header>
//         </div>
//     )
// }

// export default Construct;

//  import React from "react";
 import { useState } from "react";

 function BoostrapInput(props) {
    const { id, placeholder, labelText, value, onChange,type } = props;

    return (
        <div className="mb-3">
            <label htmlFor={ id } className="form-label">{labelText}</label>
            <input value={ value } onChange={ onChange } required type={ type } className="form-control" id={ id } placeholder={ placeholder }/>
        </div>

    );

 }

 function FoodProductForm(props) {
    const [main_ingredient, setMainIngredient] = useState('');
    const [state, setState] = useState('');
    return (
        <form>
            <BoostrapInput
            id="text"
            placeholder="Chicken"
            labelText="Main Ingredient"
            value={main_ingredient}
            onChange={e => setMainIngredient(e.target.value)}
            type="text" />
            <BoostrapInput
            id="text"
            placeholder="Hard/Dry"
            labelText="Food State"
            value={state}
            onChange={e => setState(e.target.value)}
            type="text" />


            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
 }

 export default FoodProductForm
