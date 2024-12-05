import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBook from './AddBook';

import './App.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function App() {
  const [books, setBooks] = useState([]);
  const firebaseUrl = import.meta.env.VITE_FIREBASE_URL;

  const columnDefs = [
    { field: 'title', sortable: true, filter: true},
    { field: 'author', sortable: true, filter: true},
    { field: 'year', sortable: true, filter: true},
    { field: 'isbn', sortable: true, filter: true},
    { field: 'price', sortable: true, filter: true},
    { 
      headerName: '',
      field: 'id',
      width: 100,
      cellRenderer: params => 
      <IconButton onClick={() => deleteBook(params.data.id)} size="small" color="error" data-testid="deleteButton">
        <DeleteIcon />
      </IconButton> 
    }
  ]

  useEffect(() => {
    fetchItems();
  }, [])

  const fetchItems = () => {
    fetch(`${firebaseUrl}/books.json`)
    .then(response => response.json())
    .then(data => addKeys(data))
    .catch(err => console.error(err))
  }

  const addKeys = (data) => {
    const keys = Object.keys(data);
    const valueKeys = Object.values(data).map((item, index) => 
    Object.defineProperty(item, 'id', {value: keys[index], enumerable: true}));
    setBooks(valueKeys);
  }

  const addBook = (newBook) => {
    fetch(`${firebaseUrl}/books.json`,
    {
      method: 'POST',
      body: JSON.stringify(newBook)
    })
    .then(() => fetchItems())
    .catch(err => console.error(err))
  }

  const deleteBook = (id) => {
    fetch(`${firebaseUrl}/books/${id}.json`,
    {
      method: 'DELETE',
    })
    .then(() => fetchItems())
    .catch(err => console.error(err))
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: '#bb7f0e'}}>
          <Typography variant="h3" sx={{ fontFamily: 'Satisfy, cursive', fontWeight: 'bold', width: "100%", alignItems: "center"}}>
            Bookstore
          </Typography>
        </Toolbar>
      </AppBar>
      <br />
      <AddBook addBook={addBook} /> 
      <br />
      <div className="ag-theme-material" style={{ height: 500, width: 1200 }}>
        <AgGridReact rowData={books} columnDefs={columnDefs} enableCellTextSelection={true}/>
      </div>
    </>
  );
}

export default App