import { useState, useEffect,useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import ContrastIcon from '@mui/icons-material/Contrast';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBook from './AddBook';
import useTheme from './useTheme';
import './index.css';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [books, setBooks] = useState([]);
  const firebaseUrl = import.meta.env.VITE_FIREBASE_URL;

  const columnDefs = [
    { field: 'title', sortable: true, filter: true},
    { field: 'author', sortable: true, filter: true},
    { field: 'year', sortable: true, filter: true},
    { field: 'isbn', sortable: true, filter: true},
    { field: 'price', sortable: true, filter: true},
    { headerName: '',
      field: 'id',
      cellRenderer: params => 
      <IconButton onClick={() => deleteBook(params.data.id)} size="small" color="error" data-testid="deleteButton">
        <DeleteIcon />
      </IconButton> 
    }
  ]

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const fetchItems = useCallback(() => {
    fetch(`${firebaseUrl}/books.json`)
    .then(response => response.json())
    .then(data => addKeys(data))
    .catch(err => console.error(err))
  }, [firebaseUrl])

  useEffect(() => {
    fetchItems();
  }, [fetchItems])

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

  const autoSizeStrategy = {
    type: 'fitCellContents'
  };

  return (
    <div id="main" className={theme}>
      <IconButton id="contrast-button" onClick={toggleTheme} title="Switch theme">
        <ContrastIcon id="contrasticon" />
      </IconButton>
      <div className="ag-theme-material">
        <AgGridReact rowData={books} columnDefs={columnDefs} autoSizeStrategy={autoSizeStrategy} enableCellTextSelection={true} />
      </div>
      <br />
      <AddBook addBook={addBook} />
    </div>
  );
}

export default App