<!--
 * @Author: your name
 * @Date: 2020-02-13 16:54:55
 * @LastEditTime: 2020-03-24 21:42:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \news-manage\src\components\login.vue
 -->
<template>
    <div id="login">
        <p id="logo">  想 看 新 闻</p>
        <div id="login_box">
            <el-row id="" :style="{width:'1000px',height:'450px',margin:'100px 0 0 210px '}">
                <el-card :body-style="{ padding: '0px' ,height:'400px',}">
                <img src="../assets/img/bg.png"  class="image">
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
                        <el-button type="primary" id="denglu" @click="submitForm('ruleForm')">登录</el-button>
                    </el-form-item>
                    </el-form>
                    <router-link to="/register"><span id="register_btn">还没有注册？点击这里</span></router-link>
                    <div id="tiaokuan">
                        <p>登录即表示你同意 <span class="xieyi">用户协议</span > 和<span class="xieyi">隐私条款</span> </p>
                    </div>
                    
                </div>
                </el-card>
            </el-row>
            
        </div>
   
    </div>
</template>
<script>
import qs from 'qs';
import Bus from '../bus.js'
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
          //console.log(this.axios)
          this.$refs[formName].validate((valid) => {
            if (valid) {
              //请求开始
              var data = {};
              data.account = this.ruleForm.mobile;
              data.password = this.ruleForm.pass;
              data = qs.stringify(data);
              this.axios.post('http://127.0.0.1:8080/userLogin',data).then((res)=>{
                //判断是否登录成功，如果成功，存用户名
                if(res.data.code == 1){
                  //传递登录状态码和登录用户名
                 // Bus.$emit('get-code',res.data.code,res.data.userName); 
                //  var userData = {
                //    userId:res.data.data.userId,
                //    username:res.data.data.userName
                //  };
                 //console.log(userData);
                 //将用户名和状态码存进去
                 //js对象转json数据:  JOSN.stringify();
                  window.sessionStorage.setItem("userData",JSON.stringify(res.data));
                  this.$router.push({path: '/'});
                }else{
                  this.$alert('<strong>用户名和密码不正确，请重新登录</strong><br><br>', '提示', {
                    dangerouslyUseHTMLString: true
                  });
                }
              })
              //结束
            } else {
                //用户名和密码不正确，请重新登录
              this.$alert('<strong>用户名和密码不正确，请重新登录</strong><br><br>', '提示', {
                dangerouslyUseHTMLString: true
              });
              return false;
            }
          });
        },
      }
}   

</script>
<style scoped>
  #login{
    background-color:#409EFF;
    width:100vw;
    height:100vh;
    margin-top: -27px;
    margin-left: -8px;
  }
  #login_box{
    float: left;
    margin-top: -50px;
    margin-left: 25px;
  }
  #logo{
  font-family:PingFang SC;
  font-size:25px;
  color:#ffffff;
  margin-left: 20px;
  padding-top: 20px;
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
    /* .el-input__inner{
         border-radius: 30px;
    } */
    .el-form{
        margin-left: 100px;
        margin-bottom: -13px;

    }
    .el-button{
        width: 80px;
        /* border-radius: 30px */
    }
    #register_btn{
        margin-left: 335px;
        color:#909399;
        font-size: 12px;
        
    }
    .xieyi{
        color: #409EFF;
    }
    #tiaokuan{
        margin-top: 110px;
        margin-left: 190px;
        font-size: 13px;
    }
a {
  text-decoration: none;
}
 
.router-link-active {
  text-decoration: none;
}
#denglu{
    width: 275px;
}
</style>