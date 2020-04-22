const sql = require('./db.js');

const User = function(user){
    this.NIC = user.NIC;
    this.First_Name = user.First_Name;
    this.Last_Name = user.Last_Name;
    this.DOB = user.DOB;
    this.Address_Line_1 = user.Address_Line_1;
    this.Address_Line_2 = user.Address_Line_2;
    this.Email = user.Email;
    this.Contact_No = user.Contact_No;
};

User.create = (newUser, result)=>{
    
    sql.query("INSERT INTO User SET ?",newUser,(err,res)=>{
        if(err){
            console.log("Error: "+err);
            result(err,null);
            return;
        }else{
            console.log("Created record: ",{...newUser});
            result(null,{...newUser});
            return;
        }
    });
};

User.findByNIC = (NIC, result) => {
    sql.query("SELECT * FROM User WHERE NIC = ? ",NIC, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err,null);
        return;
      }else if (res.length) {
        console.log("found User: ", res[0]);
        result(null,res[0]);
        return;
      }else{
        console.log("No record was found for the NIC "+NIC);
        result({ kind: "not_found" }, null);
        return;
      }
    });
  };

  User.findByFirstName = (Name,result)=>{
      sql.query("SELECT * FROM User WHERE First_Name = ?",Name,(err,res)=>{
        if(err){
            console.log("Error: ",err);
            result(err,null);
            return;
        }else if(res.length){
            console.log("Found User: ",res[0]);
            result(null,res[0]);
            return;
        }else{
            console.log("No record was found for "+Name);
            result({kind:"not_found"},null);
            return;
        }
    });
  }

  User.findByLastName = (Name,result)=>{
    sql.query("SELECT * FROM User WHERE Last_Name = ?",Name,(err,res)=>{
      if(err){
          console.log("Error: ",err);
          result(err,null);
          return;
      }else if(res.length){
          console.log("Found User: ",res[0]);
          result(null,res[0]);
          return;
      }else{
          console.log("No record was found for "+Name);
          result({kind:"not_found"},null);
          return;
      }
  });
}

  User.findAll = result => {
    sql.query("SELECT * FROM User", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err,null);
        return;
      }else{
        console.log("Users: ", res);
        result(null, res);
        return;
      }
    });
  };

  User.update = (id, user, result) => {
    sql.query(
      "UPDATE User SET First_Name = ?, Last_Name = ?, DOB = ?, Address_Line_1 = ?, \
      Address_Line_2 = ?, Email = ?, Contact_No = ? WHERE NIC = ?",
      [user.First_Name, user.Last_Name, user.DOB, user.Address_Line_1, user.Address_Line_2, user.Email, user.Contact_No, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }else if (res.affectedRows == 0) {
          console.log("The User with NIC "+user.NIC+" is not found");
          result({ kind: "not_found" }, null);
          return;
        }else{
            console.log("updated User: ", {...user});
            result(null, {...user});
            return;
        }   
      });
  };

  User.delete = (NIC, result) => {

    sql.query("DELETE FROM User WHERE NIC = ?", NIC, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err,null);
        return;
      }else if (res.affectedRows == 0) {
        console.log("User with NIC "+NIC+" not found");
        result({ kind: "not_found" }, null);
        return;
      }else{
        console.log("deleted user with NIC: ", NIC);
        result(null, res);
        return;
      }
     
    });
  };

  User.deleteAll = result => {
    sql.query("DELETE FROM User", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }else{
        console.log(`deleted ${res.affectedRows} users`);
        result(null, res);
        return;
      }
    });
  };
  
  module.exports = User;