const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Default message so you don't see "Cannot GET"
app.get('/', (req, res) => {
    res.send("<h1>Order Logger is Ready!</h1><p>Send a POST request from your App to /place-order</p>");
});

// Q3: The Order Logger Endpoint
app.post('/place-order', (req, res) => {
    const orderData = req.body;
    console.log("-----------------------------------------");
    console.log("MANAGER NOTIFICATION: New Order Received!");
    console.log("Details:", JSON.stringify(orderData, null, 2));
    console.log("-----------------------------------------");
    res.status(200).send({ status: "Success", message: "Order logged!" });
});

const PORT = 8080; 
app.listen(PORT, () => {
    console.log(`ORDER LOGGER IS ACTIVE ON: http://localhost:${PORT}`);
});