import { Link } from "react-router-dom";
import { useAuthContext } from "./Auth";
import "./index.css";

function AccountDetail() {
  const { token } = useAuthContext();
  return (
    <>
      <div>
        <h1>Account Detail</h1>
        <p>{token?.account.first_name}</p>
        <p>{token?.account.last_name}</p>
        <p>{token?.account.email}</p>
        <p>{token?.account.address}</p>
      </div>
      <div>
        <Link to="/petslist">View Your Pets</Link>
      </div>
      <div>
        <Link to="/pets">Add Pet</Link>
      </div>
    </>
  );
}

export default AccountDetail;
