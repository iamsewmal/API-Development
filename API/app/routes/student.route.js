module.exports = app => {
    const students = require("../controllers/student.controller.js");
    app.post("/students",students.create);
    app.get("/students",students.findAll);
    app.get("/students/:NIC",students.findByNIC);
    app.get("/students/studentid/:studentId",students.findByStudentId);
    app.put("/students/:NIC",students.update);
    app.delete("/students/:NIC",students.delete);
    app.delete("/students",students.deleteAll);
};