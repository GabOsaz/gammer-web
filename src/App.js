import React, {lazy, useContext, Suspense} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.css';
import AppShell from './AppShell';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { FetchProvider } from './context/FetchContext';
import FourOFour from './pages/FourOFour';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

const Users = lazy(() => import('./pages/Users'));
const RegisteredSchools = lazy(() => import('./pages/RegisteredSchools'));
const AcceptedSchools = lazy(() => import('./pages/AcceptedSchools'));
const FixGame = lazy(() => import('./pages/FixGame'));
const Fixtures = lazy(() => import('./pages/Fixtures'));

// const AuthenticatedRoute = ({ children, ...rest}) => {
//   const authContext = useContext(AuthContext);
//   return (
//     <Route {...rest} render = {() =>
//       //   (<AppShell> { children } </AppShell>)
//       // }>
//       authContext.isAuthenticated() ? 
//       (<AppShell> { children } </AppShell>)
//       : 
//       (<Redirect to='/' />)
//     }>
//     </Route>
//   )
// }

const AdminRoute = ({ children, ...rest }) => {
  const authContext = useContext(AuthContext);
  console.log(authContext.isAuthenticated(), authContext.isAdmin())

  return (
    // <Route {...rest} render = {() =>
    //   <AppShell> { children } </AppShell>
    // }>
    // </Route>
    <Route {...rest} render = {() =>
      authContext.isAuthenticated() && authContext.isAdmin() ? 
    (<AppShell> { children } </AppShell>)
              : 
      (<Redirect to='/' />)
    }>
    </Route>
  )
}

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>

        {/* <AdminRoute path="/dashboard"> gamemaster1 gamemaster123
          <Dashboard />
        </AdminRoute> */}
        {/* <AuthenticatedRoute path="/dashboard">
          <Dashboard />
        </AuthenticatedRoute> */}
        <AdminRoute path="/users">
          <Users />
        </AdminRoute>
        <AdminRoute path="/registeredSchools">
          <RegisteredSchools />
        </AdminRoute>
        <AdminRoute path="/acceptedSchools">
          <AcceptedSchools />
        </AdminRoute>
        <AdminRoute path="/fixGame">
          <FixGame />
        </AdminRoute>
        <AdminRoute path="/fixtures">
          <Fixtures />
        </AdminRoute>

        <Route path="*">
          <FourOFour />
        </Route>
      </Switch>
    </Suspense>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <FetchProvider>
          <div className="bg-gray-100">
            <AppRoutes />
          </div>
        </FetchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
