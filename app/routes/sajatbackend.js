const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");



module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //sajatbackend vegpontok--------------------------------------------------------------
  
  app.get('/kerdesek', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'foci'
    })
    
    connection.connect()
    
    connection.query('SELECT * from kerdesek', function (err, rows, fields) {
      if (err) throw err
    
      console.log(rows)

      res.send(rows)
    })
    
    connection.end()    

  })
  
  app.post('/beerkezett', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'foci'
    })
    
    connection.connect()
    
    let dt=new Date();
    let teljesdat=dt.getFullYear()+"-"+  (dt.getMonth()+1)   +"-"+dt.getDate();
    connection.query("INSERT INTO beerkezett VALUES (NULL, '"+req.body.beviteltomb[1]+"', '"+req.body.beviteltomb[2]+"','"+req.body.beviteltomb[3]+"','"+req.body.beviteltomb[4]+"','"+req.body.beviteltomb[5]+"','"+req.body.beviteltomb[6]+"','"+req.body.beviteltomb[7]+"','"+req.body.beviteltomb[8]+"','"+req.body.beviteltomb[9]+"','"+req.body.beviteltomb[10]+"','"+req.body.beviteltomb[11]+"''"+req.body.bevitel1+"', '"+teljesdat+"') ", function (err, rows, fields) {
      if (err) throw err
    
      console.log("Sikeres kitoltes!")

      res.send("Sikeres kitoltes!")
    })
    
    connection.end()    

  })  

  app.post('/torles', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'foci'
    })
    
    connection.connect()
    
    connection.query('DELETE  from kerdesek where kerdesek_id=' + req.body.bevitel1, function (err, rows, fields) {
      if (err) throw err
    
      console.log(rows)

      res.send(rows)
    })
    
    connection.end()    

  })

};

