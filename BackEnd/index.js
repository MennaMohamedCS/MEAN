const PORT = process.env.PORT || 5000;

const express= require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');

const studentRoutrs = require ('./routes/students');
const HttpError = require('./models/http-error');



const app= express(); //use - get - poat - listen
app.use(bodyParser.json()); // in post => send body
app.use(require('cors')());

app.use('/api/students', studentRoutrs); // => /api/students...


//error if not find url to route
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
  });

//error  post data if not validation (errors is not defined)
app.use((error, req, res, next) => {
    
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
});


mongoose.connect('mongodb+srv://Menna:123456Mm@cluster0.ndxqa.mongodb.net/StudentsDatabase?retryWrites=true&w=majority')
        //.then(() => {app.listen(4000);})       
        .catch(error => console.log(error));
app.listen(4000);
