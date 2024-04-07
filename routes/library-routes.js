const express = require('express');
const {getAuthors,
    getBooks,
    getUsers,
    addAuthor,
    addUser,
    addBook,
    deleteAuthor,
    deleteBook,
    deleteUser
      } = require('../controllers/studentController');

const router = express.Router();

router.get('/getAuthors', getAuthors);
router.get('/getUsers', getUsers);
router.get('/getBooks', getBooks);
router.post("/addAuthor", addAuthor);
router.post("/addUser", addUser);
router.post("/addBook", addBook);
router.delete("/deleteAuthor/:id", deleteAuthor);
router.delete("/deleteUser/:id", deleteUser);
router.delete("/deleteBook",  deleteBook);


module.exports = {
    routes: router
}