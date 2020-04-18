const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser=require('body-parser');
const router=express.Router();
const PORT = 3000;
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));


var databaseConnection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'iroshan',
    database : 'University_To_Industry'
});

databaseConnection.connect((err)=>{
    if(!err)
    console.log("Connected Successfully");
    else
    console.log("Connection unsuccessful\nError: "+JSON.stringify(err,undefined,2));
});

app.listen(PORT,()=>console.log('Server is running on port '+PORT));

//get all the user records
app.get('/users',(req,res)=>{
    databaseConnection.query('SELECT * FROM User',(err,rows,fields)=>{
         if(!err)
            res.send(rows);
         else
         console.log(err); 
    })
});

//get the user records filtered by the NIC
app.get('/users/:id',(req,res)=>{
    databaseConnection.query('SELECT * FROM User WHERE NIC = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//delete a user record belonging to a particular NIC

app.delete('/users/:id',(req,res)=>{
    databaseConnection.query('DELETE FROM User WHERE NIC = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
            res.send("Deleted Successfully");
        else
            console.log(err);
    })
});

//insert a user

app.post('/users',function(req,res){
    var postData  = req.body;
    databaseConnection.query('INSERT INTO User SET ?', postData, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
})