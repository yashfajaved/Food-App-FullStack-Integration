const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

/**
 * Q1 & Q2: Extensive Food Menu (Visual Catalog)
 * Adding more items to make it look like a real professional app.
 */
const foodCatalog = [
    { id: 1, name: "Premium Pepperoni Pizza", price: 1200, category: "Daily Specials", imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" },
    { id: 2, name: "Classic Zinger Burger", price: 450, category: "Fast Food", imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
    { id: 3, name: "Authentic Kashmiri Chai", price: 150, category: "Beverages", imageUrl: "https://images.unsplash.com/photo-1571935441005-46704044814e?w=500" },
    { id: 4, name: "Grilled Club Sandwich", price: 350, category: "Daily Specials", imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500" },
    { id: 5, name: "Loaded Cheese Fries", price: 300, category: "Sides", imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500" },
    { id: 6, name: "Chocolate Fudge Shake", price: 400, category: "Beverages", imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500" },
    { id: 7, name: "Garden Fresh Salad", price: 250, category: "Healthy", imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500" },
    { id: 8, name: "Spicy Pasta", price: 800, category: "Italian", imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=500" }
];

// Home Route
app.get('/', (req, res) => {
    res.send("<h1>Server is Running!</h1><p>Click <a href='/menu'>HERE</a> to see the Full Menu.</p>");
});

// Q1 & Q2: Detailed Menu Endpoint
app.get('/menu', (req, res) => {
    res.json(foodCatalog);
});

const PORT = 5050; 
app.listen(PORT, () => {
    console.log(`SERVER STARTED: http://localhost:${PORT}`);
});