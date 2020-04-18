module.exports = app => {
    
    const login = require('../controllers/login.controller.js');
    
    app.post("/login", login.create);
    app.get("/login", login.findAll);
    app.get("/login/:NIC", login.findByNIC);
    app.get("/login/username/:username", login.findByUsername);
    app.put("/login/:NIC", login.update);
    app.delete("/login/:NIC", login.delete);
    app.delete("/login", login.deleteAll);
 
};