module.exports = app =>{
    const resumes = require("../controllers/resume.controller.js");
    app.post("/resumes", resumes.create);
    app.get("/resumes", resumes.findAll);
    app.get("/resumes/:NIC", resumes.findByNIC);
    app.get("/resumes/studentid/:studentid",resumes.findByStudentId);
    app.get("/resumes/category/:category", resumes.findAllByCategory);
    app.get("/resumes/academicstatus/:academicStatus", resumes.findAllByAcademicStatus);
    app.put("/resumes/:NIC", resumes.update);
    app.put("/resumes/studentid/:studentid", resumes.updateByStudentId);
    app.delete("/resumes/:NIC", resumes.delete);
    app.delete("/resumes/studentid/:studentid", resumes.deleteByStudentId);
    app.delete("/resumes", resumes.deleteAll);
};