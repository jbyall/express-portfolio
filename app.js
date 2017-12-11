// Gives reference to express
var express = require('express');
// Create instance of express
var app = express();

// Static File Middleware
//var staticOptions = {}
app.use(express.static('public'));
//app.use('/public/vendor', express.static(__dirname + '/public'));
// Set view templates directory
app.set('views', './views');
// Set view engine to Handlebars
var handlebars = require('express-handlebars');
//var hbInstance = handlebars();
app.engine('.hbs', handlebars({extname: '.hbs', defaultLayout:'layout'}));
app.set('view engine', '.hbs');

var navLinks = {
    "home":"/",
    "about":"/#about",
    "skills":"/#skills",
    "work":"/#work",
    "portfolio": "/#portfolio",
    "contact": "/#contact",
};

// Handle root get request
app.get('/', function(req, res){
    // Return view with data
    res.render('index',{links: navLinks});
});

app.get('/#*', function(req, res){
    res.render('index');
})

// Handle root get request
app.get('/reports', function(req, res){
    // Return view with data
    res.render("reports", {links: navLinks});
});

// Tells app to listen on a port
var port = process.env.PORT || 5000;
app.listen(port, function(err){
    console.log('listening on port ' + port);
});