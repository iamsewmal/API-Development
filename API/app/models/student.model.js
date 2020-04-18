const sql = require("./db.js");

const Student = function(student){
    this.NIC = student.NIC;
    this.Student_ID = student.Student_ID;
    this.Affiliation = student.Affiliation;
};

Student.create = (newStudent,result) => {
    sql.query("INSERT INTO Student SET ?",newStudent,(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else{
            console.log("Create new record ",{...newStudent});
            result(null,{...newStudent});
        }
    });
};

Student.findAll = (result) => {
    sql.query("SELECT * FROM Student",(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else{
            console.log("Students: ",res);
            result(null,res);
        }
    });
};

Student.findByNIC = (NIC,result) => {
    sql.query("SELECT * FROM Student WHERE NIC = ?",NIC,(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else if(res.length){
            console.log("Found Student: ",res[0]);
            result(null,res[0]);
            return;
        }else{
            result({kind:"not_found"},null);
        }
    });
};

Student.findByStudentId = (StudentID,result) => {
    sql.query("SELECT * FROM Student WHERE Student_ID = ?",StudentID,(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else if(res.length){
            console.log("Found Student: ",res[0]);
            result(null,res[0]);
            return;
        }else{
            result({kind:"not_found"},null);
        }
    });
};

Student.update = (NIC, student, result) =>{
    sql.query("UPDATE Student SET Affiliation = ?, \
    Student_ID = ? WHERE NIC = ?",[student.Affiliation,student.Student_ID,NIC],(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else if(res.affectedRows == 0){
            console.log("The Student with NIC "+NIC+" was not found");
            result({kind:"not_found"},null);
            return;
        }else{
            console.log("Updated Student ",{...student});
            result(null,{...student});
        }
    });
};

Student.updateByStudentId = (studentid, student, result) =>{
    sql.query("UPDATE Student SET Affiliation = ?, \
    NIC = ? WHERE Student_ID = ?",[student.Affiliation,student.NIC,studentid],(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else if(res.affectedRows == 0){
            console.log("The Student with student id "+studentid+" was not found");
            result({kind:"not_found"},null);
            return;
        }else{
            console.log("Updated Student ",{...student});
            result(null,{...student});
        }
    });
};

Student.delete = (NIC,result) =>{
    sql.query("DELETE FROM Student WHERE NIC = ?",NIC,(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else if(res.affectedRows == 0){
            console.log("Student record under NIC "+NIC+" is not found");
            result({kind:"not_found"},null);
            return;
        }else{
            console.log("Student record under NIC "+NIC+" was deleted");
            result(null,res);
        }
    });
};  

Student.deleteAll = (result) => {
    sql.query("DELETE FROM Student",(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else{
            console.log("Deleted "+res.affectedRows+" records");
            result(null,res);
        }
    });
};

module.exports = Student;