import React, { useEffect, useState } from 'react';
import useForm from '../../hooks/form';
import { createStyles, Grid } from '@mantine/core';
import List from '../List';
import './todo.css'
import Auth from '../Auth';
import axios from 'axios';

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

const Todo = () => {
  const { classes } = useStyles();
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    axios({
      url: 'https://api-js401.herokuapp.com/api/v1/todo',
      method: 'post',
      data: item
    });
    item.complete = false;
    console.log(item);
    setList([...list, item]);
  }



  function deleteItem(id) {
    axios.delete(`https://api-js401.herokuapp.com/api/v1/todo/${id}`);
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    const item = list.filter(i => i._id === id)[0] || {};
    if (item._id) {
      const url = `https://api-js401.herokuapp.com/api/v1/todo/${id}`;
      const method = 'put';
      const data = { complete: !item.complete };
      axios({ url, method, data });
      const items = list.map(item => {
        if (item.id === id) {
          item.complete = !item.complete;
        }
        return item;
      });

      setList(items);

    }
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily. 
    // disable code used to avoid linter warning 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [list]);

  useEffect(() => {
    const getData = async () => {
      let response = await axios.get('https://api-js401.herokuapp.com/api/v1/todo');
      setList(response.data.results);
    };
    getData();
  }, []);

  return (
    <>
      <header data-testid="todo-header">
        <h1 data-testid="todo-h1">To Do List: {incomplete} items pending</h1>
      </header>
      <Auth capability="create">

        <form onSubmit={handleSubmit}>

          <h2>Add To Do Item</h2>

          <label>
            <span>To Do Item</span>
            <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
          </label>

          <label>
            <span>Assigned To</span>
            <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
          </label>

          <label>
            <span>Difficulty</span>
            <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
          </label>

          <label>
            <button type="submit">Add Item</button>
          </label>
        </form>
      </Auth>
      <Grid>
        <Grid.Col xs={12} sm={8}>
          <List list={list} toggleComplete={toggleComplete} deleteItem={deleteItem} />
        </Grid.Col>
      </Grid>

    </>
  );
};

export default Todo;
