module.exports = app => {
    const admins = require("../controllers/admin.controller.js");
    app.post("/admins",admins.create);
    app.get("/admins",admins.findAll);
    app.get("/admins/:NIC",admins.findByNIC);
    app.get("/admins/adminid/:adminid",admins.findByAdminId);
    app.put("/admins/:NIC",admins.update);
    app.put("/admins/adminid/:adminid",admins.updateById);
    app.delete("/admins/:NIC",admins.delete);
    app.delete("/admins/adminid/:adminid",admins.deleteById);
    app.delete("/admins",admins.deleteAll);
}