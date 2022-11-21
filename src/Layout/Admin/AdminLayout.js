import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { MdDashboard, MdSettingsApplications, MdPermMedia } from 'react-icons/md';
import { FaUserFriends, FaBlogger,FaEdit } from 'react-icons/fa';
import { useUserAuth } from "../../Context/UserAuthContext";

const AdminLayout = ({children}) => {
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
  console.log(window.location, "location")
  return (
    <>
      <main className="row" style={{height: "100vh"}}>
        <div className="sideBardiv col-2">
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{height: "100%"}}>
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                  <svg className="bi pe-none" width="40" height="32"></svg>
                  <span className="fs-4">Blog Admin</span>
                </a>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                  <li className="nav-item">
                      <a 
                        href="/Dashboard" 
                        className={
                          window.location.pathname === "/Dashboard" 
                          ? "nav-link d-flex align-items-center active"
                          : "nav-link d-flex align-items-center text-white"
                        } 
                        aria-current="page"
                      >
                        <MdDashboard className="m-1"/>
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a href="/userdata" className={
                          window.location.pathname === "/userdata" 
                          ? "nav-link d-flex align-items-center active"
                          : "nav-link d-flex align-items-center text-white"
                        } >
                      <FaUserFriends className="m-1"/>
                        User Data
                      </a>
                    </li>
                    <li>
                      <a href="/blogdata" className={
                          window.location.pathname === "/blogdata" 
                          ? "nav-link d-flex align-items-center active"
                          : "nav-link d-flex align-items-center text-white"
                        } >
                        <FaBlogger className="m-1"/>
                        Blog Data
                      </a>
                    </li>
                    <li>
                    <a href="/blogsettings" className={
                          window.location.pathname === "/blogsettings" 
                          ? "nav-link d-flex align-items-center active"
                          : "nav-link d-flex align-items-center text-white"
                        }>
                        <MdSettingsApplications className="m-1"/>
                        Blog Settings
                    </a>
                    </li>
                    <li>
                    <a href="/media" className={
                          window.location.pathname === "/media" 
                          ? "nav-link d-flex align-items-center active"
                          : "nav-link d-flex align-items-center text-white"
                        }>
                        <MdPermMedia className="m-1"/>
                        Media
                    </a>
                    </li>
              </ul>
            </div>
        </div>
        <div className="maindiv col-10">
            <div className="navSection">
                    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 px-4 border-bottom">
                      <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                        <h4 style={{paddingLeft: "20px"}}> Blog Admin</h4>
                      </a>
                
                      <div className="col-md-3 text-end">
                        <a href="/" className='me-2'>
                            <Button variant="outline-dark">View Blogs</Button>
                        </a>
                        <Button variant="warning" onClick={handleLogout}>Log out</Button>
                      </div>
                    </header>
            </div>
            {children}
            <footer>
                <span>© 2022 Company, Inc</span>
            </footer>
        </div>
    </main> 
    </>
  );
};

export default AdminLayout;