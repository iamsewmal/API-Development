const Resume = require("../models/resume.model.js");

exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message : "Content cannot be empty"
        });
    }else{
        Resume.create(new Resume(req.body),(err,data)=>{
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
    Resume.findAll((err,data)=>{
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

exports.findAllByCategory=(req,res)=>{
    Resume.findAllByCategory(req.params.category,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message : "No records were found under category "+req.params.category
                });
            }else{
                res.status(500).send({
                    message : err.message || "An error has been occured"
                });
            }
        
        }else{
            res.send(data);
        }
    });
};

exports.findAllByAcademicStatus=(req,res)=>{
    Resume.findAllByAcademicStatus(req.params.academicStatus,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message : "No records were found for academic status "+req.params.academicStatus
                });
            }else{
                res.status(500).send({
                    message : err.message || "An error has been occured"
                });
            }   
        }else{
            res.send(data);
        }
    });
};

exports.findByNIC = (req,res)=>{
    Resume.findByNIC(req.params.NIC,(err,data)=>{
        if(err){
            if(err.kind === "not_found")
            {
                res.status(404).send({
                    message : `The Resume under NIC ${req.params.NIC} is not found`
                });
            }
            else{
                res.status(500).send({
                    message : err.message || `An error occured while retrieving the Resume under NIC ${req.params.NIC}`
                });
            }
          
        }else{
            res.send(data);
        }
    });
};

exports.findByStudentId = (req,res)=>{
    Resume.findByStudentId(req.params.studentid,(err,data)=>{
        if(err){
            if(err.kind === "not_found")
            {
                res.status(404).send({
                    message : `The Resume under Student ID ${req.params.studentid} is not found`
                });
            }
            else{
                res.status(500).send({
                    message : err.message || `An error occured while retrieving the Resume under Student ID ${req.params.studentid}`
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
        Resume.update(req.params.NIC,new Resume(req.body),(err,data)=>{
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message : "The Resume under NIC "+req.params.NIC+" is not found" 
                    });
                }
                else{
                    res.status(500).send({
                        message : `Error updating the Resume under NIC ${req.params.NIC}`
                    });
                }
            }else{
                res.send(data);
            }
        });
    }
};

exports.updateByStudentId = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message : "Content cannot be empty"
        });
    }else{
        Resume.updateByStudentId(req.params.studentid,new Resume(req.body),(err,data)=>{
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message : "The user with Student Id "+req.params.studentid+" is not found" 
                    });
                }
                else{
                    res.status(500).send({
                        message : `Error updating the User with Student Id ${req.params.studentid}`
                    });
                }
            }else{
                res.send(data);
            }
        });
    }
};


exports.delete = (req,res) =>{
    Resume.delete(req.params.NIC,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message : `The resume with NIC ${req.params.NIC} is not found`
                });
            }
            else{
                res.status(500).send({
                    message : `Error deleting the resume with NIC ${req.params.NIC}`
                });
            }
        }else{
            res.send({message : `The resume was deleted successfully`});
        }
    });
};

exports.deleteByStudentId = (req,res) =>{
    Resume.deleteByStudentId(req.params.studentid,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message : `The resume with Student ID ${req.params.studentid} is not found`
                });
            }
            else{
                res.status(500).send({
                    message : `Error deleting the resume with Student ID ${req.params.studentid}`
                });
            }
        }else{
            res.send({message : `The resume was deleted successfully`});
        }
    });
};

exports.deleteAll = (req,res) =>{
    Resume.deleteAll((err,data)=>{
        if(err){
            res.status(500).send({
                message:
              err.message || "Some error occurred while removing all resumes." 
            });
        }else{
            res.send({message : "All the resumes were deleted successfully"});
        }
    });
}
