import React, { useState, useContext } from 'react';
import { When } from 'react-if';
import { LoginContext } from '../../Context/Auth';

function Login() {
  const { loggedIn, login, logout } = useContext(LoginContext);
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    name === 'username' ? setusername(value) : setPassword(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <>
      <When condition={loggedIn}>
        <button onClick={logout}>Log Out</button>
      </When>

      <When condition={!loggedIn}>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="UserName"
            name="username"
            onChange={handleChange}
          />
          <input
            placeholder="password"
            name="password"
            type="password"
            onChange={handleChange}
          />
          <button>Login</button>
        </form>
      </When>
    </>
  );
}

export default Login;