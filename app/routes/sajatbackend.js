const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const fileupload = require("express-fileupload");


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
    
    connection.query('SELECT * from kerdesek Limit 10', function (err, rows, fields) {
      if (err) throw err
    
      console.log(rows)

      res.send(rows)
    })
    
    connection.end()    

  })

  app.get('/uzenet', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'foci'
    })
    
    connection.connect()
    
    connection.query('SELECT * from uzenet', function (err, rows, fields) {
      if (err) throw err
    
      console.log(rows)

      res.send(rows)
    })
    
    connection.end()    

  })

  app.post('/adatfelvitel', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'foci'
    })
    
    connection.connect()
    
    
    connection.query("UPDATE kerdesek SET kerdesek_kerdes='"+req.body.bevitel1+"',kerdesek_kep='"+req.body.bevitel2+"', kerdesek_valasz1='"+req.body.bevitel3+"',kerdesek_valasz2='"+req.body.bevitel4+"',kerdesek_valasz3='"+req.body.bevitel5+"',kerdesek_valasz4='"+req.body.bevitel6+"',kerdesek_helyes='"+req.body.bevitel7+"',kerdesek_helyesid='"+req.body.bevitel8+"' where kerdesek_id="+req.body.bevitelid, function (err, rows, fields) {
      if (err) throw err  
    
      console.log("Sikeres Frissítés!")

      res.send("Sikeres Frissítés!" )
    })
    
    connection.end()    

  })
  
  app.use(fileupload());
  app.post("/upload", (req, res) => {
    const newpath = "./pics/";
    const file = req.files.file;
    const filename = file.name;
  
    file.mv(`${newpath}${filename}`, (err) => {
      if (err) {
        return res.status(500).send({ message: "File upload failed", code: 200 });
      }
        return res.status(200).send({ message: "File Uploaded", code: 200 });
    });
  });

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
    connection.query("INSERT INTO beerkezett VALUES (NULL, '"+req.body.beviteltomb[1]+"', '"+req.body.beviteltomb[2]+"','"+req.body.beviteltomb[3]+"','"+req.body.beviteltomb[4]+"','"+req.body.beviteltomb[5]+"','"+req.body.beviteltomb[6]+"','"+req.body.beviteltomb[7]+"','"+req.body.beviteltomb[8]+"','"+req.body.beviteltomb[9]+"','"+req.body.beviteltomb[10]+"','"+req.body.bevitel2+"','"+req.body.bevitel1+"' ,'"+teljesdat+"') ", function (err, rows, fields) {
      if (err) throw err
    
      console.log("Sikeres kitoltes!")

      res.send("Sikeres kitoltes!")
    })
    
    connection.end()    

  })  

  app.get('/tema', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'foci'
    })
    
    connection.connect()
    
    connection.query('SELECT * from uzenet ORDER BY uzenet_id DESC ', function (err, rows, fields) {
      if (err) throw err
    
      console.log(rows)
  
      res.send(rows)
    })
    
    connection.end()    
  
  })

  app.post('/kommentfelv', (req, res) => {
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
    connection.query("INSERT INTO uzenet VALUES (NULL, '"+req.body.bevitel1+"', '"+req.body.bevitel2+"', '"+teljesdat+"') ", function (err, rows, fields) {
      if (err) throw err
    
      console.log("Sikeres felvitel!")

      res.send("Sikeres felvitel!")
    })
    
    connection.end()    

  })

  app.post('/uzenettorles', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'foci'
    })
    
    connection.connect()
    
    connection.query('DELETE  from uzenet where uzenet_id=' + req.body.bevitel1, function (err, rows, fields) {
      if (err) throw err
    
      console.log("Sikeres Törlés!")

      res.send("Sikeres Törlés!")
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
    
      console.log("Sikeres Törlés!")

      res.send("Sikeres Törlés!")
    })
    
    connection.end()    

  })

  

};



