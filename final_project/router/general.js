const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    let getList = new Promise((resolve,reject) => {
        resolve(res.send(JSON.stringify(books, null, 4)));
    })
    getList.then(() => {
        console.log("Book list retrieved");
    })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let getISBN = new Promise((resolve,reject) => {
        resolve(res.send(books[req.params.isbn]));
    })
    getISBN.then(() => {
        console.log("Book details based on ISBN retrieved");
    })
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let ab = [];
    let len = Object.keys(books).length;

    let getAuthor = new Promise((resolve,reject) => {
        for (let i = 1; i < len; i++) {
            if (books[i].author === req.params.author) {
                ab.push(books[i]);
            }
        };
        resolve(res.send(ab));
    })
    getAuthor.then(() => {
        console.log("Book details based on author retrieved");
    })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let tb = [];
    let len = Object.keys(books).length;

    let getTitle = new Promise((resolve,reject) => {
        for (let i = 1; i < len; i++) {
            if (books[i].title === req.params.title) {
                tb.push(books[i]);
            }
        };
        resolve(res.send(tb));
    })
    getTitle.then(() => {
        console.log("Book details based on title retrieved");
    })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    return res.send(books[req.params.isbn].reviews);
});

module.exports.general = public_users;
