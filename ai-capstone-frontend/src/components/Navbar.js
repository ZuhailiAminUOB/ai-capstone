import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/uob_logo.png';

function Navbar() {
  return (
    <nav class="navbar bg-body-tertiar bg-light border-bottom border-black border-3">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img src={logo} alt="UOB" class-name="img-fluid" style={{ width: '100px', height: 'auto' }}/>
    </a>
    <a class="navbar-brand text-dark">UOB Fraud Detection Web Application</a>
    <form class="d-flex" role="search">
      <button class="btn btn-outline-primary" type="submit">Login</button>
    </form>
  </div>
</nav>
  );
}

export default Navbar;
