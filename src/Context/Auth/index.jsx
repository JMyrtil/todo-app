import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';

const testUsers = {
  admin: {
    username: 'admin',
    password: 'ADMIN',
    email: 'admin@fakeuser.com',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTBlZDFiMzNjZTQ5MDAxODlmMzhiNyIsImNhcGFiaWxpdGllcyI6WyJjcmVhdGUiLCJ1cGRhdGUiLCJyZWFkIiwiZGVsZXRlIl0sInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjU4OTA3OTMxLCJleHAiOjE2NTg5MTE1MzF9.bqe-52if5K50rGn30P4fheuAa2qWuxse9tWiuH4cnUM',
  },
  editor: {
    username: 'editor',
    password: 'EDITOR',
    email: 'editor@fakeuser.com',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTBlZjk5MzNjZTQ5MDAxODlmMzhiYSIsImNhcGFiaWxpdGllcyI6WyJjcmVhdGUiLCJ1cGRhdGUiLCJyZWFkIl0sInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjU4OTA4NTY5LCJleHAiOjE2NTg5MTIxNjl9.073ppQCHbplYN9befn8JElcP4zgFX6TEe_ARUQZc0KU',
  },
  user: {
    username: 'user',
    password: 'USER',
    email: 'user@fakeuser.com',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTBmMGZjMzNjZTQ5MDAxODlmMzhjMCIsImNhcGFiaWxpdGllcyI6WyJyZWFkIl0sInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjU4OTA4OTI0LCJleHAiOjE2NTg5MTI1MjR9.t7c7k2LbaTxsdfYjx_WC3QiP4MycU8sZryVyXQqJQH',
  }
  
};


export const LoginContext = React.createContext();

const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({ capabilities: [] });
  const [error, setError] = useState(null);

  const can = (capability) => {
    return user?.capabilities?.includes(capability);
  };

  const login = async (username, password) => {
    let auth = testUsers[username];

    if (auth && auth.password === password) {
      try {
        validateToken(auth.token);
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