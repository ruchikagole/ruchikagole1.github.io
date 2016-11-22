//Express is required for creating Node.js based web apps
var express = require('express');
var pg = require("pg")
var http = require("http")
//body-parser is used to parse the Request body and populate the req.
var bodyParser = require('body-parser');

var app = express();

app.set('port',3300);

app.use(bodyParser.json());

var conString = "pg://postgres:admin@localhost:5432/Employee";
var client = new pg.Client(conString);
client.connect();


client.query("CREATE TABLE IF NOT EXISTS ClientMaster(clientid varchar(64),name varchar(64),address varchar(64),phone integer,cmp_email varchar(50),person_name varchar(50),person_phone integer,person_email varchar(50),shipping_add varchar(64))");
console.log("Connected to DB!");


//Starting up the server on the port: 3300
app.listen(app.get('port'), function(){
  console.log('Server up: http://localhost:' + app.get('port'));
});

// To allow CORS - Cross Origin Resrouce Sharing
app.all('*',function(req,res,next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Get all the books
app.get('/client_order',function(req,res){
    client.query("SELECT * from ClientMaster ", function(err, results) {
     if (err) {
      throw err;
    }
    
    // console.log(results.rows[0].integer);
     res.send(results);
    });
});


//Add a new book
app.post("/client_order", function(req, res){
  console.log("Adding new Client: " + req.body.clientid);
  var query=client.query("INSERT INTO ClientMaster (clientid ,name ,address ,phone,cmp_email ,person_name,person_phone ,person_email,shipping_add) values ('"+req.body.clientid+"','"+req.body.name+"','"+req.body.address+"','"+req.body.phone+"','"+ req.body.cmp_email+"','"+req.body.person_name+"','"+req.body.person_phone+"','"+req.body.person_email+"','"+req.body.shipping_add+"')");
   res.send("Success");
 });


 //Delete an existing book
app.delete("/client_order/:clientid", function(req, res){
   client.query("Delete from ClientMaster Where clientid ='"+req.params.clientid+"'",function(err,result){
       if (err) {
            throw err;
          }
          res.send(result);
     });        
  });

