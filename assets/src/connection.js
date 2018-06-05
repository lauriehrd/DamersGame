var mysql      = require('mysql');

var connection = mysql.createConnection({
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
  host      : 'localhost',
  user      : 'root',
  password  : 'laurie',
  database  : 'dames'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

exports.register = function(req,res){
  // console.log("req",req.body);
  var today = new Date();
  var users={
    "first_name":req.body.first_name,
    "last_name":req.body.last_name,
    "email":req.body.email,
    "password":req.body.password,
    "created":today,
    "modified":today
  }
  connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log('The solution is: ', results);
    res.send({
      "code":200,
      "success":"user registered sucessfully"
        });
  }
  });
}

exports.login = function(req,res){
  var email= req.body.email;
  var password = req.body.password;
  connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    // console.log('The solution is: ', results);
    console.log(results);
    if(results.length >0){
      if(results[0].password == password){
        res.send(results[0]);
      }
      else{
        res.send({
          "code":401,
          "success":"Email and password does not match"
            });
      }
    }
    else{
      res.send({
        "code":404,
        "success":"Email does not exits"
          });
    }
  }
  });
}

exports.save = function(req,res){

  var sauvegarde={
    "user_id":req.body.user_id,
    "data":req.body.data
  }
  connection.query('INSERT INTO saves SET ?',sauvegarde, function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log('The solution is: ', results);
    res.send({
      "code":200,
      "success":"user registered sucessfully"
        });
  }
  });
}

exports.reprendre = function(req,res){

  var user_id = req.body.user_id;

  connection.query('SELECT data FROM saves WHERE user_id = ?',[user_id], function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log('The solution is: ', results);
    res.send(results[results.length-1]);
  }
  });
}