import { Routes, Route, Navigate } from 'react-router-dom';
import Error from './components/error';
import Login from './pages/login';
import NewUser from './pages/newUser';
import Main from './pages/main';
import './css/App.css';
import { useState, useEffect } from 'react';
import ResetPassword from './pages/resetPassword';
import ForgotPassword from './pages/forgotPassword';

const App = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkUser = localStorage.getItem('user');
    if (checkUser) {
      setUser(JSON.parse(checkUser));
    }
  }, []);

  return (
    <div>
      <Error error={error} />

      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/main" />
            ) : (
              <Login setError={setError} setUser={setUser} />
            )
          }
        />

        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/main" />
            ) : (
              <NewUser setError={setError} setUser={setUser} />
            )
          }
        />

        <Route
          path="/main"
          element={
            user ? (
              <Main setError={setError} setUser={setUser} user={user} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/resetpassword"
          element={
            user ? (
              <Navigate to="/main" />
            ) : (
              <ResetPassword setError={setError} />
            )
          }
        />
        <Route
          path="/forgotPassword"
          element={
            user ? (
              <Navigate to="/main" />
            ) : (
              <ForgotPassword setError={setError} />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
