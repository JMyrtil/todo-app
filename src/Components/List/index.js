import { useContext, useState } from 'react';
import { SettingsContext } from '../../Context/Settings';
import { Pagination, Button, Card, Text } from '@mantine/core';
import './list.css';

const List = ({ list, toggleComplete }) => {
  const { displayCount, showComplete, sort } = useContext(SettingsContext);
  const [activePage, setPage] = useState(1);


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
         <Text size="sm" className="pending">Pending</Text>
         <Text size="sm" className="list-assignee">{item.assignee}</Text>
         <Button variant="subtle" className="list-close-button" onClick={() => toggleComplete(item.id)}>X</Button>
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
