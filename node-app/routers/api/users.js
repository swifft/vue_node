const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../../models/User");
const passport = require("passport");

//GET api/users/test

// router.get("/test",(req,res) =>{
//     res.json({msg:"login work"})
// })

//POST api/users/register

router.post("/register",(req,res) =>{
    console.log(req.body);

    //查询数据库中是否有邮箱
    User.findOne({email:req.body.email})
        .then((user)=>{
            if(user){
                return res.status(400).json({email:"邮箱已被注册"})
            }else{

                var avatar = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581077309200&di=038f7d2c7dfb50952638af4572251ac3&imgtype=0&src=http%3A%2F%2Fimg.qqzhi.com%2Fuploads%2F2018-12-21%2F094256255.gif";

                const newUser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    avatar,
                    password:req.body.password,
                    identity:req.body.identity
                })

                newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                
            }
        })
})


//POST api/users/login
//返回token jwt passport

router.post("/login",(req, res) =>{
    const email = req.body.email;
    const password = req.body.password;
    // 查询数据库
    User.findOne({email})
        .then(user =>{
            if(!user){
                return res.status(404).json("用户不存在")
            }
            // 密码匹配
            if(password == user.password){
                const rule = {id:user.id,name:user.name,avatar:user.avatar,identity:user.identity};
                jwt.sign(rule,"secret",{expiresIn:3600},(err, token)=>{
                    if(err) throw err;
                    res.json({
                        success:true,
                        token:"Bearer "+token
                    })
                })
            }else{
                return res.status(400).json("密码错误");
            }
        })
})


//GET api/users/current
//返回 current userInfo
router.get("/current",passport.authenticate("jwt",{session:false}),(req, res) =>{
    // res.json({msg:"success"})
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
    });
})

   
module.exports = router;