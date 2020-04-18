module.exports = app => {
    const testers = require("../controllers/tester.controller.js");
  
    
    app.post("/testers", testers.create);
  
   
    app.get("/testers", testers.findAll);
  
   
    app.get("/testers/:testerId", testers.findOne);
  
    
    app.put("/testers/:testerId", testers.update);
  
   
    app.delete("/testers/:testerId", testers.delete);
  
    
    app.delete("/testers", testers.deleteAll);
  };