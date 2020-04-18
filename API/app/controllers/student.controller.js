const Student = require("../models/student.model.js");

exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message : "Content cannot be empty"
        });
    }else{
        Student.create(new Student(req.body),(err,data)=>{
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

exports.findAll = (req,res)=>{
    Student.findAll((err,data)=>{
        if(err){
            res.status(500).send({
                message : err.message || "An error occured"
            });
        }else{
            res.send(data);
        }
    });
};

exports.findByNIC = (req,res)=>{
    Student.findByNIC(req.params.NIC,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message : `No Student record was found under NIC ${req.params.NIC}`
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

exports.findByStudentId = (req,res)=>{
    Student.findByStudentId(req.params.studentId,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({message:`No Student record was found under Student ID ${req.params.studentId}`});
            }else{
                res.status(500).send({message : err.message || " An error occured"});
            }
        }else{
            res.send(data);
        }
    })
};

exports.update = (req,res) =>{
    if(!req.body){
        res.status(400).send({message:"Content cannot be empty"});
    }else{
        Student.update(req.params.NIC,new Student(req.body),(err,data)=>{
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message : "No Student record was found under NIC "+req.params.NIC
                    });
                }else{
                    res.status(500).send({
                        message : "An error occured"
                    });
                }
            }else{
                res.send(data);
            }
        });
    }
};

exports.updateByStudentId =(req,res) =>{
    Student.updateByStudentId(req.params.studentid,new Student(req.body),(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message : "No Student record was found under student id "+req.params.studentid
                });
            }else{
                res.status(500).send({
                    message : "An error occured"
                });
            }
        }else{
            res.send(data);
        }
    });
};
exports.delete = (req,res)=>{
    Student.delete(req.params.NIC,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message : `No record was found under NIC ${req.params.NIC}`
                });
            }else{
                res.status(500).send({
                    message : err.message || "An error occured"
                });
            }
        }else{
            res.send({message : "Record deleted successfully"});
        }
    });
};

exports.deleteAll = (req,res)=>{
   Student.deleteAll((err,data)=>{
    if(err){
        res.status(500).send({
            message : err.message || "An error occured"
        });
    }else{
        res.send({
            message : "All Student records were deleted"
        });
    }
   });
};