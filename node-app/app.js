const express =require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");

//bodyparser中间件
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


mongoose.connect('mongodb://localhost:27017/node_blog',{useNewUrlParser:true, useUnifiedTopology: true})
        .then(() => console.log("数据库连接成功"))
        .catch(err => console.log(err))


// passport初始化
app.use(passport.initialize());
require("./config/passport")(passport);

// app.get("/", (req, res) => {
//     res.send("Hello Word");
// })


//Users模块
app.use("/api/users", require("./routers/api/users"));
//Profile模块
app.use("/api/profiles",require("./routers/api/profiles"));

// 配置端口
const port = process.env.PORT || 500;
// 端口监听
app.listen(port, ()=> {
    console.log("server running");
})