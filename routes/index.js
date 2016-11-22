

//var http = require('http');
//var Pool = require('pg').Pool;


//var config = {
 // host: 'localhost',
  //user: 'postgres',
  //password: 'admin',
 // database: 'Employee',
//};

//process.on('unhandledRejection', function(e) {
 // console.log(e.message, e.stack)
//})


//var pool = new Pool(config)

//var server = http.createServer(function(req, res) {

 // var onError = function(err) {
  //  console.log(err.message, err.stack)
  //  res.writeHead(500, {'content-type': 'text/plain'});
  //  res.end('An error occurred');
 // };

  //pool.query('INSERT INTO visit (date) VALUES ($1)', [new Date()], function(err) {
   // if (err) return onError(err);

    // get the total number of visits today (including the current visit)
   /// pool.query('SELECT COUNT(date) AS count FROM visit', function(err, result) {
      // handle an error from the query
     // if(err) return onError(err);
     // res.writeHead(200, {'content-type': 'text/plain'});
      //res.end('You are visitor number ' + result.rows[0].count);
    //});
 // });
//});

var pg = require("pg")
var http = require("http")
var port = 5433;
var host = '127.0.0.1';
http.createServer(function(req, res) {
if(req.method == 'POST') {
insert_records(req,res);
}
else if(req.method == 'GET') {
list_records(req,res);
}
else if(req.method == 'PUT') {
update_record(req,res);
}
else if(req.method == 'DELETE') {
delete_record(req,res);
}
}).listen(port,host);
console.log("Connected to " + port + "   " + host);

var conString = "pg://postgres:admin@localhost:5432/Employee";
var client = new pg.Client(conString);
client.connect();
console.log("Connected to DB!");
//console.log("Data insert");
var insert_records = function(req, res) {
//Drop table if it exists
client.query("DROP TABLE IF EXISTS emps1");
// Creat table and insert 2 records into it
client.query("CREATE TABLE  emps1(firstname varchar(64), lastname varchar(64))");
client.query("INSERT INTO emps1(firstname, lastname) values($1, $2)", ['Tinniam', 'Ganesh']);
client.query("INSERT INTO emps1(firstname, lastname) values($1, $2)", ['Anand', 'Karthik'])
};
var list_records = function(req, res)
{
    console.log("In listing records");
    // Select all rows in the table
    var query = client.query("SELECT firstname, lastname FROM emps ORDER BY lastname, firstname");
    query.on("row", function (row, result) 
    {
       result.addRow(row);
    });

query.on("end", function (result)
 {
// On end JSONify and write the results to console and to HTML output
    console.log(JSON.stringify(result.rows, null, "    "));
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(JSON.stringify(result.rows) + "\n");
    res.end();
});
}
//query.on("end", function (result) 
//{
 //   var update_record = function(req, res) 
 //   {
// Update the record where the firstname is Anand
  //    query = client.query("UPDATE emps set firstname = 'Kumar' WHERE firstname='Anand' AND lastname='Karthik'");


//var delete_record = function(req, res) 
//{
// Delete the record where the lastname is Karthik
//  client.query("DELETE FROM  emps WHERE lastname = 'Karthik'");
///  query.on("row", function (row, result) 
 //
  // result.addRow(row);
  //});


