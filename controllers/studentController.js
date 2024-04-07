'use strict';

const firebase = require('../db');
const db = firebase.firestore();

const getAuthors = async (req, res) => {
    try{
        const userRef = await  db.collection("1").get()
        let usersData = [];
        userRef.forEach((doc)=> {
            usersData.push({...doc.data(), id: doc.id})
        })
        // console.log(usersData);
        res.status(200).send(usersData);
        
    }catch (e){
        console.log(`Error getting documents ${e}`);
        res.status(500).json({"error": `Error getting documents ${e}`});
    }
}

const getUsers = async (req, res) => {
    try{
        const userRef = await  db.collection("2").get()
        let usersData = [];
        userRef.forEach((doc)=> {
            usersData.push({...doc.data(), id: doc.id})
        })
        // console.log(usersData);
        res.status(200).send(usersData);
        
    }catch (e){
        console.log(`Error getting documents ${e}`);
        res.status(500).json({"error": `Error getting documents ${e}`});
    }
}

const getBooks = async (req, res) => {
    try{
        const bookRef = await  db.collection("3").get()
        let booksData = [];
        bookRef.forEach((doc)=> {
            booksData.push({...doc.data(), id: doc.id})
        })
        // console.log(usersData);
        res.status(200).send(booksData);
        
    }catch (e){
        console.log(`Error getting documents ${e}`);
        res.status(500).json({"error": `Error getting documents ${e}`});
    }
}

const addAuthor = async (req, res) => {
    const newUser = req.body;
    try {
        const userCountSnapshot = await db.collection('1').get();
        const userCount = userCountSnapshot.size;
        const newUserId = (userCount + 1).toString();
        await db.collection('1').doc(newUserId).set(newUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "There was an error adding the user." });
    }
}

const addUser = async (req, res) => {
    const newUser = req.body;
    try {
        const userCountSnapshot = await db.collection('2').get();
        const userCount = userCountSnapshot.size;
        const newUserId = (userCount + 1).toString();
        await db.collection('2').doc(newUserId).set(newUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "There was an error adding the user." });
    }
}

const addBook = async (req, res) => {
    const newUser = req.body;
    try {
        const userCountSnapshot = await db.collection('3').get();
        const userCount = userCountSnapshot.size;
        const newUserId = (userCount + 1).toString();
        await db.collection('3').doc(newUserId).set(newUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "There was an error adding the user." });
    }
}

const deleteAuthor = async (req, res) => {
    const authorID = req.params.id;   
    try {
        const doc = await db.collection("1").doc(authorID).get()
        if(!doc.exists){
            return res.status(400).json({ error: 'No such author exists.' })
        }
        await db.collection("1").doc(authorID).delete();
        res.status(200).json(true);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error deleting the author" });
    }
}

const deleteUser = async (req, res) => {
    const userID = req.params.id;
    try{
        const doc = await db.collection("2").doc(userID).get();
        if (!doc.exists) {
            return res.status(400).json({ error: "No user found!" });
        }
        await db.collection("2").doc(userID).delete();
        res.status(200).json(true);
    }catch(e){
        console.log(e);
        res.status(500).json({ error: "Error deleting the User" });
    }
}

const deleteBook = async (req, res) => {
    let bookIDS = req.body.bookIDs;
    console.log(bookIDS);
    
    for (let i=0; i < bookIDS.length; i++) {
        try {
            const doc = await db.collection("3").doc(bookIDS[i].toString()).get();
            await db.collection("3").doc(bookIDS[i].toString()).delete();
            res.status(200).json(true);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Error deleting the Book" });
        }
    }
    res.sendStatus(200);
}

module.exports = {
    getAuthors,
    getBooks,
    getUsers,
    addAuthor,
    addUser,
    addBook,
    deleteAuthor,
    deleteBook,
    deleteUser
}