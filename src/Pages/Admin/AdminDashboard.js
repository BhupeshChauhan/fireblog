import React from "react";
import { useNavigate } from "react-router";
import { useUserAuth } from "../../Context/UserAuthContext";

const AdminDashboard = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
        <div className="album py-5 bg-light">
            <div className="container">
                <div className="row py-lg-5">
                    <div className="col-lg-12 col-md-8 mx-auto">
                        <h1 className="fw-light"> 
                            Welcome Admin<br /> {user && user.Email}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default AdminDashboard;