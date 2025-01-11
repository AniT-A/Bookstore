import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import './index.css';

function AddBook(props) {
    const [open, setOpen] = useState(false)
    const [book, setBook] = useState({ title: '', author: '', year: '', isbn: '', price: '' })

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        props.addBook(book)
        handleClose()
    }

    const inputChanged = (event) => {
        setBook({ ...book, [event.target.name]: event.target.value })
    }

    return (
        <>
            <Button id="addbook" variant="outlined" size="large" color="" onClick={handleOpen}>Add book</Button><br />
            <Dialog open={open}>
                <DialogTitle>New book</DialogTitle>
                <DialogContent>
                    <TextField
                        name="title"
                        value={book.title}
                        onChange={inputChanged}
                        margin="dense"
                        label="Title"
                        fullWidth
                    />
                    <TextField
                        name="author"
                        value={book.author}
                        onChange={inputChanged}
                        margin="dense"
                        label="Author"
                        fullWidth
                    />
                    <TextField
                        name="year"
                        value={book.year}
                        onChange={inputChanged}
                        margin="dense"
                        label="Year"
                        fullWidth
                    />
                    <TextField
                        name="isbn"
                        value={book.isbn}
                        onChange={inputChanged}
                        margin="dense"
                        label="ISBN"
                        fullWidth
                    />
                    <TextField
                        name="price"
                        value={book.price}
                        onChange={inputChanged}
                        margin="dense"
                        label="Price"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose}>Cancel</Button>
                    <Button color="primary" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

AddBook.propTypes = {
    addBook: PropTypes.func.isRequired,
};

export default AddBook