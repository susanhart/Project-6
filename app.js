//Global variables for the dependencies
const data = require("./data");
const express = require("express");
const { projects } = data;
const app = express();

//Setting up the middleware
//Setting up the view engine to pug
app.set("view engine", "pug");

//Using a static route and the express.static method to serve the static files located in the public folder
app.use('/static', express.static('public'));

//Setting the routes
//An "index" route (/) to render the "Home" page with the locals set to data.projects
app.get('/', (req, res) => {
    res.render("index", { projects });
});

//An "about" route (/about) to render the "About" page
app.get('/about', (req, res) => {
    res.render('about');
});

//Dynamic "project" routes (/project or /projects) based on the id of the project that render a customized version of the Pug project template to show off each project.
app.get('/project/:id', (req, res) => {
    const {id} = req.params;
    const project = projects[id];
    if (isNaN(id) || id > projects.length) {
        return res.redirect('/');
    }
    res.render('project', {project});
});

//404 error handling when something is not found - a project that is not there
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404; 
    console.log("There is a 404 error")
    next(err);
});

//Handling any error
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    console.log("There is an error")
    res.render('error');
});

//Starting the server
app.listen(3000, () => {
    console.log("app is running on localhost:3000");
});