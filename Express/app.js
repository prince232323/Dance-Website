const express = require("express");
const path = require("path");
const app = express();
var mongoose = require('mongoose');
const bodyparser= require("body-parser");
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true});
const port = 8000;


var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    docs: String
    });


var Contact = mongoose.model('Contact', contactSchema);

// For serving static files
app.use('/static', express.static('static'))

// Set the template engine as pug
app.set('view engine', 'pug')

// Set the views directory
app.set('views', path.join(__dirname, 'views'))

// Our pug demo endpoint 
app.get('/', (req, res) =>{
    const params = {}
    res.status(200).render('home.pug', params)
});


app.get('/contact', (req, res) =>{
    const params = {}
    res.status(200).render('contact.pug', params)
});


app.post('/contact', (req, res) =>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved in database");
    }).catch(()=>{
        res.status(400).send("item was not save in database")
    })
    
});



app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});