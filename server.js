require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;

// requiring mongoose
require('./config/mongoose');

// requiring Routes
const UserRoute = require('./routes/UserRoutes');

// specifying views path and the template engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
// needed middlewares
app.use('/api',express.json())
app.use(express.urlencoded({extended: true}));

// main routes
app.get('/' , (req,res) => {res.render("landing")});
app.get('/home' , (req,res) => {res.render("home")});

// user routes
app.use(UserRoute);

// api routes

app.listen(
    PORT,
    () => {
        console.log(`server is running at http://localhost:${PORT} `);
    }
);