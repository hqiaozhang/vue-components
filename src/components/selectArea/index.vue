/*
 * @Author: zhanghongqiao 
 * @Date: 2018-11-02 17:08:04 
 * @Email: 991034150@qq.com 
 * @Description: 地区列表
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-11-13 09:23:03
 */

<template>

  <div class="area-contain" v-clickoutside="handleClose">
     <div class="area-top show-area">
        <div class="area-province area-top-item" @click="selectArea(1)">{{CheckArea.province}}</div>
        <div class="area-city area-top-item" @click="selectArea(2)">{{CheckArea.city}}</div>
        <div class="area-district area-top-item" @click="selectArea(3)">{{CheckArea.district}}</div>
        <div class="area-district area-top-item" @click="selectArea(4)">{{CheckArea.county}}</div>
        <div class="area-district area-top-item" @click="selectArea(5)">{{CheckArea.floor}}</div>
      </div>
      <section class="area-main" v-show="isShow">
        <div class="area-top area-top2">
          <div class="area-province area-top-item" :class="{area_top_active: 1==areaStatus}" @click="selectArea(1)">省份</div>
          <div class="area-city area-top-item" :class="{area_top_active: 2==areaStatus}" @click="selectArea(2)">城市</div>
          <div class="area-district area-top-item" :class="{area_top_active: 3==areaStatus}" @click="selectArea(3)">区/县名</div>
          <div class="area-district area-top-item" :class="{area_top_active: 4==areaStatus}" @click="selectArea(4)">街道</div>
           <div class="area-district area-top-item" :class="{area_top_active: 5==areaStatus}" @click="selectArea(5)">楼宇</div>
        </div>
        <div class="area-content ">
          <!-- 省份 -->
        <ul class="area-data" :class="{none: 1!=areaStatus}">
            <li class="area-data-item" 
              v-for="(item) in sourceData['0']" 
              :key="item.id"
              @click="checkProvOne(item.id, item.address)" :class="{red: item.id==checkProvince}">
            <span class="area-text">{{item.address}}</span>
            </li>
        </ul>
        <!-- 城市 -->
        <ul class="area-data" :class="{none: 2!=areaStatus}" v-if="sourceData[checkProvince]">
            <li class="area-data-item" 
              v-for="(val, key, index) in sourceData[checkProvince]" 
              :key="index"
              @click="checkCityOne(key, val)" :class="{red: key==checkCity}">
            <span class="area-text">{{val}}</span>
            </li>
        </ul>
        <!-- 区/县 -->
        <ul class="area-data" :class="{none: 3!=areaStatus}" 
          v-if="sourceData[checkProvince]">
            <li class="area-data-item" 
              v-for="(val, key, index) in sourceData[checkCity]"
              :key="index"
              @click="checkDistrictOne(key,val)" :class="{red: key==checkDistrict}">
            <span class="area-text">{{val}}</span>
            </li>
        </ul>
        <!-- 街道 -->
         <ul class="area-data county" :class="{none: 4!=areaStatus}" 
            v-if="sourceData[checkProvince]">
            <li class="area-data-item" 
              v-for="(val, key, index) in sourceData[checkDistrict]"
              :key="index"
              @click="checkCountyOne(key, val)" :class="{red: key==checkCounty}">
            <span class="area-text">{{val}}</span>
            </li>
        </ul>
        <!-- 楼宇 -->
         <ul class="area-data floor" :class="{none: 5!=areaStatus}" 
            v-if="sourceData[checkProvince]">
            <li class="area-data-item" 
              v-for="(val, key, index) in sourceData[checkCounty]"
              :key="index"
              @click="checkFloorOne(key, val)" :class="{red: key==checkFloor}">
            <span class="area-text">{{val}}</span>
            </li>
        </ul>
        </div>
       
    </section>
  </div>
  
</template>

<script src="./index.js"></script>
 

