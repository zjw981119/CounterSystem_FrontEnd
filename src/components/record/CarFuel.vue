<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>计数展示</el-breadcrumb-item>
      <el-breadcrumb-item>车辆油量表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 日期选择与查询 -->
      <el-row :gutter="20">
        <!-- 日期选择 -->
        <el-col :span="5">
          <el-date-picker v-model="timevalue" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-col>
        <!-- 查询按钮 -->
        <el-col :span="4">
          <el-button icon="el-icon-search" type="primary" @click="getCarConfig">查询</el-button>
        </el-col>
      </el-row>

      <!-- 配置列表区域 -->
      <el-table :data="carfuelList" border stripe :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" height="740">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="车号" prop="carNum"></el-table-column>
        <el-table-column label="车型" prop="carType"></el-table-column>
        <el-table-column label="内部/外部" prop="condition"></el-table-column>
        <el-table-column label="车主姓名" prop="ownerName"></el-table-column>
        <el-table-column label="油卡编号" prop="oilCard"></el-table-column>
        <el-table-column label="加油时间" prop="addTime" width="200px"></el-table-column>
        <el-table-column label="加油升数" prop="oilVolume"></el-table-column>
        <el-table-column label="油品单价" prop="initPrice"></el-table-column>
        <el-table-column label="金额" prop="totalPrice"></el-table-column>
      </el-table>

    </el-card>

  </div>
</template>

<script>
//引入全局变量
import GLOBAL from '@/api/global_variable'

export default {
  data() {
    return {
      //请求地址
      baseURL: GLOBAL.baseURL,
      timevalue: '',
      //加油API接口获得的数据
      oilAPI: [
        {
          carNum: '002#',
          oilCard: '7283599',
          oilVolume: '5',
          addTime: '2021-05-08 15:54:36',
        },
        {
          carNum: '050#',
          oilCard: '7283601',
          oilVolume: '7',
          addTime: '2021-05-11 17:57:05',
        },
        {
          carNum: '058#',
          oilCard: '7283603',
          oilVolume: '6',
          addTime: '2021-05-13 09:44:23',
        },
        {
          carNum: '097#',
          oilCard: '7283605',
          oilVolume: '7',
          addTime: '2021-05-14 11:46:55',
        },
        {
          carNum: '112#',
          oilCard: '7283607',
          oilVolume: '7',
          addTime: '2021-05-14 13:24:41',
        },
        {
          carNum: '503#',
          oilCard: '7283609',
          oilVolume: '7',
          addTime: '2021-05-14 17:13:19',
        },
        {
          carNum: '504#',
          oilCard: '7283611',
          oilVolume: '7',
          addTime: '2021-05-14 19:18:37',
        },
      ],

      //辅助车辆配置表
      carConfiglist: [],

      //拼接车辆油量表
      carfuelList: [],
    }
  },

  //自动获取当前日期的数据
  created() {
    const date = new Date()
    const nowdate = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    }
    const newmonth = nowdate.month > 9 ? nowdate.month : '0' + nowdate.month
    const newday = nowdate.day > 9 ? nowdate.day : '0' + nowdate.day
    this.timevalue = nowdate.year + '-' + newmonth + '-' + newday
    //console.log(this.timevalue)
    this.getCarConfig()
  },

  methods: {
    //获取配置信息请求
    async getCarConfig() {
      this.carfuelList = new Array()
      var that = this
      const { data: res } = await this.$http.get(
        this.baseURL + 'Carconfig/getConfig',
        {
          params: { timevalue: this.timevalue },
        }
      )
      if (res.result.code !== '20000') {
        return that.$message.error('获取车辆配置表失败')
      }
      this.carConfiglist = res.data
      //与油卡API信息进行拼接
      for (let i = 0; i < this.carConfiglist.length; i++) {
        for (let j = 0; j < this.oilAPI.length; j++) {
          if (this.carConfiglist[i].carNum == this.oilAPI[j].carNum) {
            this.carfuelList.push({
              carNum: this.carConfiglist[i].carNum,
              carType: this.carConfiglist[i].carType,
              condition: this.carConfiglist[i].place,
              ownerName: this.carConfiglist[i].ownerName,
              oilCard: this.oilAPI[j].oilCard,
              addTime: this.oilAPI[j].addTime,
              oilVolume: this.oilAPI[j].oilVolume,
              initPrice: this.carConfiglist[i].initPrice,
              totalPrice:
                this.oilAPI[j].oilVolume * this.carConfiglist[i].initPrice,
            })
          }
        }
      }

      console.log(this.carConfiglist)
    },
  },
}
</script>


<style lang="less" scoped>
.el-card {
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15) !important ;
}
</style>