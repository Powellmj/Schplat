import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBar from './nav/navbar';
import MainPage from './main/main_page';
import SessionForm from './session/session_form';

const App = () => (
  <div>
    <NavBar />
    <Switch>
      <ProtectedRoute exact path="/main" component={MainPage} />
      <AuthRoute exact path="/login" component={SessionForm} />
      <AuthRoute exact path="/signup" component={SessionForm} />
    </Switch>
  </div>
);

export default App;