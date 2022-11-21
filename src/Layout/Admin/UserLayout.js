import React from 'react'
import { Button } from 'react-bootstrap';
import { FaBlogger } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../Context/UserAuthContext';

const UserLayout = ({children}) => {
  const { logOut } = useUserAuth();
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
    <header className="p-3 text-bg-dark">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <FaBlogger />  FireBlog
        </a>
        <div className="col-12 col-lg-auto me-lg-auto mb-2 mb-md-0">
        </div>
        <ul className="nav">
          <li>
            <a 
              href="/" 
              className={
                window.location.pathname === "/" 
                ? "nav-link px-2 text-secondary" 
                : "nav-link px-2 text-white"
              } 
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="/Featured" 
              className={
                window.location.pathname === "/Featured" 
                ? "nav-link px-2 text-secondary" 
                : "nav-link px-2 text-white"
              } 
            >
              Featured
            </a>
          </li>
          <li>
            <a 
              href="/Categories" 
              className={
                window.location.pathname === "/Categories" 
                ? "nav-link px-2 text-secondary" 
                : "nav-link px-2 text-white"
              } 
            >
              Categories
            </a>
          </li>
        </ul>
        <div className="text-end">
            <a href="/Dashboard" className='me-2'>
                <Button variant="outline-light">Dashboard</Button>
            </a>
            <Button variant="warning" onClick={handleLogout}>Log out</Button>
        </div>
      </div>
    </div>
  </header>
  <main>
    {children}
  </main>
  <footer style={{background: "#000"}}>
    <div style={{textAlign: "center", color: '#fff', margin: 0, padding: "20px 0"}}>
    <p style={{margin: 0}}> © 2022 Bhupesh Singh Chauhan, LLC All rights reserved.</p>
    </div>
  </footer>
  </>
  )
}

export default UserLayout;