import { useContext, useState } from 'react';
import { SettingsContext } from '../../Context/Settings';
import { Pagination, Button, Card, Text } from '@mantine/core';
import './list.css';
import Auth from '../Auth';
import { If, Else, Then } from 'react-if';
import { LoginContext } from '../../Context/Auth';

const List = ({ list, toggleComplete, deleteItem }) => {
  const { displayCount, showComplete } = useContext(SettingsContext);
  const [activePage, setPage] = useState(1);
  const { loggedIn, can } = useContext(LoginContext);


  const listToRender = showComplete ? list : list.filter(item => !item.complete);
  const listStart = displayCount * (activePage - 1);
  const listEnd = listStart + displayCount;
  const pageCount = Math.ceil(listToRender.length / displayCount);
  console.log('pageCount', pageCount);
  const displayList = listToRender.slice(listStart, listEnd);

  return (
    <>
      {displayList.map(item => (
        <Card key={item.id} shadow="sm" className="list-card">
          <div className="list-header">
            <If condition={loggedIn && can('update')}>
              <Then>
                <Text size="sm" className={item.complete ? 'complete' : 'pending'} onClick={() => toggleComplete(item.id)}>
                  {item.complete ? 'Complete' : 'Pending'}
                </Text>
              </Then>
              <Else>
                <Text size="sm" className={item.complete ? 'complete' : 'pending'}>
                  {item.complete ? 'Complete' : 'Pending'}
                </Text>
              </Else>
            </If>
            <Text size="sm" className="list-assignee">{item.assignee}</Text>
            <Auth capability="delete">
              <Button variant="subtle" className="list-close-button" onClick={() => deleteItem(item.id)}>X</Button>
            </Auth>
          </div>
          <div className="list-body">
            <Text size="lg" className="list-item-text">{item.text}</Text>
            <Text size="sm" className="list-difficulty">{`Difficulty: ${item.difficulty}`}</Text>
          </div>
        </Card>
      ))}

      <Pagination value={activePage} onChange={setPage} total={pageCount} />
    </>
  )
};

export default List;
