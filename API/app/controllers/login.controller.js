const Login = require('../models/login.model.js');

exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message : "Content cannot be empty"
        });
    }else{
        Login.create(new Login(req.body),(err,data)=>{
            if(err){
                res.status(500).send({
                    message : err.message || "An error has been occured"
                });
            }
            else{
                res.send(data);
            }
        });
    }
};

exports.findAll = (req,res)=>{
    Login.findAll((err,data)=>{
        if(err){
            res.status(500).send({
                message : err.message || "An error has been occured"
            });
        }else{
            res.send(data);
        }
    });
}; 

exports.findByNIC = (req,res)=>{
    Login.findByNIC(req.params.NIC,(err,data)=>{
        if(err){
            if(err.kind === "not_found")
            {
                res.status(404).send({
                    message : `Login credentials for NIC ${req.params.NIC} were not found`
                });
            }
            else{
                res.status(500).send({
                    message : err.message || `An error occured while retrieving the login credentials`
                });
            }
          
        }
        else{
            res.send(data);
        }
    });
};

exports.findByUsername = (req,res) =>{
    Login.findByUsername(req.params.username,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message : `Login Credentials associated with the username ${req.params.username} are not found`
                });
            }else{
                res.status(500).send({
                    message : err.message || "An error occured"
                });
            }
        }else{
            res.send(data);
        }
    });
};

exports.getPasswordByUsername = (req,res) =>{
    Login.getPasswordByUsername(req.params.username,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message : "The password for username "+req.params.username+" is not found"
                });
            }else{
                res.status(500).send({
                    message : err.message || "An error occured"
                });
            }
        }else{
            res.send(data);
        }
    });
};

exports.verifyPassword = (req,res) =>{
    Login.verifyPassword(req.params.username,req.params.password,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message : "No records were found"
                });
            }else{
                res.status(500).send({
                    message : err.message || "An error occured"
                });
            }
        }else{
            if(data.kind === "match"){
                res.send({
                    message : "Correct Password"
                });
            }else if(data.kind ==="unmatch"){
                res.send({
                    message : "Wrong Password"
                });
            }
        }
    })
};

exports.update = (req,res) =>{
    if(!req.body){
        res.status(400).send({
            message : "Content cannot be empty"
        });
    }else{
        Login.update(req.params.NIC,new Login(req.body),(err,data)=>{
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message : "The Login Credentials under NIC "+req.params.NIC+" are not found"
                    });
                }else{
                    res.status(500).send({
                        message : "An error occured while updating the login credentials under NIC "+req.params.NICl
                    });
                }
            }else{
                res.send(data);
            }
        });
    }
};

exports.delete = (req,res) => {
    Login.delete(req.params.NIC,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message : "Login Credentials under NIC "+req.params.NIC+" were not found"
                });
            }else{
                res.status(500).send({
                    message : "Error deleting the Login Credentials under NIC "+req.params.NIC
                });
            }
        }else{
            res.send({
                message : "Login Credentials under NIC "+req.params.NIC+" deleted successfully"
            });
        }
    });
};

exports.deleteAll = (req,res) =>{
    Login.deleteAll((err,data)=>{
        if(err){
            res.status(500).send({
                message :
                err.message || "Error deleting Login Credentials"
            });
        }else{
            res.send({
                message : "All login credentials were deleted"
            });
        }
    });
}