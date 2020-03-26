<!--
 * @Author: your name
 * @Date: 2020-02-15 17:25:25
 * @LastEditTime: 2020-03-12 19:20:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \news-manage\src\components\register.vue
 -->
<template>
    <div id="register">
        <div id="register_box">
            <el-row id="" :style="{width:'1000px',height:'450px',margin:'100px 0 0 210px '}">
                <el-card :body-style="{ padding: '0px' ,height:'400px',}">
                <img src="../assets/img/register.png"  class="image">
                <div :style="{float:'left',width:'480px',height:'500px'}">
                    <br>
                    <br>
                    <br>
                    <br>
                    <span id="title">想看新闻网</span>
                    <br>
                    <span :style="{fontSize:'13px',color:'#909399',margin:'0 0 0 300px'}">——————信息创造价值</span>
                    <br>
                    <br>
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="mobile">
                        <el-input type="text" v-model="ruleForm.mobile" autocomplete="off" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"  @click="submitForm('ruleForm')">注册</el-button>
                    </el-form-item>
                    </el-form>
                    <div id="tiaokuan">
                        <p>注册即表示你同意 <span class="xieyi">用户协议</span > 和<span class="xieyi">隐私条款</span> </p>
                    </div>
                    
                </div>
                </el-card>
            </el-row>
            
        </div>
        
    </div>
</template>
<script>
import qs from 'qs';
export default {
    data(){
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validateMobile = (rule,value,callback)=>{
          const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/ 
           if (regMobile.test(value)){
               callback();
           }
            callback(new Error('手机号码不正确'));
      }
       return {
        ruleForm: {
            pass: '',
            mobile:'',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          mobile:[
              {validator:validateMobile,trigger:'blur'}
          ]
        },

      };
    },
     methods: {
        submitForm(formName) {
          
          
        this.$refs[formName].validate((valid) => {
          if (valid) {
              //跳转首页
            var data = {};
            data.account = this.ruleForm.mobile;
            data.password = this.ruleForm.pass;
            data = qs.stringify(data); 
            this.axios.post('http://127.0.0.1:8080/user/register',data).then((res)=>{
                 
                console.log(res.data.code);
                if(res.data.code == 1){
                this.$alert(res.data.msg, '提示', {
                    dangerouslyUseHTMLString: true }); 
                  this.$router.push({path: '/login'});
                }else{
                  this.$alert(res.data.msg, '提示', {
                    dangerouslyUseHTMLString: true }); 
                }
              })
            
          } 
        });
      },
      }
}
</script>

<style >
    #register{
        width: 100vw;
        height: 100vh;
        background-color: #409EFF;
    }
   #register_box{
        float: left;
    }
    #title{
         font-family:PingFang SC;
         font-size: 25px;
         margin-left: 250px;

    }  

  .image {
    width: 350px;
    height: 450px;
    display: block;
    margin-left: 60px;
    float: left;
  }
    .el-input{
        width: 275px;
       
    }
    .el-form{
        margin-left: 100px;
        margin-bottom: -13px;

    }
    .xieyi{
        color: #409EFF;
    }
    #tiaokuan{
        margin-top: 110px;
        margin-left: 190px;
        font-size: 13px;
    }
   .el-button{
        width: 275px;
        /* border-radius: 30px */
    }
</style>