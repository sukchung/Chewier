import { useEffect, useState } from "react";
import { useAuthContext } from "./Auth";
import './index.css';

const AccountDetail = () => {
    const { token } = useAuthContext();
    const [account, setAccount] = useState([]);
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

    useEffect(() => {
        fetch('http://localhost:8080/token')
            .then(response => response.json())
            .then(data => {
                setAccountId(data.account.id)
            })
            .catch(e => console.log('error: ', e));

        fetch(`http://localhost:8080/accounts/${accountId}`)
            .then(response => response.json())
            .then(data => {
                setAccount(data);
            })
            .catch(e => console.log('error: ', e));
    })
    return (
        <>
            <div>
                <h2>Account Detail</h2>
                <p>{account.first_name}</p>
                <p>{account.last_name}</p>
                <p>{account.email}</p>
                <p>{account.adress}</p>
            </div>
            <div>
                <h2>Pets</h2>
            </div>
        </>
    );
}

export default AccountDetail
