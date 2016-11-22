//Express is required for creating Node.js based web apps
var express = require('express');
var pg = require("pg")
var http = require("http")

//body-parser is used to parse the Request body and populate the req.
var bodyParser = require('body-parser');

var app = express();

app.set('port',3300);

app.use(bodyParser.json());

var conString = "pg://postgres:admin@127.0.0.1:5432/Employee";
var client = new pg.Client(conString);
client.connect();
client.query("CREATE TABLE IF NOT EXISTS ordermaster(orderId integer ,purchase_order_no integer, po_date date,last_date date,service varchar(50),numberofunits integer,priceperunit integer)");
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

// Get all the records
app.get('/order_detail',function(req,res){
    client.query("SELECT * from ordermaster ORDER BY orderid ASC", function(err, results) {
     if (err) {
      throw err;
    }
     res.send(results);
    });
});

// Add a new order
 app.post("/order_detail", function(req, res){
  console.log("Adding new Order: " + req.body.orderid);
  var query=client.query("INSERT INTO ordermaster (orderId,purchase_order_no,po_date,last_date,service,numberofunits,priceperunit) values ('"+req.body.orderid+"','"+req.body.purchase_order_no+"','"+req.body.po_date+"','"+req.body.last_date+"','"+ req.body.service+"','"+req.body.numberofunits+"','"+req.body.priceperunit+"')");
   res.send("Success");
 });
       
// Update an existing order
app.put("/order_detail/:orderid", function(req, res){
client.query("UPDATE ordermaster SET purchase_order_no='"+req.body.purchase_order_no+"',po_date='"+req.body.po_date+"',last_date='"+req.body.last_date+"',service='"+ req.body.service+"',numberofunits='"+req.body.numberofunits+"',priceperunit='"+req.body.priceperunit+"'where orderid='"+req.params.orderid+"'",function(err,result){
 if (err) {
      throw err;
    }
      res.send(result);
   });
});

// Delete an existing Order
app.delete("/order_detail/:orderid", function(req, res){
    //console.log("Deleting Order:"+req.body.orderid);
     client.query("Delete from ordermaster Where orderid ='"+req.params.orderid+"'",function(err,result){
       if (err) {
            throw err;
          }
          res.send(result);
     });        
  });