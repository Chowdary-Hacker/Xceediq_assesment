const express = require("express");
const server = express();
const cors = require("cors")
const studentInfo = require("./routers/studentInfo");const fee = require("./routers/fee"); const studentLogin = require("./routers/studentLogin"); const teacherInfo = require("./routers/teacherInfo");const teacherLogin = require("./routers/teacherLogin");const parentLogin = require("./routers/parentLogin");const adminLogin = require("./routers/adminLogin");const adminAssistLogin = require("./routers/adminAssistLogin");
server.use(cors());
server.use(express.json());    // middleware
const port = 3333;
server.listen(port, () => {
    console.log("Server listening..");
});
//Router
server.use("/fee",fee);
server.use("/studentInfo",studentInfo);
server.use("/studentLogin",studentLogin);
server.use("/teacherInfo",teacherInfo);
server.use("/teacherLogin",teacherLogin);
server.use("/parentLogin",parentLogin);
server.use("/adminLogin",adminLogin);
server.use("/adminAssistLogin",adminAssistLogin);


