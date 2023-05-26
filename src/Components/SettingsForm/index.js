import React, { useContext, useEffect, useState } from 'react';
import { createStyles, Grid, Switch, NumberInput } from '@mantine/core';
import { SettingsContext } from '../../Context/Settings';
import './settings.css'

const useStyles = createStyles((theme) => ({
  h1: {
    backgroundColor: theme.colors.gray[8],
    color: theme.colors.gray[0],
    width: '80%',
    margin: 'auto',
    fontSize: theme.fontSizes.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  }
}));

const Settings = () => {
  const { classes } = useStyles();
  const {
    displayCount,
    showComplete,
    sort,
    setDisplayCount,
    setShowComplete,
    setSort,
    saveSettings
  } = useContext(SettingsContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveSettings();
  };

  return (
    <>
      <h1 className={classes.h1}>Manage Settings</h1>
      <Grid style={{ width: '80%', margin: 'auto' }}>
        <Grid.Col xs={12} sm={4}>
          <form className="form-container" onSubmit={handleSubmit}>

            <h2 className="form-h2">Update Settings</h2>

            <Switch 
              className="switch" 
              label="Show Completed ToDos" 
              checked={showComplete} 
              onChange={(e) => setShowComplete(e.currentTarget.checked)}
            />
            
            <NumberInput 
            className="number" 
            defaultValue={3} 
            label="Items Per Page"
            value={displayCount}
            onChange={(value) => setDisplayCount(parseInt(value))} />

            <label className="sort">
              <span>Sort Keyword</span>
              <input 
                name="sort" 
                type="text" 
                value={sort} 
                onChange={(e) => setSort(e.target.value)} 
              />
            </label>

            <label className="submit-button">
              <button type="submit">Show New Settings</button>
            </label>
          </form>
        </Grid.Col>

        <Grid.Col xs={12} sm={8}>
          <div className="updated-settings">
            <h2 className="form-h2">Updated Settings</h2>
            <p>{showComplete ? 'Show Completed ToDos' : 'Hide Completed ToDos'}</p>
            <p>{`Items Per Page: ${displayCount}`}</p>
            <p>{`Sort Keyword: ${sort}`}</p>
          </div>
        </Grid.Col>

      </Grid>
    </>
  );
};

export default Settings;