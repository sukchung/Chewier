import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Auth";

import "../Styles/AccountDetail.css";
import doghugging from "../Images/doghugging.jpeg";

function AccountDetail() {
  const { token } = useAuthContext();
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/petsform");
  };

  const handleView = () => {
    navigate("/petslist");
  };

  return (
    <>
      <div className="container1">
        <h2 style={{ fontSize: "34px" }} className="heading pt-4">
          My Account
        </h2>
      </div>
      <section className="text-gray-600 body-font">
        <div className="container1 pt-0 px-5 py-24 mx-auto">
          <div className="p-4 md:w-1/3">
            <div className="h-full rounded-xl shadow-cla-violate bg-gradient-to-r from-pink-50 to-red-50 overflow-hidden">
              <img
                className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
                src={doghugging}
                alt="hugging dog"
              />
              <div className="p-6">
                <h1 className="title-font text-lg font-medium text-gray-600 mb-3">
                  {token?.account.first_name} {token?.account.last_name}
                </h1>
                <p className="leading-relaxed mb-3">
                  Email Address: {token?.account.email}
                </p>
                <p className="leading-relaxed mb-3">
                  Address: {token?.account.address}
                </p>
                <div className="container1 flex space-x-10 items-center flex-wrap">
                  <button
                    className="bg-violet-500 text-slate-100 px-4 py-1 rounded-lg"
                    type="button"
                    onClick={handleAdd}
                  >
                    Add a Pet
                  </button>
                  <button
                    className="bg-violet-500 text-slate-100 px-4 py-1 rounded-lg"
                    type="button"
                    onClick={handleView}
                  >
                    View My Pets
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AccountDetail;
