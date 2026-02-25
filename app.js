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

 app.use(express.static('public'));
 
// Define a default "route" ('/')

// req: contains information about the incoming request

// res: allows us to send back a response to the client
app.get('/', (req, res) => {

  res.sendFile(`${import.meta.dirname}/views/index.html`);

});
app.post('/submit',(req,res) =>{
  const submission = {
    name: req.body.name,
    email: req.body.email,
    cone_type: req.body.cone_type,
    toppings: req.body.toppings ? req.body.toppings : "none",
    comment: req.body.comment,
    timestamp: new Date()
  };
  form_data.push(submission)
  console.log(form_data);
});


// Start the server and listen on the specified port

app.listen(PORT, () => {

    console.log(`Server is running at http://localhost:${PORT}`);

});

