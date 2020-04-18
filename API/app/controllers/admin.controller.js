const Admin = require("../models/admin.model.js");

exports.create = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message:"Content cannot be empty"
        });
    }else{
        Admin.create(new Admin(req.body),(err,data)=>{
            if(err){
                res.status(500).send({
                    message : err.message || "An error occured"
                });
            }else{
                res.send(data);
            }
        });
    }
};

exports.findAll = (req,res) => {
    Admin.findAll((err,data)=>{
        if(err){
            res.status(500).send({
                message : err.message || "An error occured"
            });
        }else{
            res.send(data);
        }
    });
};

exports.findByNIC = (req,res) => {
    Admin.findByNIC(req.params.NIC,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message : "No record was found for NIC "+req.params.NIC
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

exports.findByAdminId = (req,res) => {
    Admin.findByAdminId(req.params.adminid,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message : "No record found for admin id "+req.params.adminid
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

exports.update = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message : "Content cannot be empty"
        });
    }else{
        Admin.update(req.params.NIC,new Admin(req.body),(err,data)=>{
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message : "No record was found for NIC "+req.params.NIC
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
    }
};

exports.updateById = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message : "Content cannot be empty"
        });
    }else{
        Admin.updateById(req.params.adminid,new Admin(req.body),(err,data)=>{
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message : "No records were found for admin id "+req.params.adminid
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
    }
};

exports.delete = (req,res) => {
    Admin.delete(req.params.NIC,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message : "No record found for NIC "+req.params.NIC
                });
            }else{
                res.status(500).send({
                    message : err.message || "An error occured"
                });
            }
        }else{
            res.send({message: "The Admin was successfully deleted"});
        }
    });
};

exports.deleteById = (req,res) => {
    Admin.deleteById(req.params.adminid,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message : "No record found for admin id "+req.params.adminid
                });
            }else{
                res.status(500).send({
                    message : err.message || "An error occured"
                });
            }
        }else{
            res.send({message: "The Admin was successfully deleted"});
        }
    });
};

exports.deleteAll = (req,res) => {
    Admin.deleteAll((err,data)=>{
        if(err){
            res.status(500).send({
                message : err.message || "An error occured"
            });
        }else{
            res.send({message: "All admin records were successfully deleted"});
        }
    });
};