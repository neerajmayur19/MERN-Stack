import express from "express";
import {Book} from '../Models/bookModel.js';
const router = express.Router();

//Route to Insert a New Book
router.post('/', async (req,res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear)
        {
            return res.status(400).send({
                message: 'Send all Required Fields',
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

//Route to Display all Books
router.get('/', async(req,res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//Route to get Books by Single ID
router.get('/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const books = await Book.findById(id);
        return res.status(200).json(books);
    }catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//Route to Update the Book based on ID
router.put('/:id', async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: 'Send all required fields: title, author, publishYear',
        });
      }
  
      const { id } = request.params;
      const result = await Book.findByIdAndUpdate(id, request.body);
      if (!result) {
        return response.status(404).json({ message: 'Book not found' });
      }
      return response.status(200).send({ message: 'Book updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

//Route to Delete a Book
router.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params;
      const result = await Book.findByIdAndDelete(id);
      if (!result) {
        return response.status(404).json({ message: 'Book not found' });
      }
      return response.status(200).send({ message: 'Book deleted successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

export default router;