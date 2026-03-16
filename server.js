const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Q1 & Q2: The Hardcoded Menu with Image Links
const foodMenu = [
    { id: 1, name: "Special Pizza", price: 1200, category: "Daily Specials", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" },
    { id: 2, name: "Zinger Burger", price: 450, category: "Fast Food", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
    { id: 3, name: "Kashmiri Chai", price: 150, category: "Beverages", img: "https://images.unsplash.com/photo-1571935441005-46704044814e?w=500" },
    { id: 4, name: "Club Sandwich", price: 350, category: "Daily Specials", img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500" }
];

// Q1 Deliverable: GET endpoint to see the menu
app.get('/menu', (req, res) => {
    res.json(foodMenu);
});

// Q3: The Order Logger
app.post('/place-order', (req, res) => {
    console.log("--------------------------------------");
    console.log("MANAGER NOTIFICATION: New order received!");
    console.log("Order Data:", req.body);
    console.log("--------------------------------------");
    res.status(200).send({ status: "Success", message: "Order logged by Manager!" });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
    console.log(`Menu check karne ke liye: http://localhost:${PORT}/menu`);
});