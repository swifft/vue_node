<template>
    <div class="register">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">后台管理系统</span>
                <el-form :model="registerUser" status-icon :rules="registerRules" ref="registerRef" label-width="80px" class="registerForm">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="registerUser.email" placeholder="请输入email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="compass">
                        <el-input type="password" v-model="registerUser.compass" placeholder="请输入确认密码"></el-input>
                    </el-form-item>
                    <el-form-item label="选择身份">
                        <el-select v-model="registerUser.identity" placeholder="请选择身份">
                            <el-option label="管理员" value="manager"></el-option>
                            <el-option label="员工" value="employee"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="submit_btn" @click="submitForm">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'register',
        data(){
            var passwordJudge = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerUser.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                registerUser:{
                    name:'',
                    email:'',
                    password:'',
                    compass:'',
                    identity:''
                },
                registerRules: {
                    name: [
                        { required: true, message: '请输入用户名',trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    compass: [
                        { validator: passwordJudge, trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            submitForm(){
                this.$refs["registerRef"].validate((valid) => {
                    if (valid) {
                        this.$axios.post("/api/users/register",this.registerUser)
                                    .then(res =>{
                                        this.$message({
                                            message:'注册成功',
                                            type:"success"
                                        })
                                    })
                        this.$router.push('/login');
                    } else {
                        this.$message({
                            message:'请填写表单',
                            type:"error"
                        })
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .register {
        position: relative;
        width: 100%;
        height: 100%;
        background: url("../assets/bg.jpg") no-repeat center center;
        background-size: 100% 100%;
    }

    .form_container {
        width: 370px;
        height: 210px;
        position: absolute;
        top: 10%;
        left: 34%;
        padding: 25px;
        border-radius: 5px;
        text-align: center;
    }

    .form_container .manage_tip .title {
        font-family: "Microsoft YaHei";
        font-weight: bold;
        font-size: 26px;
        color: #fff;
    }

    .registerForm {
        margin-top: 20px;
        background-color: #fff;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        box-shadow: 0px 5px 10px #cccc;
    }

    .submit_btn {
        width: 100%;
    }

    .el-button{
        margin-left: -45px;
    }
</style>