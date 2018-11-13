/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-07-28 21:21:32 
 * @Description: 左边导航
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-11-13 09:48:07
 */

 <style lang="scss" scoped>
 .left-menus {
   width: 120px;
   height: 100%;
   height: calc(100% - 40px);
   padding-top: 10px;
   background: #1faabd;
   float: left;
   position: fixed;
   top: 40px;
   a {
     width: 100%;
     line-height: 40px;
     display: block;
     font-size: 14px;
     color: #fff;
     padding-left: 15px;
     &.active,
     &:hover {
       background: rgb(37, 185, 177);
       cursor: pointer;
     }
   }
 }
 </style>

<template>
  <div class="left-menus">
    <a v-for="(item, index) in menus" :key="index" 
      @click="clickMenus(index)"
      :class="{active: active === index}">
        <i class="iconfont" :class="item.icon"></i>
        {{item.name}}
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          name: '图表组件',
          icon: 'icon-charts',
          path: ''
        }, {
          name: '表单组件',
          icon: 'icon-form',
          path: ''
        }, {
          name: '地图组件',
          icon: 'icon-map',
          path: ''
        },
        {
          name: '其他组件',
          icon: 'icon-form',
          path: ''
        }
      ],
      active: 0,
    }
  },
  methods: {
    clickMenus(index) {
      this.active = index
    }
  }
}
</script>

