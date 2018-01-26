var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



//APIs
var mongoose = require('mongoose');
//mongodb://<dbuser>:<dbpassword>@ds115758.mlab.com:15758/bookstore
var url = "mongodb://jiao18:jw4321@ds115758.mlab.com:15758/bookstore" ;
mongoose.connect(url);
 //mongoose.connect('mongodb://localhost:27017/bookstore');
//mongodb://<dbuser>:<dbpassword>@ds115758.mlab.com:15758/bookstore

var db = mongoose.connection;
db.on('error', console.error.bind(console, '#MongoDB - connection error: '));
// setup sessions

app.use(session({
  secret:"mySecretString",
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 1000*60*60*24*2}, // 2 days in milliseconds
  store: new MongoStore({
    mongooseConnection: db, ttl: 2*24*60*60
  })  // ttl: 2 days * 24 hours * 60 minutes * 60 seconds
}))

//save session cart api
app.post('/cart', function(req, res){
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err){
    if (err){
      console.log('# API POST CART SESSION:', err);
    }
    res.json(req.session.cart);
  })
});

// get session art apiProxy
app.get('/cart', function(req, res){
  if (typeof req.session.cart !== 'undefined'){
    res.json(req.session.cart);
  }
});

// end session set up


var Books = require('./models/books.js');

//POST BOOKS
app.post('/books', function(req, res){
  var book = req.body;
  Books.create(book, function(err, books){
    if (err){
      console.log('# API POST BOOKS: ', err);
    }
    res.json(books);
  })
});

//Get books
app.get('/books', function(req, res){
  Books.find(function(err, books){
    if(err){
      console.log('# API GET BOOKS: ', err);
    }
    res.json(books);
  })

})

//DELETE BOOK
app.delete('/books/:_id', function(req, res){
  var query={_id : req.params};
  Books.remove(query, function(err, books){
    if (err){
      console.log(' # API DELETE BOOKS: ', err);
    }
    res.json(books);
  })
})

//UPDATE BOOKS
app.put('/books/:id', function(req, res){
  var book = req.body;
  var query={_id: req.params};
  var update={
    '$set':{
      title:book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };
  var option={new : true};
  Books.findOneAndUpdate(query, update, options, function(err, books){
    if (err){
       console.log('# API UPDATE BOOKS: ', err);
    }
    res.json(books);
  })
 })


  // get books image api
  app.get('/images', function(req, res){
    const imgFolder = __dirname + '/public/images/';
    //REQUEST FILE SYSTEM
    const fs = require('fs');
    //READ ALL FILES IN THE directory
    fs.readdir(imgFolder, function(err, files){
      if (err){
        return console.error(err);
      }
      //CREATE AN EMPTY Array
      const filesArr = [];
      //ITERATE ALL IMAGES IN THE DIRECTORY AND ADD TO THE Array
      files.forEach(function(file){
        filesArr.push({name: file});
      });
      //SEND THE JSON RESPONSE WITH THE Array
      res.json(filesArr);
    })
  })

//End APIs

app.listen(3001, function(err){
  if(err){
    return console.log(err);
  }
  console.log('Api Server listen on PORT 3001');
})
