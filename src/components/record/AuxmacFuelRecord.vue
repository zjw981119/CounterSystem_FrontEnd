<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>计数展示</el-breadcrumb-item>
      <el-breadcrumb-item>辅助车辆加油情况表</el-breadcrumb-item>
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
          <el-button icon="el-icon-search" type="primary" @click="getAuxMacConfig">查询</el-button>
        </el-col>
      </el-row>

      <!-- 配置列表区域 -->
      <el-table :data="AuxcarfuelList" border stripe :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" height="480">
        <el-table-column label="辅助车号" prop="AuxcarNum"></el-table-column>
        <el-table-column label="车型" prop="carType"></el-table-column>
        <el-table-column label="油卡编号" prop="oilCard"></el-table-column>
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
          AuxcarNum: '1号',
          oilCard: '7283801',
          oilVolume: '5',
        },
        {
          AuxcarNum: '2号',
          oilCard: '7283803',
          oilVolume: '6',
        },
        {
          AuxcarNum: '3号',
          oilCard: '7283805',
          oilVolume: '7',
        },
        {
          AuxcarNum: '4号',
          oilCard: '7283807',
          oilVolume: '6',
        },
        {
          AuxcarNum: '5号',
          oilCard: '7283809',
          oilVolume: '6',
        },
        {
          AuxcarNum: '6号',
          oilCard: '7283811',
          oilVolume: '5',
        },
        {
          AuxcarNum: '7号',
          oilCard: '7283813',
          oilVolume: '6',
        },
      ],
      //辅助车辆配置表
      AuxcarConfiglist: [],
      //拼接成辅助车辆加油情况表
      AuxcarfuelList: [],
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
    const newmonth = nowdate.month > 10 ? nowdate.month : '0' + nowdate.month
    const newday = nowdate.day > 10 ? nowdate.day : '0' + nowdate.day
    this.timevalue = nowdate.year + '-' + newmonth + '-' + newday
    //console.log(this.timevalue)
    this.getAuxMacConfig()
  },
  methods: {
    //获取配置信息请求
    async getAuxMacConfig() {
      this.AuxcarfuelList = new Array()
      var that = this
      const { data: res } = await this.$http.get(
        this.baseURL + 'AuxMachine/getConfig',
        {
          params: { timevalue: this.timevalue },
        }
      )
      if (res.result.code !== '20000') {
        return that.$message.error('获取辅助车辆配置表失败')
      }
      this.AuxcarConfiglist = res.data
      //与油卡API信息进行拼接
      for (let i = 0; i < this.AuxcarConfiglist.length; i++) {
        for (let j = 0; j < this.oilAPI.length; j++) {
          if (this.AuxcarConfiglist[i].carId == this.oilAPI[j].AuxcarNum) {
            this.AuxcarfuelList.push({
              AuxcarNum: this.AuxcarConfiglist[i].carId,
              carType: this.AuxcarConfiglist[i].carType,
              oilCard: this.oilAPI[j].oilCard,
              oilVolume: this.oilAPI[j].oilVolume,
              initPrice: this.AuxcarConfiglist[i].price,
              totalPrice:
                this.oilAPI[j].oilVolume * this.AuxcarConfiglist[i].price,
            })
          }
        }
      }

      console.log(this.AuxcarConfiglist)
    },
  },
}
</script>


<style lang="less" scoped>
.el-card {
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15) !important ;
}
</style>