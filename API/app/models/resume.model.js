const sql = require("./db.js");

const Resume = function(resume){
    this.Student_ID = resume.Student_ID;
    this.NIC = resume.NIC;
    this.Job_Category = resume.Job_Category;
    this.Academic_Status = resume.Academic_Status;
    this.Academic_Qualification_1 = resume.Academic_Qualification_1;
    this.Academic_Qualification_2 = resume.Academic_Qualification_2;
    this.Academic_Qualification_3 = resume.Academic_Qualification_3;
    this.Academic_Qualification_4 = resume.Academic_Qualification_4;
    this.Academic_Qualification_5 = resume.Academic_Qualification_5;
    this.Professional_Qualification_1 = resume.Professional_Qualification_1;
    this.Professional_Qualification_2 = resume.Professional_Qualification_2;
    this.Professional_Qualification_3 = resume.Professional_Qualification_3;
    this.Professional_Qualification_4 = resume.Professional_Qualification_4;
    this.Professional_Qualification_5 = resume.Professional_Qualification_5;
};

Resume.create = (newResume,result) =>{
    sql.query("INSERT INTO Resume SET ?",newResume,(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return
        }else{
            console.log("Created a new record ",{...newResume});
            result(null,{...newResume});
            return;
        }
    });
};

Resume.findAll = (result)=>{
    sql.query("SELECT * FROM Resume",(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else{
            console.log("Resumes: ",res);
            result(null,res);
            return;
        }
    });
};

Resume.findAllByCategory = (category,result) => {
    sql.query("SELECT * FROM Resume WHERE Job_Category = ?",category,(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else if(res.length){
            console.log("Resumes: ",res);
            result(null,res);
            return;
        }else{
            console.log("No records were found under category "+category);
            result({kind:"not_found"},null);
            return;
        }
    });
};

Resume.findAllByAcademicStatus = (academicStatus,result) => {
    sql.query("SELECT * FROM Resume WHERE Academic_Status = ?",academicStatus,(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else if(res.length){
            console.log("Resumes: ",res);
            result(null,res);
            return;
        }else{
            console.log("No records were found under academic status "+academicStatus);
            result({kind:"not_found"},null);
            return;
        }
    });
};

Resume.findByNIC = (NIC,result) =>{
    sql.query("SELECT * FROM Resume WHERE NIC = ?",NIC,(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else if(res.length){
            console.log("Resume: ",res[0]);
            result(null,res[0]);
            return;
        }else{
            console.log("No record was found for NIC "+NIC);
            result({kind:"not_found"},null);
            return;
        }
    });
};

Resume.findByStudentId = (studentid,result) =>{
    sql.query("SELECT * FROM Resume WHERE Student_ID = ?",studentid,(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else if(res.length){
            console.log("Resume: ",res[0]);
            result(null,res[0]);
            return;
        }else{
            console.log("No records were found for student id "+studentid);
            result({kind:"not_found"},null);
            return;
        }
    });
};

Resume.update = (NIC, resume, result) =>{
    sql.query("Update Resume SET Student_ID = ?,Job_Category = ?,Academic_Status = ?,\
    Academic_Qualification_1 = ?,Academic_Qualification_2 = ?,Academic_Qualification_3 = ?,\
    Academic_Qualification_4 = ?,Academic_Qualification_5 = ?,Professional_Qualification_1 = ?\
    ,Professional_Qualification_2 = ?,Professional_Qualification_3 = ?,Professional_Qualification_4 = ?\
    ,Professional_Qualification_5 = ? WHERE NIC = ?",[resume.Student_ID,resume.Job_Category,resume.Academic_Status,
        resume.Academic_Qualification_1,resume.Academic_Qualification_2,resume.Academic_Qualification_3,
        resume.Academic_Qualification_4,resume.Academic_Qualification_5,resume.Professional_Qualification_1,
        resume.Professional_Qualification_2,resume.Professional_Qualification_3,resume.Professional_Qualification_4,
        resume.Professional_Qualification_5,NIC],(err,res)=>{
            if(err){
                console.log("Error: ",err);
                result(err,null);
                return;
            }else if(res.affectedRows == 0){
                console.log("No record was found for NIC "+NIC);
                result({kind:"not_found"},null);
                return;
            }else{
                console.log("Updated record: ",{...resume});
                result(null,{...resume});
                return;
            }
        });
};

Resume.updateByStudentId = (studentid,resume,result) => {
    sql.query("Update Resume SET NIC = ?,Job_Category = ?,Academic_Status = ?,\
    Academic_Qualification_1 = ?,Academic_Qualification_2 = ?,Academic_Qualification_3 = ?,\
    Academic_Qualification_4 = ?,Academic_Qualification_5 = ?,Professional_Qualification_1 = ?\
    ,Professional_Qualification_2 = ?,Professional_Qualification_3 = ?,Professional_Qualification_4 = ?\
    ,Professional_Qualification_5 = ? WHERE Student_ID = ?",[resume.NIC,resume.Job_Category,resume.Academic_Status,
        resume.Academic_Qualification_1,resume.Academic_Qualification_2,resume.Academic_Qualification_3,
        resume.Academic_Qualification_4,resume.Academic_Qualification_5,resume.Professional_Qualification_1,
        resume.Professional_Qualification_2,resume.Professional_Qualification_3,resume.Professional_Qualification_4,
        resume.Professional_Qualification_5,studentid],(err,res)=>{
            if(err){
                console.log("Error: ",err);
                result(err,null);
                return;
            }else if(res.affectedRows == 0){
                console.log("No record was found for student id "+studentid);
                result({kind:"not_found"},null);
                return;
            }else{
                console.log("Updated record :",{...resume});
                result(null,{...resume});
                return;
            }
        });
};

Resume.delete = (NIC,result) =>{
    sql.query("DELETE From Resume WHERE NIC = ?",NIC,(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else if(res.affectedRows == 0){
            console.log("No record was found for NIC "+NIC);
            result({kind:"not_found"},null);
        }else{
            console.log("Deleted successfully");
            result(null,res);
            return;
        }
    });
};

Resume.deleteByStudentId = (studentid,result) => {
    sql.query("DELETE From Resume WHERE Student_ID = ?",studentid,(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else if(res.affectedRows == 0){
            console.log("No record was found for student id "+studentid);
            result({kind:"not_found"},null);
            return;
        }else{
            console.log("Deleted successfully");
            result(null,res);
            return;
        }
    });
};

Resume.deleteAll = (result) => {
    sql.query("DELETE From Resume",(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else{
            console.log("All resume records were deleted successfully");
            result(null,res);
            return;
        }
    });
};

module.exports = Resume;