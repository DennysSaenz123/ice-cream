// Import the express module

import express from 'express';


// Create an instance of an Express application

const app = express();

// Set view engine to EJS

app.set('view engine', 'ejs');


// Define the port number where our server will listen

const PORT = 3000;

// in-memory array
const form_data = [];

// Adding for EJS

app.use(express.urlencoded({ extended: true }));
 
// Define a default "route" ('/')

// req: contains information about the incoming request

// res: allows us to send back a response to the client
app.get('/', (req, res) => {

  res.sendFile(`${import.meta.dirname}/views/index.html`);

});

app.get('/admin', (req, res) => {
  res.send(form_data);
});
app.post('/submit',(req, res) =>{
  const submission = {
    name: req.body['order-name'],
    email: req.body['order-email'],
    cone_type: req.body['cone-option'],
    toppings: req.body.toppings ? req.body.toppings : "none",
    comment: req.body['comments'],
    timestamp: new Date()
  };
  form_data.push(submission)
  res.sendFile(`${import.meta.dirname}/views/confirm.ejs`);
});

// Thank you route
app.get('/thank-you', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/confirm.ejs`);
});


// Start the server and listen on the specified port

app.listen(PORT, () => {

    console.log(`Server is running at http://localhost:${PORT}`);

});

