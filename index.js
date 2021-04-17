const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express()

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e0z6a.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));





client.connect(err => {
  const bookCollection = client.db("book-shop").collection("books");

  app.post('/addBook', (req, res) => {
    const book = req.body;
    // bookCollection.insertOne(book)
    // .then(result => {
    //   console.log(result)
    //   res.send('success')
    // })
    console.log("adding new book",book)
    res.send('success')
  })

  app.get('/books', (req, res) => {
    bookCollection.find({})
    .toArray((err, document) => {
      res.send(document)
    })
  })
});


app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(5000)