# RESTFul API With Node.js and Express

## Step 1 : Install Node.js

Download and Install Node.js [Here!](https://nodejs.org/en/)

## Step 2 : Create Project

Check the installation Node.js and NPM.
    
    $ node --version
    $ npm --version

Next, create a **package.json** file with enter the following commands:
    
    $ npm init

Next, install **Express** with enter the following commands:
    
    $ npm install express --save

***Note:*** `--save` save the package name at install to *package.json* file.

Now our project. It has a **node_modules** folder.
Next, create a **index.js** file.

## Step 3 : index.js
In **index.js** file add the code below.

    var app = require('express')();     // Import Express
    var port = process.env.PORT || 8080;    //Set port number is 8080

    //Routing
    app.get('/',function(req,res){
        res.send('<h1>Hello Node.js<h1>');
    });

    app.get('/index', function(req,res){
        res.send('<h1>This is index page.<h1>');
    })

    //Run Web Server with port no 8080
    app.listen(port, function(){
        console.log('Server running at http://localhost:' + port);
    })

***Note:*** 
- `get(path, callback)` is *Route*
    - `path` is URL 
    - `callback` will have a *request* and *response*

Start serve enter the following commands :

    $ node index.js

Open browser with  http://localhost:8080 and http://localhost:8080/index 

## Step 4 : Create RESTFul API
The requirements of the API are as follows.

1. GET localhost:8080/
    - Show message a "Welcom to Node.js" 
2. GET localhost:8080/user
    -  Show list a user all in the system.
3. GET localhost:8080/user/:id
    - Show data of user a defined ":id" is id of user want to see data.
4. POST localhost:8080/newuser
    - Add data of user according to the data sent.

Create a **users.js** file.
In **index.js** file add the code below.

    var users = [
        {
            "id": 1,
            "username": "goldroger",
            "name": "Gol D. Roger",
            "position": "Pirate King"
        },
        {
            "id": 2,
            "username": "mrzero",
            "name": "Sir Crocodile",
            "position": "Former-Shichibukai"
        },
        {
            "id": 3,
            "username": "luffy",
            "name": "Monkey D. Luffy",
            "position": "Captain"
        },
        {
            "id": 4,
            "username": "kuzan",
            "name": "Aokiji",
            "position": "Former Marine Admiral"
        },
        {
            "id": 5,
            "username": "shanks",
            "name": "'Red-Haired' Shanks",
            "position": "The 4 Emperors"
        }
    ];

    //function a find user all and return user all
    exports.findAll = function() {
        return users;
    };

    //function a find user with "id" 
    exports.findById = function (id) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == id) return users[i];
        }
    };

Next, Open a **index.js** file add `require()` with call function in **users.js** and add the code below.
    
    var users = require('./users');

Next, then add remaining "route" is *'/user/:id'* and *'/newuser'*

    app.get('/user/:id', function (req, res) {
        var id = req.params.id;
        res.json(users.findById(id));
    });

    app.post('/newuser', function (req, res) {
        var json = req.body;
        res.send('Add new ' + json.name + ' Completed!');
    });

The code above, when the user access to http://localhost:8080/user will call function `findAll()` and return value is **json**, then use **res.json()** to send the value to the page.

Also, http://localhost:8080/user/:id when specifying an id number of the user. Then send an *id* to the function.

Next, access to http://localhost:8080/newuser is **POST** is to get `req.body` which we will send a value JSON.

## Step 5 : Test with Postman
Download and Install Postman [Here!](https://www.getpostman.com/)

Next, install **body-parser** with pass and read body,  enter the following commands:

    $npm install body-parser --save

Next, open **index.js** file, setup Body Parser in file with read JSON . Add the code below.

    var bodyParser = require('body-parser');

    // parse application/json
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

Start serve again enter the following commands :

    $ node index.js

Open Postman and enter the URL you want to send.

Example: http://localhost:8080/user/3 (GET) 

Output:
    
    {
        "id":3,
        "username":"luffy",
        "name":"Monkey D. Luffy",
        "position":"Captain"
    }

## Finished!