/*
 * @Author: zhanghongqiao 
 * @Date: 2018-11-09 14:41:53 
 * @Email: 991034150@qq.com 
 * @Description: 地区及楼层切换
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-11-13 09:31:36
 */

import { clickoutside, setCookie } from '@/util/util'
import { fetch } from "@/util/request";
import $ from 'jquery'
import "./index.scss";
export default {
  name: "area-select",
  data() {
    return {
      areaStatus: 1,
      checkProvince: '',
      checkCity: '',
      checkDistrict: '',
      checkCounty: '',
      checkFloor: '',
      isShow: false,
      CheckArea: {
        province: "省份",
        city: "城市",
        district: "区/县",
        county: "路/街道",
        floor: "楼宇"
      }
    };
  },
  directives: {
    clickoutside
  },
  props: ["sourceData", "defaultArea"],
 
  mounted() {
    this.setDefault()
    window.addEventListener('resize', () => {
      this.setPositon()
    })
  },
  methods: {
    /**
     * 设置默认值
     */
    setDefault() {
      if(_.isEmpty(this.defaultArea)) {
        return
      }
      this.CheckArea = {
        province: this.defaultArea.proName,
        city: this.defaultArea.cityName,
        district: this.defaultArea.disName,
        county: this.defaultArea.address,
        floor: this.defaultArea.build
      };
      this.checkProvince = this.defaultArea.pro;
      this.checkCity = this.defaultArea.city;
      this.checkDistrict = this.defaultArea.dis;
      this.checkCounty = this.defaultArea.addressId
      this.checkFloor = this.defaultArea.moId;
      this.setPositon()
    },
    handleClose() {
      this.isShow = false;
    },
    selectArea(it) {
      // 高亮 省 市 区，街道，楼于 其中一个
      this.areaStatus = it;
      this.isShow = true;
    },
    
    /**
     * 选择省份
     * @param {string} id 省id 
     * @param {string} name 省名称
     */
    checkProvOne(id, name) {
      // 省份
      this.checkProvince = id;
      this.CheckArea.province = name;
      // 城市
      let cityKey = Object.keys(this.sourceData[this.checkProvince]);
      let city = Object.values(this.sourceData[this.checkProvince])[0];
      this.checkCity = cityKey;
      this.CheckArea.city = city;
      // 区/县名
      let disKey = Object.keys(this.sourceData[cityKey])[0];
      let district = Object.values(this.sourceData[cityKey])[0];
      this.CheckArea.district = district;
      this.checkDistrict = disKey;
      // 街道
      let countyKey = Object.keys(this.sourceData[disKey])[0];
      let county = Object.values(this.sourceData[disKey])[0];
      this.CheckArea.county = county;
      this.checkCounty = countyKey;
      // 楼宇
      let floorKey = Object.keys(this.sourceData[countyKey])[0];
      let floor = Object.values(this.sourceData[countyKey])[0];
      this.CheckArea.floor = floor;
      this.checkFloor = floorKey;
      // 打开第二个（城市）tab
      this.areaStatus = 2;
    },
    // 选择城市
    checkCityOne(id, name) {
      // 城市
      this.checkCity = id;
      this.CheckArea.city = name;
      // 区/县名
      let disKey = Object.keys(this.sourceData[this.checkCity])[0];
      let district = Object.values(this.sourceData[this.checkCity])[0];
      this.CheckArea.district = district;
      this.checkDistrict = disKey;
      // 街道
      let countyKey = Object.keys(this.sourceData[disKey])[0];
      let county = Object.values(this.sourceData[disKey])[0];
      this.CheckArea.county = county;
      this.checkCounty = countyKey;
      // 楼宇
      let floorKey = Object.keys(this.sourceData[countyKey])[0];
      let floor = Object.values(this.sourceData[countyKey])[0];
      this.CheckArea.floor = floor;
      this.checkFloor = floorKey;
      // 打开第三个（区/县名）tab
      this.areaStatus = 3;
    },
    // 选择区/县名
    checkDistrictOne(id, name) {
      // 区/县名
      this.checkDistrict = id;
      this.CheckArea.district = name;
      // 街道
      let countyKey = Object.keys(this.sourceData[this.checkDistrict])[0];
      let county = Object.values(this.sourceData[this.checkDistrict])[0];
      this.CheckArea.county = county;
      this.checkCounty = countyKey;
      // 楼宇
      let floorKey = Object.keys(this.sourceData[countyKey])[0];
      let floor = Object.values(this.sourceData[countyKey])[0];
      this.CheckArea.floor = floor;
      this.checkFloor = floorKey;
      // 打开第四个tab(街道)
      this.areaStatus = 4;
    },
    // 选择街道
    checkCountyOne(id, name) {
      // 街道
      this.checkCounty = id;
      this.CheckArea.county = name;
      // 楼宇
      let floorKey = Object.keys(this.sourceData[this.checkCounty])[0];
      let floor = Object.values(this.sourceData[this.checkCounty])[0];
      this.CheckArea.floor = floor;
      this.checkFloor = floorKey;
      // 打开第五个tab(街道)
      this.areaStatus = 5;
    },
    // 选择街道
    checkFloorOne(it, name) {
      this.isShow = false;
      this.checkFloor = it;
      this.CheckArea.floor = name;
    },
     /**设置宽度 */
     setPositon() {
      let w = $(".five-days-wather").width();
      $(".area-contain").css("width", w + 'px');
    }
  },
  watch: {
    defaultArea: 'setDefault',
    checkDistrict: function() {
      // 更新domainId(项目中使用)
      // if(this.checkDistrict){
      //   this.$store.commit('setDomainId', this.checkDistrict)
			//   localStorage.setItem('domainId', this.checkDistrict)
      // }
    },
    checkFloor: function() {
      // 更新moId(项目中使用)
      // this.$store.commit('setMoId', this.checkFloor)
      // localStorage.setItem('moId', this.checkFloor)
      
    },
    moId: function() {
      //设置新的默认楼宇
      fetch("setDefaultBuild", { moId: this.moId }, data => {
        //更新cookie
        setCookie("moId", this.moId);
        //更新缓存
        this.$store.commit("setMoId", this.moId);
        localStorage.setItem("moId", this.moId);
      });
    }
  }
};