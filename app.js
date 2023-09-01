const express = require("express");
const path = require("path");
const fs = require("fs");
const app=express();
const bodyparser=require("body-parser")
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/contactdance');
const contactSchema= new mongoose.Schema({
    name:String,
    phone:String,
    email: String,
    address:String,
    concern:String,
}, { collection: 'contacts'});
const contact = mongoose.model('contact', contactSchema);

const port = 8000;
app.use(express.urlencoded())



app.use('/static', express.static('static')) // For serving static files


// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get("/", (req, res)=>{ 
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {}
    res.status(200).render('index.pug', params);
});


app.get("/contactus", (req, res)=>{ 
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {}
    res.status(200).render('contact.pug', params);
});
app.use(express.json());
app.post('/contactus', async(req,res)=>{
    console.log(req.body);
    try {
        const { name, phone, email, address, concern } = req.body;
        const myData = new contact({ name, phone, email, address, concern }); // Use the correct model name and field names
        await myData.save();
        res.status(201).json(myData);
    }
    catch(err){
        // Handle the error
        console.error(err);
    res.status(500).json({ error: 'An error occurred' });
    }
});




app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});