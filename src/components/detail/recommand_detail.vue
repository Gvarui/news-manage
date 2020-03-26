<!--
 * @Author: your name
 * @Date: 2020-03-05 21:20:29
 * @LastEditTime: 2020-03-24 21:45:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \news-manage\src\components\detail\recommand_detail.vue
 -->
<template>
    <div>
    <!-- 顶部导航栏 -->
        <div id="top" >
            <el-menu  class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="transparent" text-color="#fff" active-text-color="#FFFFFF">
            <el-menu-item index="1">反馈</el-menu-item>
            <el-menu-item index="2">投诉侵权</el-menu-item>
            <el-menu-item index="3"  @click='logout()'><router-link to="/login">注销</router-link></el-menu-item>
            </el-menu> 
        </div> 
        <!-- 内容区域 -->
        <div id="text_main">
            <div><strong><h2>{{news_title}}</h2></strong></div>
            <img :src="news_img" alt="">
            <div v-html="content"  ></div>
        </div>
        <div id="footer">
            <hr id="line">
            <div id="comment">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                <el-input id="message_text" type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
                <el-button type="primary" id="sub_msg" @click="getMsg()">评论</el-button>
                <hr class="foot_line">
            </div>
            <div class="userComment" v-for="(item, index) in contentList" :key="index">
                <div id="content_left" >
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    <div>{{item.userName}}</div>
                </div>
                
                <div id="content_right">{{item.descript}}</div>  
                <hr class="foot_line">
            </div>

        </div>
    </div>
</template>
<script>
import Bus from '../../bus.js';
import qs from 'qs';
export default {
    data(){
        return{
            textarea: '',
            content:'',
            contentList:[
                
            ],
            //接收文章得标题和图片
            news_title:'',
            news_img : '',
            //接收登录用户名得id和用户名
            userData:{
              name:"",
              userId:''
            },
            //接收文章得id
            newsId:'',
        }
    },
    methods:{
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      //注销操作
      logout(){
        window.sessionStorage.removeItem("userData");
        },
      getMsg(){
          //评论前先判断是否登录
          var itemLogin = {};
          //json数据转js对象:  JSON.parse();
          itemLogin = JSON.parse(window.sessionStorage.getItem("userData"));
          //如果登录
          if(itemLogin != null){
            this.userData.name = itemLogin.userName;
            //点击得时候获得input得值
            var item = {};
            var content = this.textarea;
            var list = this.contentList;
            item.descript = content;
            item.userName = this.userData.name;
            var data = {};
            //newsId已传过来
            data.tnewId = this.newsId;
            data.userId = itemLogin.userId;
            data.descript = content;
            //data里面传得值也是正确的 
            //console.log(data);
            //下面这句话到到底是什么意思？
            data = qs.stringify(data);
            list.unshift(item);
            this.contentList = list;
            console.log(this.contentList);
            
            this.textarea = '';
            this.axios.post('http://127.0.0.1:8080/message/addOne',data).then((res)=>{
                console.log(res.data);
                
            });

          }else{
                  this.$alert('<strong>您还未登录，不能留言，请先登录</strong><br><br>', '提示', {
                    dangerouslyUseHTMLString: true
                    
                  });
                  //延迟2s自动跳转到登录页面
                  setTimeout(()=>{
                    this.$router.push({path:'/login'});
                  },2000);
                  
                }
   
      },
    },
    created(){
        
        Bus.$on('get-content',(val)=>{
            //获取到点击的新闻id，根据id，去数据库中把内容载下来
            //console.log(val);
            //接收文章得id
            this.newsId = val ;
            this.axios.get('http://127.0.0.1:8080/new/findOne',{
                params:{
                    tnewId:val,
                }
            }).then((res)=>{
                this.content = res.data.data.content;
                this.news_title = res.data.data.tnewTitle;
                this.news_img = res.data.data.tnewImgUrl;
                //console.log(res.data);
                
            });
            this.axios.get('http://127.0.0.1:8080/message/findByTnewId',{
                params:{
                    tnewId:val,
                } 
            }).then((res)=>{
                //获取留言内容
                this.contentList = res.data;
                
            })
            
        });

    },

}
</script>
<style >
    #top{
    background-color: #409EFF;
    width: 100%;
    }
    .el-menu{
    margin-left: 1150px;
    }
    #text_main{
        
        width: 920px;
        margin-left: 250px;
    } 
    #line{
        width: 920px;
        margin-left: 250px;
        background-color: #F2F6FC;
        border-color: #F2F6FC;
        opacity: 0.3;
    }
    #comment{
        width: 920px;
        margin-left: 350px;
    }
    .userComment{
        width: 920px;
        margin-left: 350px;
    }
    #message_text{
        width: 550px;
        float: left;
    }
    .el-textarea{
        width: 550px;
    }
    #sub_msg{
        margin-left: 525px;
        margin-top: 10px;
        height: 35px;
    }
    .foot_line{
        margin-left: 0px;
        width: 600px;
        background-color: #F2F6FC;
        border-color: #F2F6FC;
        opacity: 0.3;
    }
    h2{
        margin-left: 180px;
    }
    #content_left{
        width: 10%;
        float: left;
    }
    #content_right{
        width: 80%;
        float: left;
        height: 85px;
    }
</style>