var express = require('express'); // this is calling the express server
var bodyParser = require('body-parser'); // this is calling the bodyparser module
var app = express(); // this sets the calling of the express module to the var app
var jade = require('jade'); // requires the jade module
fs = require('fs') // requires the filesystem module


app.use(bodyParser.urlencoded({ // this makes the bodyparser function available to the express server
	extended: true
}));

app.set('view engine', 'jade'); // sets the default template engine to jade

/* RENDERS LIST OF USERS | STEP 0 */

app.get('/', function(req, res) { // I used a get request, because this function requires nothing from the user
	fs.readFile('users.json', 'utf8', function(err, data) { // is reading the users.json file
		res.render('index.jade', { // renders the index.jade file 
			datajson: data //this makes the data from the users.json available to the variable datajson in jade 
		});
	});
})

/* SEARCH FOR MATCHING USERS | STEP 1 */

app.get('/form', function(req, res) { // this form makes it possible to search for people
	res.render('form.jade'); //this renders the form.jade with the search input and submit button
});

app.post('/searchresult', function(request, response) { // this route is loaded, when someone presses the submit button
	searchresult = request.body.searchresult // sets var searchresult equal to the input of the user in the form
	fs.readFile('users.json', function(err, data) { //this reads the users.json file
		user = JSON.parse(data); // parses the data from this JSON file into the user variable
		for (var i = 0; i < user.length; i++) {
			if (user[i].firstname === searchresult || user[i].lastname === searchresult) { // checks if the first name or last name matches the json file
				response.send("Users firstname: " + user[i].firstname + '</br>' + "Users lastname: " + user[i].lastname + '</br>' + "Users email: " + user[i].email)
				return;
			}
		}
	})
});

/* CREATE USER FORM */
app.get('/createusers', function(req, res) {  //if this route is loaded is renders the createuser.jade
	res.render('createusers.jade'); 
});

/* UPDATING JSON FILE */
app.post('/usercreated', function(request, response) {
		fs.readFile('users.json', 'utf8', function (err,data) { // reading the json file
 			newlist = JSON.parse(data); // puts the data into a new variable
 			body = request.body; // puts the content from the new user into a new variable
 			newlist.push(body); //add the created user to the newlist
 			fs.writeFile('users.json', JSON.stringify(newlist)); //write a new json from the list
			});			
			response.redirect("/"); // after that the user is redirected to the updated json file
			});




app.listen(3000); // the server listens on port 3.0000
