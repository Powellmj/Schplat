import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { signup, login } from '../../actions/session_actions';

const SessionForm = () => {
  const [state, setState] = useState({
    email: '',
    handle: '',
    password: '',
  })
  
  const errors = useSelector(state => state.errors.session);
  const history = useHistory();
  const dispatch = useDispatch();
  const signupPage = history.location.pathname === '/signup'

  const update = (value, field) => {
    setState(prevState => ({ ...prevState, [field]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault();
    const user = { ...state, created_date: Date.now() };
    signupPage ? dispatch(signup(user)) : dispatch(login(user));
  }

  const renderErrors = () => {
    return (
      <ul>
        {Object.keys(errors).map((error, i) => (
          <li key={`error-${i}`}>
            {errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="signup-form-container">
      <form onSubmit={handleSubmit}>
        <div className="signup-form">
          <div>
            <input type="text"
              value={state.email}
              onChange={e => update(e.target.value, 'email')}
              placeholder="Email"
            />
          </div>
          {signupPage ? 
          <div>
            <input type="text"
              value={state.handle}
              onChange={e => update(e.target.value, 'handle')}
              placeholder="Handle"
            />
          </div> : null}
          <div>
            <input type="password"
              value={state.password}
              onChange={e => update(e.target.value, 'password')}
              placeholder="Password"
            />
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
          {renderErrors()}
        </div>
      </form>
    </div>
  );
};

export default SessionForm;