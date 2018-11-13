/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-07-28 21:02:21 
 * @Description: 顶部导航
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-11-13 09:46:29
 */

<style lang="scss" scoped>
  .top-layout {
    width: 100%;
    height: 40px;
    background: -webkit-linear-gradient(90deg,#1faabd,#31d69c);
    background: -o-linear-gradient(90deg,#1faabd,#31d69c);
    background: -moz-linear-gradient(90deg,#1faabd,#31d69c);
    background: linear-gradient(90deg,#1faabd,#31d69c);
    padding-left: 10px;
    float: left;
    position: fixed;
    z-index: 1;
    .logo {
      background: url('./images/logo.png') no-repeat;
      background-size: 100% 100%;
      width: 122px;
      height: 22px;
      margin-top: 8px;
      float: left;
    }
    .menus {
      float: left;
      margin-left: 20px;
      font-size: 14px;
      a {
        line-height: 20px;
        padding: 0 30px;
        margin: 10px 0;
        display: block;
        border-right: 1px solid #fff;
        color: #fff;
        float: left;
        &:last-child {
          border: none;
        }
      }
    }
  }
</style>


<template>
  <div class="top-layout">
    <div class="logo"></div>
    <div class="menus">
      <a>首页</a>
      <a>组件库</a>
      <a>文档页</a>
    </div>
  </div>
</template>
