<!--
 * @Author: your name
 * @Date: 2020-02-15 21:00:20
 * @LastEditTime: 2020-03-25 20:43:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \news-manage\src\components\home.vue
 -->
<template>
  <div>
    <!-- 顶部导航栏 -->
    <div id="top" >
      <el-menu  class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="transparent" text-color="#fff" active-text-color="#FFFFFF">
      <el-menu-item index="1">反馈</el-menu-item>
      <el-menu-item index="2"  @click="personal(true)">个人中心</el-menu-item>
      <el-menu-item index="3" @click='logout()'><router-link to="/login">注销</router-link></el-menu-item>
      </el-menu>
    </div> 
    <!-- 内容区域 -->
    <div id="main">
      <!-- 左边导航 -->
      <el-drawer :before-close="handleClose" :visible.sync="dialog" direction="ltr" custom-class="demo-drawer"  ref="drawer">
  <div class="demo-drawer__content">
    <div :style="{marginLeft:'150px'}"><h2><strong>个人信息</strong></h2></div>
    
    <el-form :model="form">
      <el-form-item label="用户昵称" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="账号" :label-width="formLabelWidth">
        <el-input v-model="form.userId" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="头像" :style="{marginLeft:'15px'}" >
        <div :style="{height:'100px',marginBottom:'20px'}">
          <el-avatar :src="form.imgUrl" :style="{height:'100px',width:'100px'}"></el-avatar>
        </div>
        <el-button :style="{marginLeft:'10px'}">选择文件</el-button><span>{{imgName}}</span>
        <el-button type="primary" :style="{marginLeft:'15px'}">上传</el-button>
      </el-form-item>     
    </el-form>
    <div class="demo-drawer__footer" id="drawer_footer">
      <el-button @click="cancelForm" :style="{width:'180px',marginLeft:'30px'}">取 消</el-button>
      <el-button :style="{width:'180px',marginLeft:'30px'}" type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
    </div>
  </div>
</el-drawer>
      <div class="mainLeft">
        <div id="title_picture">
          <img src="src\assets\img\title.png" alt="">
        </div>
        <div class="tab_list">
          <ul>
          <li data-name="news_recommand" class="current">推荐</li>
          <li data-name="news_hot">热点</li>
          <li data-name="news_star">明星</li>
          <li data-name="news_tech">科技</li>
          <li data-name="news_game">游戏</li>
          <li data-name="news_sport">体育</li>
          <li data-name="news_finance">财经</li>  
        </ul>
        </div>
        
      </div>
      <div class="mainLeftFix">
        <div id="title">
          <p id="main_title">想看新闻</p>
        </div>
        <div class="tab_list">
          <ul >
            <li @click="getContent($event)" data-name="news_recommand" data-index='0' class="current list">推荐</li>
            <li @click="getContent($event)" data-name="news_hot" data-index='1' class="list">热点</li>
            <li @click="getContent($event)" data-name="news_star" data-index='2' class="list">明星</li>
            <li @click="getContent($event)" data-name="news_tech" data-index='3' class="list">科技</li>
            <li @click="getContent($event)" data-name="news_game" data-index='4' class="list">游戏</li>
            <li @click="getContent($event)" data-name="news_sport" data-index='5' class="list">体育</li>
            <li @click="getContent($event)" data-name="news_finance" data-index='6' class="list">财经</li>  
          </ul>
        </div>    
      </div>
      <!-- 中间内容 -->
      <div class="mainContent">
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <!-- 右边内容 -->
    <div class="mainRight">
      <div class="contentRight">
        <el-input placeholder="请输入内容" v-model="input" class="search" >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <div id="main_login">
          <el-col :span="8">
            <el-card shadow="always">
              <p>登录后可以保存您的浏览喜好、评论、收藏，还可以修改个人信息</p>
              <router-link to="/login"><el-button type="primary" class="login_btn">登录</el-button></router-link>
            </el-card>
          </el-col>
          <el-col :span="8" >
            <el-card shadow="always" class="level_card" >
            <span :style="{color:'#F56C6C',fontSize:'20px'}">24小时热闻榜</span>
            <ul>
              <li class="level"><span id="level_first">1 </span>肖战ins头像</li><hr>  
              <li class="level"><span id="level_second">2 </span>肖战ins头像</li><hr> 
              <li class="level"><span id="level_third">3 </span>肖战ins头像</li><hr>
              <li class="level"><span id="level_more">4 </span>肖战ins头像</li><hr>
              <li class="level"><span id="level_more">5 </span>肖战ins头像</li><hr>
              <li class="level"><span id="level_more">6 </span>肖战ins头像</li><hr>
              <li class="level"><span id="level_more">7 </span>肖战ins头像</li><hr>
              <li class="level"><span id="level_more">8 </span>肖战ins头像</li><hr>
              <li class="level"><span id="level_more">9 </span>肖战ins头像</li><hr>
              <li class="level"><span id="level_more">10</span>肖战ins头像</li><hr>
            </ul>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="always" id="pic_card">
              <span :style="{color:'	#000000',fontSize:'20px'}">精彩图片</span>
              <div>
                <div class="pic_box" >
                  <img src="..\assets\img\news01.jpg" class="img_card">
                  <p class="pic_title">抗“疫”加油</p>
                </div>
                <div class="pic_box" :style="{marginLeft:'28px'}">
                  <img src="..\assets\img\news01.jpg" class="img_card">
                  <p class="pic_title">抗“疫”加油</p>
                </div>
              </div>
              <div>
                <div class="pic_box" >
                  <img src="..\assets\img\news01.jpg" class="img_card">
                  <p class="pic_title">抗“疫”加油</p>
                </div>
                <div class="pic_box" :style="{marginLeft:'28px'}">
                  <img src="..\assets\img\news01.jpg" class="img_card">
                  <p class="pic_title">抗“疫”加油</p>
                </div>
              </div>
              <div>
                <div class="pic_box" >
                  <img src="..\assets\img\news01.jpg" class="img_card">
                  <p class="pic_title">抗“疫”加油</p>
                </div>
                <div class="pic_box" :style="{marginLeft:'28px'}">
                  <img src="..\assets\img\news01.jpg" class="img_card">
                  <p class="pic_title">抗“疫”加油</p>
                </div>
              </div>
              <div>
                <div class="pic_box" >
                  <img src="..\assets\img\news01.jpg" class="img_card">
                  <p class="pic_title">抗“疫”加油</p>
                </div>
                <div class="pic_box" :style="{marginLeft:'28px'}">
                  <img src="..\assets\img\news01.jpg" class="img_card">
                  <p class="pic_title">抗“疫”加油</p>
                </div>
              </div>
            </el-card>
          </el-col>
        </div>
      </div>
      <!-- 这里边可以写一个路由然后根据上边左边的导航栏点击跳转路由，这样中间的内容就会跟这个变了 自己可以写了么还有一个地方 啥地方 //右边内容也根据路由来判断 -->
        
    </div>
    <div class="clear"></div>
  </div>
   
</template>
<script>
import news_recommandVue from './content/news_recommand.vue';
import Bus from '../bus.js'
  export default {
     data() {
      return {
        input:'',
        dialog: false,
        loading: false,
        imgName:'',
        userId:'',
        form: {
        username: '',
        userId:'',
        password:'',
        imgUrl:''
      },
      formLabelWidth: '80px',
      timer: null,
           
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      show(){
          
      },
      handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true;
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
          }, 2000);
        })
        .catch(_ => {});
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
      getContent(e){
        //先拿到name和index
        var name = e.currentTarget.dataset.name;
        var index = e.currentTarget.dataset.index;
        //拿到所有的标签li
        var lis = document.querySelectorAll('.list');
        //先循环设置默认样式
        for(var i = 0; i < lis.length; i++){
          lis[i].className = 'list';
        }
        //给当前点击的li添加变蓝样式
        lis[index].className = 'current list'; 
        if(name == 'news_recommand') this.$router.push({path:'/'})
        else this.$router.push({path:'/content/'+name})
        
      },
      logout(){
        window.sessionStorage.removeItem("userData")

        },
      personal(dialog){
        //表示没有登录
        var data = {};
        data = JSON.parse(window.sessionStorage.getItem('userData'));
        if(data == null){
          this.$message.error('您还未登录，不能打开个人中心，请先登录');
        }else{
          //获取登录信息
          console.log(data.data);
          
          this.dialog = dialog;
          this.form.username = data.data.userName;
          this.form.userId = data.data.account;
          this.form.password = data.data.password;
          this.form.imgUrl = data.data.imageUrl;
        }
      }
      },
      created(){
        
        console.log(9999999)
        //获取24小时排行榜
        var id = 1;
        this.axios.get('http://127.0.0.1:8080/news/index').then((res)=>{
          console.log(res.data);
          
        })
      }
  }
</script>
<style scoped>
  

  #top{
    background-color: #409EFF;
    width: 100%;
  }
  .el-menu{
    margin-left: 1150px;
  }
  #main{
    width: 1200px;
    margin:auto;
    margin-top:20px;
    position:relative;
  }
  .mainLeft{
    width:120px;
    float:left;
    opacity: 0;
  }
  .mainLeftFix{
    margin-left: -65px;
    position: fixed;
  }
  .clear{
    clear: both;
  }
  .mainContent{
    float:left;
    width:780px;
  }
  .mainRight{
    width:300px;
    height:100%;
    float:left;
  }
  .content{
    height:780px;
    width:780px;
  }
  .contentRight{
    width:300px;
    height:300px;
  }
  .tab_list li {
    height: 39px;
    width: 60px;
    line-height: 39px;
    padding: 0 20px;
    text-align: center;
    cursor: pointer;
    list-style: none;
    margin:10px 0px 20px 10px;
    border-radius: 4px;
}
  #main_title{
     font-family:PingFang SC;
     font-size:30px;
     color: #409EFF;
     margin-top: 10px;
     margin-top: -2px;
     margin-left: 39px;
     margin-bottom: auto;
  }
  .current{
    background-color: #409EFF;
  }
  .search{
    width: 225px;
    margin-left: -20px;
  }
  .el-col{
    width: 100%;
  }
  .el-card{
    height: 185px;
    margin-top: 20px;
    margin-left: -20px;
    width: 317px;
    color: #909399;
    font-size: 13px;
  }
  .level_card{
    height: 400px;
  }
  .login_btn{
    width: 100%;
    margin-top: 15px;
  }
  .level{
    list-style: none;
    margin-left: -35px;
    color: #606266;
    margin-bottom: 5px;
  }
  #level_first{
    background-color: red;
    color:white;
    padding-left: 4px;
    padding-right: 1px;
    margin-right: 6px;
    
    
  }
  #level_second{
    background-color:#FF8C00;
    color:white;
    padding-left: 4px;
    padding-right: 1px;
    margin-right: 6px;
  }
  #level_third{
    background-color:#FFA500;
    color:white;
    padding-left: 4px;
    padding-right: 1px;
    margin-right: 6px;
  }
  #level_more{
    background-color:#409EFF;
    color:white;
    padding-left: 4px;
    padding-right: 1px;
    margin-right: 6px;
  }
  hr{
    margin-left: -35px;
    background-color: #F2F6FC;
    border-color: #F2F6FC;
    opacity: 0.2;

  }
  #pic_card{
    float: left;
    margin-top: 20px;
    height: 700px;
    
  }
  .pic_box{
    width: 120px;
    margin-top: 20px;
    float: left;
  }
  .img_card{
    height: 100px;
    width: 130px;
  }
  .pic_title{
    margin-top: 0px;
    color: #606266;
  }
  #drawer_footer{
    margin-top: 200px;
  }
</style>