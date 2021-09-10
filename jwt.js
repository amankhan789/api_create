//require("dotenv").config();
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const posts = [

{
username: "aman@gmail.com",
password: "aman123"
},
{
username: "rohit@gmail.com",
password: "rohit123"
}
];
app.get("/posts", authenticateToken, (req, res) => {
res.json(posts.filter(post => post.username === req.user.name));
});
app.post("/login", function(req, res){
   let flag;
 posts.forEach(function(elements){
console.log(elements.username);
if(req.body.username === elements.username){
flag = true;
console.log(flag);
}
});
if(flag == true){
const user = { name: req.body.username};
const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
res.json({accessToken: accessToken});
}
else{
console.log("User not found");
res.json({message: "User not found!"});
}
});function authenticateToken(req, res, next){
const authHeader = req.headers['authorization']
const token = authHeader && authHeader.split(' ')[1];
if(token == null) return res.sendStatus(401);
jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, user){
if(err) return res.sendStatus(403);
req.user = user;
next();
});
};
//app.listen(3000, function(req, res){

//console.log("Running on port 3000");});
