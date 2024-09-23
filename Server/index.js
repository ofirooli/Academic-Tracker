const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db'); // Assuming you have a database config file

// Import your controllers
const classController = require('./controllers/classController');
const tasksController = require('./controllers/tasksController');
const testsController = require('./controllers/testsController');
const scoreController = require('./controllers/scoreController');

const app = express();
const PORT = 3000; // You can change the port if needed

// Connect to the database
connectDB();

app.use(cors());
app.use(express.json());

// Use the controllers to handle routes
app.use('/classes', classController);
app.use('/tasks', tasksController);
app.use('/tests', testsController);
app.use('/scores', scoreController);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
