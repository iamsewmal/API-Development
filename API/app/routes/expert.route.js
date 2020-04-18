module.exports = app =>{
    const expert = require('../controllers/expert.controller.js');

    app.post("/experts",expert.create);
    app.get("/experts",expert.findAll);
    app.get("/experts/:NIC",expert.findByNIC);
    app.get("/experts/employeeid/:empid",expert.findByEmpId);
    app.put("/experts/:NIC",expert.update);
    app.put("/experts/employeeid/:empid",expert.updateByEmpId);
    app.delete("/experts/:NIC",expert.delete);
    app.delete("/experts/employeeid/:empid",expert.deleteByEmpId);
    app.delete("/experts",expert.deleteAll);
}