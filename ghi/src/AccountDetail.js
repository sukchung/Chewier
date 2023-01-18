import { useAuthContext } from "./Auth";
import './index.css';

function AccountDetail() {
    const { token } = useAuthContext();
    console.log(token)
    return (
        <>
            <div>
                <h1>Account Detail</h1>
                <p>{token?.account.first_name}</p>
                <p>{token?.account.last_name}</p>
                <p>{token?.account.email}</p>
                <p>{token?.account.address}</p>
            </div>
            {/* <div>
                <a>View Your Pets</a>
            </div>
            <div>
                <a>Add Pet</a>
            </div> */}
        </>
    );
}

export default AccountDetail
