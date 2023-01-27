import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./Auth";
import "./Styles/AccountDetail.css";
import addpet from "./Images/addpet.jpg";
import viewpet from "./Images/viewpet.jpg";

function AccountDetail() {
  const { token } = useAuthContext();
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate('/petsform')
  }

  const handleView = () => {
    navigate('/petslist')
  }

  return (
    <>
      <h1>Account Details</h1>
      <div class="container">
        <div class="info">
          <h2>Name</h2>
          <p class="text">
            {token?.account.first_name} {token?.account.last_name}
          </p>
          <h2>Email</h2>
          <p class="text">{token?.account.email}</p>
          <h2>Address</h2>
          <p class="text bottom-text">{token?.account.address}</p>
        </div>
        <div class="buttons">
          <div class="add">
            <div class="pic-container">
              <img src={addpet} alt="" />
            </div>
            <button
              type="button"
              class="btn btn-primary btn-lg"
              onClick={handleAdd}
            >
              Add A Pet
            </button>
          </div>
          <div class="view">
            <div class="pic-container">
              <img src={viewpet} alt="" />
            </div>
            <button
              type="button"
              class="btn btn-primary btn-lg"
              onClick={handleView}
            >
              View Your Pets
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountDetail;
