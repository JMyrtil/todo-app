import React, { useState, useEffect } from 'react';

export const SettingsContext = React.createContext();

const SettingsProvider = ({ children }) => {

  const [displayCount, setDisplayCount] = useState(3);
  const [showComplete, setShowComplete] = useState(false);
  const [sort, setSort] = useState('difficulty');

  const saveSettings = () => {
    const settings = { displayCount, showComplete, sort };
    localStorage.setItem('settings', JSON.stringify(settings));
  };

  useEffect(() => {
    const settingsString = localStorage.getItem('settings');
    if (settingsString) {
      const settings = JSON.parse(settingsString);
      setDisplayCount(settings.displayCount);
      setShowComplete(settings.showComplete);
      setSort(settings.sort);
    }
  }, []);

  const values = {
    displayCount,
    showComplete,
    sort,
    setDisplayCount,
    setShowComplete,
    setSort,
    saveSettings
  }

  return ( 
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  )
};

export default SettingsProvider;
