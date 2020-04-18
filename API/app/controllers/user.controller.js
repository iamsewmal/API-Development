const User = require('../models/user.model.js');

exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message : "Content cannot be empty"
        });
    }else{
        User.create(new User(req.body),(err,data)=>{
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

exports.findAll=(req,res)=>{
    User.findAll((err,data)=>{
        if(err){
            res.status(500).send({
                message : err.message || "An error has been occured"
            });
        }
        else{
            res.send(data);
        }
    });
};

exports.findByFirstName = (req,res) => {
    User.findByFirstName(req.params.Name,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                   message : "The User "+req.params.Name+" is not found" 
                });
            }else{
                res.status(500).send({
                    message : err.message || "An Error occured"
                });
            }
        }else{
            res.send(data);
        }
    })
};

exports.findByLastName = (req,res) => {
    User.findByLastName(req.params.Name,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                   message : "The User "+req.params.Name+" is not found" 
                });
            }else{
                res.status(500).send({
                    message : err.message || "An Error occured"
                });
            }
        }else{
            res.send(data);
        }
    })
};

exports.findByNIC = (req,res)=>{
    User.findByNIC(req.params.NIC,(err,data)=>{
        if(err){
            if(err.kind === "not_found")
            {
                res.status(404).send({
                    message : `The User with NIC ${req.params.NIC} is not found`
                });
            }
            else{
                res.status(500).send({
                    message : err.message || `An error occured while retrieving the User with NIC ${req.params.NIC}`
                });
            }
          
        }
        else{
            res.send(data);
        }
    });
};

exports.update = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message : "Content cannot be empty"
        });
    }else{
        User.update(req.params.NIC,new User(req.body),(err,data)=>{
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message : "The user with NIC "+req.params.NIC+" is not found" 
                    });
                }
                else{
                    res.status(500).send({
                        message : `Error updating the User with NIC ${req.params.NIC}`
                    });
                }
            }else{
                res.send(data);
            }
        });
    }
};

exports.delete = (req,res) =>{
    User.delete(req.params.NIC,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message : `The user with NIC ${req.params.NIC} is not found`
                });
            }
            else{
                res.status(500).send({
                    message : `Error deleting the user with NIC ${req.params.NIC}`
                });
            }
        }else{
            res.send({message : `The User was deleted successfully`});
        }
    });
};

exports.deleteAll = (req,res) =>{
    User.deleteAll((err,data)=>{
        if(err){
            res.status(500).send({
                message:
              err.message || "Some error occurred while removing all Users." 
            });
        }else{
            res.send({message : "All the Users were deleted successfully"});
        }
    });
};
