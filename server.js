// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');


// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 7333;

// Spin up the server
const server = app.listen(port, listening);

function listening() {
    console.log(`server running on localhost: ${port}`);
};

// Initialize all route and callback function
app.get('/all', getData);

// Callback function for GET '/all' route
function getData(request, response) {
    response.send(projectData);
}

// POST function

app.post('/add', addData);

function addData(request, response) {
    let data = request.body;

    let newEntry = {
        feel: request.body.feel,
        date: request.body.date,
        temp: request.body.temp,
    }
    projectData.push(newEntry);
    console.log('projectData', projectData);
    response.send(projectData);
}