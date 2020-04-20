module.exports = app => {
    
    const login = require('../controllers/login.controller.js');
    
    app.post("/logins", login.create);
    app.get("/logins", login.findAll);
    app.get("/logins/:NIC", login.findByNIC);
    app.get("/logins/username/:username", login.findByUsername);
    app.get("/logins/password/:username",login.getPasswordByUsername);
    app.get("/logins/verifypassword/:username/:password",login.verifyPassword);
    app.put("/logins/:NIC", login.update);
    app.delete("/logins/:NIC", login.delete);
    app.delete("/logins", login.deleteAll);
 
};