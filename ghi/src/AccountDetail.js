import { useEffect, useState } from "react";
import { useAuthContext } from "./Auth";
import './index.css';

const AccountDetail = () => {
    const { token } = useAuthContext();
    const [pets, setPets] = useState([]);

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
            <div>
                <h1>Account Detail</h1>
                <ul>
                    <li>{token.account.first_name}</li>
                    <li>{token.account.last_name}</li>
                    <li>{token.account.email}</li>
                    <li>{token.account.adress}</li>
                </ul>
            </div>
            <div>
                <h1>Pets</h1>
                <h3>Create Pet</h3>
            </div>
        </>
    );
}

export default AccountDetail
