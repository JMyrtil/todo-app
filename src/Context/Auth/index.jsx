import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const LoginContext = React.createContext();

const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({ capabilities: [] });
  const [error, setError] = useState(null);

  const can = (capability) => {
    return user?.capabilities?.includes(capability);
  };

  const login = async (username, password) => {
    let config = {
      method: 'POST',
      baseURL: 'https://api-js401.herokuapp.com',
      url: '/signin',
      auth: {username, password}
    }
    let response = await axios(config);
    let token = response.data.token

    if (token) {
      try {
        validateToken(token);
      } catch (e) {
        setLoggedIn(false);
        setUser({ capabilities: [] });
        setError(e);
        console.error(e);
      }
    }
  };

  const logout = () => {
    setLoggedIn(false);
    setUser({ capabilities: [] });
  };

  const validateToken = (token) => {
    try {
      let validUser = jwt_decode(token);
      setLoggedIn(true);
      setUser(validUser);
      cookie.save('auth', token);
    } catch (e) {
      setLoggedIn(false);
      setUser({ capabilities: [] });
      setError(e);
      console.log('Token Validation Error', e);
    }
  };

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load('auth');
    const token = qs.get('token') || cookieToken || null;
    validateToken(token);
  }, []);

  return (
    <LoginContext.Provider
      value={{
        loggedIn,
        user,
        error,
        can,
        login,
        logout,
      }}
    >
      { children }
    </LoginContext.Provider>
  );
};

export default LoginProvider;