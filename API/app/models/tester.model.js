const sql = require('./db.js');

const Tester = function(tester){
    this.name = tester.name;
    this.age = tester.age;
};

Tester.create = (newTester, result)=>{
    
    sql.query("INSERT INTO tester SET ?",newTester,(err,res)=>{
        if(err){
            console.log("Error: "+err);
            result(err,null);
            return;
        }
        console.log("Created record: ",{id: res.insertId, ...newTester});
        result(null,{id:res.insertId, ...newTester});
    })
};

Tester.findById = (testerId, result) => {
    sql.query(`SELECT * FROM tester WHERE id = ${testerId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found tester: ", res[0]);
        result(null, res[0]);
        return;
      }
  
     
      result({ kind : ""}, null);
    });
  };

  Tester.getAll = result => {
    sql.query("SELECT * FROM tester", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("testers: ", res);
      result(null, res);
    });
  };

  Tester.updateById = (id, tester, result) => {
    sql.query(
      "UPDATE tester SET name = ?, age = ? WHERE id = ?",
      [tester.name, tester.age, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated tester: ", { id: id, ...tester });
        result(null, { id: id, ...tester });
      }
    );
  };

  Tester.remove = (id, result) => {
    sql.query("DELETE FROM tester WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted tester with id: ", id);
      result(null, res);
    });
  };

  Tester.removeAll = result => {
    sql.query("DELETE FROM tester", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} testers`);
      result(null, res);
    });
  };
  
  module.exports = Tester;