module.exports = app =>{
    const expert = require('../controllers/expert.controller.js');

    app.post("/experts",expert.create);
    app.get("/experts",expert.findAll);
    app.get("/experts/:NIC",expert.findByNIC);
    app.get("/experts/empid/:empid",expert.findByEmpId);
    app.put("/experts/:NIC",expert.update);
    app.delete("/experts/:NIC",expert.delete);
    app.delete("/experts",expert.deleteAll);
}