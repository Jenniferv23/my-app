import React from 'react';
import Home from './pages/home';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks'

import SingUp from './pages/sing-up'
import { Switch, Route } from 'react-router-dom';
import { AuthProvider } from './context/auth-context';
import { AuthProviderUser } from './context/auth-ctx';
import Login from './pages/login';
import PrivateRoute from './components/private-route'
import ForgotPassword from './pages/forgot-password'
import UpdateProfile from './pages/update-profile';
import { ToastContainer } from 'react-toastify'


const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
})
console.log(client);
const App =()=> {
  return (
    <AuthProvider>
      <AuthProviderUser>
    <ApolloProvider client={client}>
    <ToastContainer/>
      
      <Switch>
        <PrivateRoute exact path="/" component={Home}/>
        <PrivateRoute path="/update-profile" component={UpdateProfile}/>
        <Route exact path="/sing-up" component={SingUp}/>
        <Route exact path="/login" component={Login}/>
        <Route path="/forgot-password" component={ForgotPassword}/>
        </Switch>
       
  </ApolloProvider>
  </AuthProviderUser>
  </AuthProvider>
  );
}

export default App;
