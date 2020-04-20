const sql = require('./db.js');
const bcrypt = require("bcrypt");
const Login = function(login) {
    this.UserName = login.UserName;
    this.Password = login.Password;
    this.AccountType = login.AccountType;
    this.NIC = login.NIC;
}; 

Login.create = (newLogin, result) =>{
   
    bcrypt.hash(newLogin.Password,10,(err,hash)=>{
        if(err){
            console.log("Error hashing password "+err);
            result(err,null);
            return;
        }else{
                    sql.query("INSERT INTO Login_Credentials SET UserName = ?,Password = ?,AccountType = ?,NIC = ?\
            ",[newLogin.UserName,hash,newLogin.AccountType,newLogin.NIC],(err,res)=>{
                if(err){
                    console.log("Error: "+err);
                    result(err,null);
                    return;
                }else{
                    console.log("Created Record ",{...newLogin});
                    result(null,{...newLogin});
                }
            });
        }
    });
    
};

Login.findAll = (result) =>{
    sql.query("SELECT * FROM Login_Credentials",(err,res)=>{
        if(err){
            console.log("Error: "+err);
            result(err,null);
            return;
        }else{
            result(null,res);
        }
    });
};

Login.findByNIC = (NIC,result) => {
    sql.query("SELECT * FROM Login_Credentials WHERE NIC = ? ",NIC,(err,res)=>{
        if(err){
           console.log("Error :"+err);
           result(err,null);
           return;
        }else if(res.length){
            console.log("Found Login Credentials: ",res[0]);
            result(null,res[0]);
            return;
        }else{
            console.log("Login Credentials not found");
            result({kind:"not_found"},null);
        }
    });
};

Login.findByUsername = (username,result) =>{
    sql.query("SELECT * FROM Login_Credentials WHERE UserName = ?",username,(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else if(res.length){
            console.log("Found Login Credentuals: ",res[0]);
            result(null,res[0]);
            return
        }else{
            console.log("Login credentials not found");
            result({kind:"not_found"},null);
        }
    });
};

Login.getPasswordByUsername = (username,result) =>{
    sql.query("SELECT Password FROM Login_Credentials WHERE UserName = ?",username,(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else if(res.length){
            console.log("Found password ",res[0]);
            result(null,res[0]);
            return;
        }else{
            console.log("No password was found for username ",username);
            result({kind:"not_found"},null);
            return;
        }
    });
};

Login.verifyPassword = (username,password,result) =>{
    sql.query("SELECT Password FROM Login_Credentials WHERE UserName = ?",username,(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else if(res.length){ 
            bcrypt.compare(password,res[0].Password,(err,res)=>{
                if(res){
                    console.log("Passwords match");
                    result(null,{kind:"match"});
                    return;
                }else{
                    console.log("Passwords don't match");
                    result(null,{kind:"unmatch"});
                    return
                }
            });
        }else{
            console.log("No records were found");
            result({kind:"not_found"},null);
            return;
        }
    });
};

Login.update = (id,login,result) =>{
    
    bcrypt.hash(login.Password,10,(err,hash)=>{
        if(err){
            console.log("Error Hashing"+err);
            result(err,null);
            return;
        }else{
                    sql.query("UPDATE Login_Credentials SET UserName = ?,Password = ?,AccountType = ? WHERE NIC = ?\
            ",[login.UserName,hash,login.AccountType,id],(err,res)=>{
                if(err){
                    console.log("Error : "+err);
                    result(err,null);
                    return;
                }else if(res.affectedRows == 0){
                    console.log("The Login Credentials are not found");
                    result({ kind: "not_found" }, null);
                    return;
                }else{
                    console.log("Updated Login Credentials",{...login});
                    result(null,{...login});
                }
            });
        }
    });
};

Login.delete = (NIC,result) => {
    sql.query("DELETE FROM Login_Credentials WHERE NIC = ?",NIC,(err,res)=>{
        if(err){
            console.log("Error : ",err);
            result(err,null);
            return;
        }else if(res.affectedRows == 0){
            console.log("Login Credentials for NIC "+NIC+" not Found");
            result({kind:"not_found"},null);
            return;
        }else{
            console.log("Deleted login credentials under NIC "+NIC);
            result(null,res);
        }
    });
};

Login.deleteAll = (result) => {
    sql.query("DELETE FROM Login_Credentials",(err,res)=>{
        if(err){
            console.log("Error : ",err);
            result(err,null);
            return;
        }else{
            console.log("Deleted "+res.affectedRows+" records");
            result(null,res);
        }
    });
};


module.exports = Login;