module.exports = app => {
  
    const users = require("../controllers/user.controller.js");
    
    app.post("/users", users.create);
    app.get("/users", users.findAll);
    app.get("/users/:NIC", users.findByNIC);
    app.get("/users/firstname/:Name",users.findByFirstName);
    app.get("/users/lastname/:Name",users.findByLastName);
    app.put("/users/:NIC", users.update);
    app.delete("/users/:NIC", users.delete);
    app.delete("/users", users.deleteAll);
  };