const sql=require('./db.js');

const Expert = function(expert){
    this.Employee_ID = expert.Employee_ID;
    this.Affiliation = expert.Affiliation;
    this.NIC = expert.NIC;
};

Expert.create = (newExpert,result)=>{
    sql.query("INSERT INTO Expert SET ?",newExpert,(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else{
            console.log("Created record: ",{...newExpert});
            result(null,{...newExpert});
        }
    });
};

Expert.findAll = (result)=>{
    sql.query("SELECT * FROM Expert",(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else{
            console.log("Experts: ",res);
            result(null,res);
        }
    })
};

Expert.findByNIC = (NIC,result) =>{
    sql.query("SELECT * FROM Expert WHERE NIC =?",NIC,(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else if(res.length){
            console.log("Found Expert: ",res[0]);
            result(null,res[0]);
            return;
        }else{
            result({kind:"not_found"},null);
        }
    });
};

Expert.findByEmpId = (EmpId,result) =>{
    sql.query("SELECT * FROM Expert WHERE Employee_ID = ?",EmpId,(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else if(res.length){
            console.log("Found Expert: ",res[0]);
            result(null,res[0]);
            return;
        }else{
            result({kind:"not_found"},null);
        }
    });
}

Expert.update = (NIC, expert, result) =>{
    sql.query("UPDATE Expert SET Affiliation = ?, \
    Employee_ID = ? WHERE NIC = ?",[expert.Affiliation,expert.Employee_ID,NIC],(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else if(res.affectedRows == 0){
            console.log("The Expert with NIC "+expert.NIC+" is not found");
            result({kind:"not_found"},null);
            return;
        }else{
            console.log("Updated Expert: ",{...expert});
            result(null,{...expert});
        }
    });
};

Expert.updateByEmpId = (EmpId,expert,result) =>{
    sql.query("UPDATE Expert SET Affiliation = ?, \
    NIC = ? WHERE Employee_ID = ?",[expert.Affiliation,expert.NIC,EmpId],(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else if(res.affectedRows == 0){
            console.log("The Expert with employee "+expert.EmpId+" is not found");
            result({kind:"not_found"},null);
            return;
        }else{
            console.log("Updated Expert: ",{...expert});
            result(null,{...expert});
        }
    });
};

Expert.delete = (NIC,result)=>{
    sql.query("DELETE FROM Expert WHERE NIC = ?",NIC,(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else if(res.affectedRows == 0){
            console.log("The Expert with NIC "+NIC+" is not found");
            result({kind:"not_found"},null);
            return;
        }else{
            console.log("Deleted Expert with NIC "+NIC);
            result(null,res);
        }
    });
}

Expert.deleteByEmpId = (EmpId,result)=>{
    sql.query("DELETE FROM Expert WHERE Employee_ID = ?",EmpId,(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else if(res.affectedRows == 0){
            console.log("The Expert with employee id "+EmpId+" is not found");
            result({kind:"not_found"},null);
            return;
        }else{
            console.log("Deleted Expert with employee id "+EmpId);
            result(null,res);
            return;
        }
    });
}

Expert.deleteAll = (result)=>{
    sql.query("DELETE FROM Expert",(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else{
            console.log("Deleted "+res.affectedRows+" Experts");
            result(null,res);
        }
    });
}

module.exports = Expert;