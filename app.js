// Import the express module

import express from 'express';

import mysql2 from 'mysql2';

import dotenv from 'dotenv';

//load the enviroment variables from .env file

dotenv.config();


// Create an instance of an Express application

const app = express();

// Serve files from public
app.use(express.static('public'));

// Set view engine to EJS

app.set('view engine', 'ejs');


// Define the port number where our server will listen

const PORT = 3007;


// Adding for EJS

app.use(express.urlencoded({ extended: true }));
 
// Define a default "route" ('/')

// req: contains information about the incoming request

// res: allows us to send back a response to the client
app.get('/', (req, res) => {

  res.render('index');

});

app.get('/admin', async (req, res) => {
  try {
    const [orders] = await pool.query('SELECT * FROM orders');
    // render admin page
    res.render('admin', { form_data: orders });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Database error: ' + err.message);
  }
});

const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
}).promise();

app.get('/db-test', async(req,res) => {
  try {
    const orders = await pool.query('SELECT * FROM orders');
    res.send(orders[0]); 
  } catch (err){
    console.error('Database error:', err);
    res.status(500).send('Database error: ' + err.message);
  }
})


app.post('/submit', async (req, res) => {

  try {
    //get form data from the req body
    const order = req.body;
    // log order data (for debugging)
    console.log('Received order:', order);

    // convert toppings array to comma-separated string
    order.toppings = Array.isArray(order.toppings) ? 
    order.toppings.join(',') : "";

    //sql insert
    const sql = `INSERT INTO orders(customer, email, flavor, cone, toppings) VALUES (?, ?, ?, ?, ?);`;

    // params array to match order structure query
    const params = [
      order['order-name'],
      order['order-email'],
      order.flavor,
      order['cone-option'],
      order.toppings
    ];
    console.log(params);
    const result = await pool.execute(sql, params);
    console.log('Order saved with ID:', result[0].insertId)
// render data
res.render('confirm', { order });

  }catch (err){
      console.log('Error saving order:', err);
      res.status(500).send('Error saving order: Please try again.');
    }
  


});

// Thank you route
app.get('/thank-you', (req, res) => {
    res.render('confirm');
});


// Start the server and listen on the specified port

app.listen(PORT, () => {

    console.log(`Server is running at http://localhost:${PORT}`);

});

