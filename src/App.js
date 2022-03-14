import React, {lazy, useContext, Suspense} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.css';
import AppShell from './AppShell';
import Loader from './components/common/Loader';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { FetchProvider } from './context/FetchContext';
import FourOFour from './pages/FourOFour';
import Home from './pages/Home';

const RegisteredSchools = lazy(() => import('./pages/RegisteredSchools'));
const AcceptedSchools = lazy(() => import('./pages/AcceptedSchools'));
const FixGame = lazy(() => import('./pages/FixGame'));
const Fixtures = lazy(() => import('./pages/Fixtures'));

const AdminRoute = ({ children, ...rest }) => {
  const authContext = useContext(AuthContext);

  return (
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
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
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
