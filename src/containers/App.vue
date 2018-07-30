/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-06-10 18:27:03 
 * @Description: 应用程序模板入口
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-07-28 22:01:53
 */

 <style lang="scss" scoped>
  .main-container {
    position: relative;
   
    width: calc(100% - 120px);
    float: left;
  }
 </style>
 

<template>
  <div id="app">
      <TopMenus />
      <LeftMenus />
      <!-- 路由出口 路由匹配到的组件将渲染在这里 -->
      <div class="main-container clearfix">
        <router-view/>
      </div>
  </div>

</template>

<script>
  import TopMenus from '@/components/common/topMenus/index.vue'
  import LeftMenus from '@/components/common/leftMenus/index.vue'
  export default {
    components: {
      TopMenus,
      LeftMenus
    }
  }
</script>

 

 


 
