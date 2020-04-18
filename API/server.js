const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    res.json({message:"Welcome to University_To_Industry"});
});

require("./app/routes/tester.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/login.routes.js")(app);
require("./app/routes/expert.route.js")(app);
require("./app/routes/student.route.js")(app);
require("./app/routes/resume.route.js")(app);

app.listen(PORT,()=>{
    console.log("Server is running on PORT : "+PORT);
});
