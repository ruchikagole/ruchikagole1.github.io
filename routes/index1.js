var http = require('http');
var Pool = require('pg').Pool;


var config = {
  host: 'localhost',
  user: 'postgres',
  password: 'admin',
  database: 'Employee',
};

process.on('unhandledRejection', function(e) {
  console.log(e.message, e.stack)
})


var pool = new Pool(config)

var server = http.createServer(function(req, res) {

  var onError = function(err) {
    console.log(err.message, err.stack)
    res.writeHead(500, {'content-type': 'text/plain'});
    res.end('An error occurred');
 };

pool.query(insert into Emp(name,salry) values($1,$2)


)
  pool.query('INSERT INTO visit (date) VALUES ($1)', [new Date()], function(err) {
    if (err) return onError(err);

    //get the total number of visits today (including the current visit)
      pool.query('SELECT COUNT(date) AS count FROM visit', function(err, result) {
      // handle an error from the query
      if(err) return onError(err);
      res.writeHead(200, {'content-type': 'text/plain'});
      res.end('You are visitor number ' + result.rows[0].count);
    });
  });
});