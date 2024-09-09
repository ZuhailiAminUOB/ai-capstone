import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/uob_logo_bluebg.png';

function Navbar() {
  return (
    <nav className="navbar border-bottom border-dark border-3" style={{ backgroundColor: '#133274' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="UOB" className="img-fluid" style={{ width: '100px', height: 'auto' }} />
        </a>
        <a className="navbar-brand text-light">UOB Fraud Detection Web Application</a>
        <form className="d-flex" role="search">
          <button className="btn btn-outline-light" type="submit">Login</button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
