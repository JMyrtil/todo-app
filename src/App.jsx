import React, { useContext } from 'react';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Todo from './Components/Todo';
import Settings from './Components/SettingsForm';
import { LoginContext } from './Context/Auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { When } from 'react-if';

const App = () => {
  const { loggedIn } = useContext(LoginContext);
  return (
    <BrowserRouter>
      <Header />
      <When condition={loggedIn}>
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </When>
      <Footer />
    </BrowserRouter>
  );
}

export default App