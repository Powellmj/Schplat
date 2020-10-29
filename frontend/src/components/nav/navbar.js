import React from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../actions/session_actions';

const NavBar = () => {
  const loggedIn = useSelector(state => state.session.isAuthenticated);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Schplat</h1>
      {loggedIn ? 
      <div>
        <Link to={'/profile'}>Profile</Link>
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
      :
      <div>
        <Link to={'/signup'}>Signup</Link>
        <Link to={'/login'}>Login</Link>
      </div>}
    </div>
    );
};

export default NavBar;