import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
const columns = [
  { field: 'categoryTagId', headerName: 'ID', width: 70 },
  { field: 'tagName', headerName: 'Tag name', width: 250 },

];

export default function DataTable() {
  const [rows, setRows] = useState([]);

  const refresh = () => {
    fetch("http://localhost:8080/categoryTag/getAll").
      then(res => res.json()).
      then((result) => {
        console.log('Result is ' + JSON.stringify(result));
        setRows(result);

      }
      );
  };

  React.useEffect(() => {
    fetch("http://localhost:8080/categoryTag/getAll").
      then(res => res.json()).
      then((result) => {
        console.log('Result is ' + JSON.stringify(result));
        setRows(result);

      }
      )
  }, []);

  return (
    <div style={{ marginLeft: '6em', height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}