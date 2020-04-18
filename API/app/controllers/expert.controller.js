const Expert = require('../models/expert.model.js');

exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            messsage : "Content cannot be empty"
        });
    }else{
        Expert.create(new Expert(req.body),(err,data)=>{
            if(err){
                res.status(500).send({
                    messsage : "An error occured"
                });
            }else{
                res.send(data);
            }
        });
    }
};

exports.findAll = (req,res) =>{
    Expert.findAll((err,data)=>{
        if(err){
            res.status(500).send({
                messsage : "An error occured"
            });
        }else{
            res.send(data);
        }
    });
};

exports.findByNIC = (req,res) => {
    Expert.findByNIC(req.params.NIC,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    messsage : "The Expert with NIC "+req.params.NIC+" is not found"
                });
            }else{
                res.status(500).send({
                    messsage : err.messsage || "An Error Occured"
                });
            }
        }else{
            res.send(data);
        }
    });
};

exports.findByEmpId = (req,res)=>{
    Expert.findByEmpId(req.params.empid,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    messsage : "The Expert with Employee ID "+req.params.empid+" is not found"
                })
            }else{
                res.status(500).send({
                    messsage : err.messsage || "An Error Occured"
                });
            }
        }else{
            res.send(data);
        }
    })
};

exports.update = (req,res) => {
    if(!req.body){
        res.status(400).send({
            messsage : "Content cannot be empty"
        });
    }else{
        Expert.update(req.params.NIC,new Expert(req.body),(err,data)=>{
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        messsage : "The Expert with NIC "+req.params.NIC+" is not found"
                    });
                }else{
                    res.status(500).send({
                        messsage : "An error occured"
                    });
                }
            }else{
                res.send(data);
            }
        });
    }
};

exports.delete = (req,res) =>{
    Expert.delete(req.params.NIC,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    messsage : "The Expert with NIC "+req.params.NIC+" is not found"
                });
            }else{
                res.status(500).send({
                    messsage:
                    err.messsage || "An error occured"
                });
            }
        }else{
            res.send({messsage : "The Expert was deleted successfully"});
        }
    });
};

exports.deleteAll = (req,res) =>{
    Expert.deleteAll((err,data)=>{
        if(err){
            res.status(500).send({
                messsage : "An Error occured"
            });
        }else{
            res.send({
                messsage : "All Experts were removed successfully"
            });
        }
    });
};
