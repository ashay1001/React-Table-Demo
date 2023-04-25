import React, { useEffect, useState } from 'react';
import TableComponent from './Table/TableComponent';
import { columnsData } from './Table/columnsData';
import { Portal } from './portal';
import { createPortal } from 'react-dom';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://randomuser.me/api/?results=100');
      const { results } = await res.json();
      setData(results);
    };
    fetchData();
  }, []);

  //console.log(data);

  return (
    <>
      {data.length > 0 ? <TableComponent data={data} columns={columnsData} table_heading="Table Title" /> : 'Loading...'}
    </>
  );
}

export default App;
