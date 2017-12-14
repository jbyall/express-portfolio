// Gives reference to express
var express = require('express');
// Create instance of express
var app = express();

// Use axios for making http requests
var axios = require('axios');
var api = 'http://ec2-35-164-142-248.us-west-2.compute.amazonaws.com/SampleData/api/Cobb';


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

// Handle report get request
app.get('/reports', function(req, res){
    var dataLogs = [];
    var requestError = null;
    res.render("reports", {links: navLinks, logs:dataLogs, error: requestError});
    // axios.get('http://ec2-35-164-142-248.us-west-2.compute.amazonaws.com/SampleData/api/Cobb')
    //     .then(resp => {
    //         dataLogs = resp.data;
    //         // Return view with data
    //         res.render("reports", {links: navLinks, logs:dataLogs, error: requestError});
    //     })
    //     .catch(error => {
    //         // Return view with error
    //         requestError = error;
    //         res.render("reports", {links: navLinks, error: requestError});
    //     });
    
});

// Handle report details get request
app.get('/reports/:id', function(req,res){
    var id = req.params.id;
    res.render('reportChart', {reportId: id});
});

// Tells app to listen on a port
var port = process.env.PORT || 5000;
app.listen(port, function(err){
    console.log('listening on port ' + port);
});