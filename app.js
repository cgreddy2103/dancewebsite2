const express=require("express");
const path=require("path");
// const fs=require("fs");
// const { urlencoded } = require("body-parser");
const app=express();
const mongoose = require('mongoose');
const bodyparser=require("body-parser");
mongoose.connect('mongodb://localhost/contactdance', {useNewUrlParser: true, useUnifiedTopology: true});
const port=8000;
//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String

  });

  const contact = mongoose.model('contact', contactSchema);

//specify express
//app.use(express.static('static',options))
app.use('/static',express.static('static'))//serving static files
app.use(express.urlencoded())
//below for pug
app.set('view engine','pug')//set template engine as pug
app.set('views',path.join(__dirname,'views'))//set view directory
app.get('/',(req,res)=>{
    // const con='tis is best content on yt'
    const params={}
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    // const con='tis is best content on yt'
    const params={}
    res.status(200).render('contact.pug',params);
})
app.post('/contact',(req,res)=>{
    // const con='tis is best content on yt'
    // const params={}
    var mydata=new contact(req.body);
    mydata.save().then(()=>{
        res.send("this item is send to database");
    }).catch(()=>{
        res.status(400).send("item was not saved to database")
    });
    // res.status(200).render('contact.pug');
})
app.listen(port,()=>{
    console.log(`this application started succesfully on port ${port}`)
})