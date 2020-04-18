const sql = require("./db.js");
const Admin = function(admin) {
    this.NIC = admin.NIC;
    this.Admin_ID = admin.Admin_ID;
    this.Admin_Type = admin.Admin_Type;
};

Admin.create = (newAdmin,result) =>{
    sql.query("INSERT INTO Admin SET ?",newAdmin,(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else{
            console.log("Created record ",{...newAdmin});
            result(null,{...newAdmin});
            return;
        }
    });
};

Admin.findAll = (result) =>{
    sql.query("SELECT * FROM Admin",(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else{
            console.log("Admins: ",res);
            result(null,res);
            return;
        }
    });
};

Admin.findByNIC =(NIC,result) =>{
    sql.query("SELECT * FROM Admin WHERE NIC = ?",NIC,(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else if(res.length){
            console.log("Found Admin ",res[0]);
            result(null,res[0]);
            return;
        }else{
            console.log("No record was found for NIC "+NIC);
            result({kind:"not_found"},null);
            return;
        }
    });
};

Admin.findByAdminId=(adminid,result)=>{
    sql.query("SELECT * FROM Admin WHERE Admin_ID = ?",adminid,(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else if(res.length){
            console.log("Found Admin: ",res[0]);
            result(null,res[0]);
            return;
        }else{
            console.log("No record was found for admin id "+adminid);
            result({kind:"not_found"},null);
            return;
        }
    });
};

Admin.update = (NIC, newAdmin, result) => {
    sql.query("UPDATE Admin SET Admin_ID = ?,Admin_Type = ? WHERE NIC = ?",[newAdmin.Admin_ID,newAdmin.Admin_Type,NIC],(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else if(res.affectedRows == 0){
            console.log("No records were found for NIC "+NIC);
            result({kind:"not_found"},null);
            return;
        }else{
            console.log("Updated Admin : ",{...newAdmin});
            result(null,{...newAdmin});
            return;
        }
    });
};

Admin.updateById = (adminid, newAdmin, result) =>{
  sql.query("UPDATE Admin SET NIC = ?,Admin_Type = ? WHERE Admin_ID = ?",[newAdmin.NIC,newAdmin.Admin_Type,adminid],(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else if(res.affectedRows == 0){
            console.log("No records were found for admin id "+adminid);
            result({kind:"not_found"},null);
            return;
        }else{
            console.log("Updated Admin: ",{...newAdmin});
            result(null,{...newAdmin});
            return;
        }
  })
};

Admin.delete = (NIC,result) =>{
    sql.query("DELETE FROM Admin WHERE NIC = ?",NIC,(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else if(res.affectedRows == 0){
            console.log("No record was found for NIC "+NIC);
            result({kind:"not_found"},null);
            return;
        }else{
            console.log("Admin successfully deleted");
            result(null,res);
            return;
        }
    });
};

Admin.deleteById = (adminid,result) =>{
    sql.query("DELETE FROM Admin WHERE Admin_ID = ?",adminid,(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else if(res.affectedRows == 0){
            console.log("No record was found for admin id "+adminid);
            result({kind:"not_found"},null);
            return;
        }else{
            console.log("Admin successfully deleted");
            result(null,res);
            return;
        }
    });
};

Admin.deleteAll = (result) =>{
    sql.query("DELETE FROM Admin",(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else{
            console.log("All Admin records were deleted");
            result(null,res);
            return;
        }
    })
};
module.exports = Admin;