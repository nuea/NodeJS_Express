var app = require('express')();     //Import Express
var port = process.env.PORT || 8080;    //Set port number is 8080
var users = require('./users');     //

var bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Routing
app.get('/',function(req,res){
    res.send('<h1>Hello Node.js<h1>');
});

app.get('/index', function(req,res){
    res.send('<h1>This is index page.<h1>');
})

app.get('/user/:id', function (req, res) {
    var id = req.params.id;
    res.json(users.findById(id));
});

app.post('/newuser', function (req, res) {
    var json = req.body;
    res.send('Add new ' + json.name + ' Completed!');
});

//Run Web Server with port no 8080
app.listen(port, function(){
    console.log('Server running at http://localhost:' + port);
})