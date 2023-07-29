require('dotenv').config()
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');
mongoose.connect('mongodb+srv://riteshpathak218:nRk1Tops@cluster0.a6arijs.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true});
const db=mongoose.connection;
db.on('error',(error)=>console.log(error));
db.once('open',()=>console.log('connected to Database'));
app.use(cors())
const quoteRouter=require('./routes/quote');
app.get('/quote', async (req, res) => {
    try {
      // Fetch quotes from the database
      const quotes = await Quote.find(); // Replace 'Quote' with your actual model name
  
      // Return the quotes as a JSON response
      res.json(quotes);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
app.use('/',quoteRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.listen(5050,()=>console.log('Server started on port 5050'));