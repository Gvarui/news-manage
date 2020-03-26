<!--
 * @Author: your name
 * @Date: 2020-02-19 18:59:00
 * @LastEditTime: 2020-03-24 18:44:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \news-manage\src\components\content.vue
 -->
<template>
    <div class="content">
        <div  class="news_item">
            <div class="item" :key="tnew.tnewId" v-for="tnew in list">
                <img :src="tnew.tnewImgUrl" alt="这是一张图片" class="news_pic"> <!--  alt：用户无法显示图片或者用户禁用图像时替代的文本内容 -->
                <div class="text"  @click="handleContent(tnew.tnewId)"><router-link to="/re_detail"><span class="text_title">{{tnew.tnewTitle}}</span></router-link></div>
                <br>
                <br>
                <br>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;发布时间：{{tnew.publishTime}}&nbsp;&nbsp;|&nbsp;&nbsp;点击次数{{tnew.click}}</span>
            </div>

        </div>

    </div>
</template>
<script>
import qs from 'qs';
import Bus from '../../bus.js';
export default {
    name:'news_recommand',
    data(){
      return{
          list:[{
            tnewId:'',
            tnewTitle:'',
            publishTime:'',
            click:'',
            tnewImgUrl:'',
          }],
        
          show:true,
      }
    },
    methods:{
    handleContent(id){
        //这里的this指的是直接调用者VueComponent
        Bus.$emit('get-content',id);
        this.axios.get('http://127.0.0.1:8080/news/one',{
            params:{
                tnewId:id
            }
        }).then((res)=>{

        });
        
    }
    },
    created(){
        
        this.axios.get('http://127.0.0.1:8080/new/findSomeNews',{
            params:{
                typeId:1,
                start:0,
                number:7
            }
        }).then(res=>{
            if(res.data.code == 1){
                this.list = res.data.data;
                //打印获取到的新闻数据
                //console.log(this.list);
            }

        });
    },
}
</script>
<style>

   .news_item{
       height:1000px;
       width:725px;
       
   }
   .item{
       border: #DCDFE6 solid 1px;
       height:180px;
       width:100%;
       float: left;
       box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
       margin-bottom: 10px;
   } 
   .news_pic{
    margin-top: 30px;
    margin-left: 30px;
    float: left;
    margin-right: 15px;
   }
   .text_title{
       color: black;
       font-size: 22px;
       font-family: PingFang SC;
      font-weight: bold;   /* 字体加粗 */
   }
   .text{
       margin-top: 15px;
   }
   a {
    text-decoration: none;
   }
   .router-link-active {
    text-decoration: none;
   }
</style>