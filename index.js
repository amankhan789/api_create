
const express = require('express');
const app = express();
const dbConnection= require('./dbConnection');
const bodyParser = require('body-parser');
const { response } = require('express');

app.use(express.json());
app.use(express.urlencoded({extended:false}))//body parser

//api create data

app.post ("/api/create" , function (request, response ){
  var name = request.body.name;
  var email= request.body.email;
  var password = request.body.password;
  var location= request.body.location;
  var contact= request.body.contact;

  dbConnection.query ("INSERT INTO users(name, email, password,location,contact) value (?,?,?,?,?)",[name, email, password,location,contact],function(error , result,field){
    if(!error) {
      response.json({
       message:"data Submit"
        });
    } else {
      if     (error.code=='ER_DUP_ENTRY'){
        response.status(201).json({message:'email is alredy register'})
      }
      else{response.json({message:error})}
    }
  });
})
 // get data
app.get("/api/view",(req, res)=>{
    let sql= "SELECT * FROM users";
    let query = dbConnection.query(sql, (err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({status : 200, error : null, response: result }));
       });  
    });

app.get("/api/registration",(req, res)=>{
  let sql= "SELECT * FROM  registration ";
  let query = dbConnection.query(sql, (err,result)=>{
      if(err) throw err;
      res.send(JSON.stringify({status : 200, error : null, response: result }));
    });  
 });

app.post("/api/prod" , function (request, response){
  var name= request.body.name;
  var mrp= request.body.mrp;
  var quantity= request.body.quantity;
  dbConnection.query ("INSERT INTO product (name , mrp, quantity )  value (?,?,?)" ,[name , mrp , quantity ], function (error,result,field){
    if (!error){
      response.json({
        message:"data submit "
         });
      }
    else{response.json({message:error})}
   });
})

app.get("/api/product",(req, res)=>{
  let sql= "SELECT * FROM  product ";
  let query = dbConnection.query(sql, (err,result)=>{
      if(err) throw err;
      res.send(JSON.stringify({ status : 200, error : null, response: result }));
    });  
});
// update data
app.put("/api/regupdate",(req,res)=>{
  let sql= "UPDATE registration SET name='" +req.body.name +"', location='"+req.body.location +"' WHERE id="+ req.body.id;
    let query = dbConnection.query(sql, (err , result)=>{
      if (err) throw err;
      res.send(JSON.stringify({status: 200, error :null, response:"Record updated successfuly "}));
   
    });
   });
 

//delete data

app.delete("/api/delete/:id",(req,res)=>{
  let sql = "DELETE FROM registration WHERE id=" +req.params.id+"";
  let query = dbConnection.query(sql, (err , result)=>{
    if (err) throw err;
    res.send(JSON.stringify({status: 200, error :null, response:"Record deleted successfuly "}));
 
  });
});

app.listen(3000,() => console.log('Server is running on port 3000'));
