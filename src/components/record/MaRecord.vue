<template>
  <div style="text-align: center;">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>展示</el-breadcrumb-item>
      <el-breadcrumb-item>统计表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 时间选择、搜索区域 -->
      <el-row :gutter="20">
        <span class="demonstration">时间</span>
        <el-date-picker
            v-model="value"

            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">

        </el-date-picker>



        <el-button
            class="filter-item"
            style="margin-left: 10px;margin-top: 20px"
            type="primary"
            icon="el-icon-search"
            @click="search"
        >
          查询
        </el-button>
      </el-row>

      <!-- 统计数据区域 -->
      <el-table :data="countslist1" border stripe :header-cell-style="{'text-align':'center'}" :cell-style="tableRowStyleName" width=100%  >
        <el-table-column type="index" label="#" width="50" ></el-table-column>
        <el-table-column label="车型" prop="car_type" width="60px" ></el-table-column>
        <el-table-column label="车号" prop="car_no" width="60px"></el-table-column>
        <el-table-column label="车数" prop="tripNum" width="60px"></el-table-column>
        <el-table-column label="单价" prop="oil_price" width="60px"></el-table-column>
        <el-table-column label="运距" prop="transport_distance" width="60px"></el-table-column>
        <el-table-column label="倍数" prop="multiple" width="60px"></el-table-column>
        <el-table-column label="装运收入" prop="zhuang" width="80px"></el-table-column>
        <el-table-column label="标箱车数" prop="biao" width="80px"></el-table-column>
        <el-table-column label="方量" prop="fang" width="60px"></el-table-column>
        <el-table-column label="计时收入" prop="jishi" width="80px"></el-table-column>
        <el-table-column label="装煤收入" prop="mei" width="80px"></el-table-column>
        <el-table-column label="毛收入" prop="mao" width="70px"></el-table-column>
        <el-table-column label="加油升数" prop="oil_L" width="80px"></el-table-column>
        <el-table-column label="燃油费" prop="ran" width="70px"></el-table-column>
        <el-table-column label="工资" prop="oil_price" width="60px"></el-table-column>
        <el-table-column label="修理费" prop="oil_price" width="70px"></el-table-column>
        <el-table-column label="伙食费" prop="oil_price" width="80px"></el-table-column>
        <el-table-column label="配件费" prop="oil_price" width="80px"></el-table-column>
        <el-table-column label="罚款" prop="oil_price" width="60px"></el-table-column>
        <el-table-column label="其他" prop="oil_price" width="60px"></el-table-column>
        <el-table-column label="利润" prop="oil_price" width="60px"></el-table-column>
        <el-table-column label="单车油耗" prop="oil_price" width="80px"></el-table-column>
        <el-table-column label="油耗比" prop="oil_price" width="80px"></el-table-column>
      </el-table>
    </el-card>
  </div>

</template>

<script>
const axios = require('axios')


export default {
  data() {

    return {
      value1:'',
      value2:'',
      value:'',


      countslist1: [],


    }
  },


  methods: {

    tableRowStyleName({row}) {
      if(row.car_type == '合计'){
        return 'background-color: #19CAAD !important;';
      }
    },
    search() {
      axios.post('http://localhost:8083/Server/wa/findAll',
          {

            value1: this.value == null ? null : this.value[0],
            value2: this.value == null ? null : this.value[1]

          }).then(res => {
        if (res.data) {
          console.log(res.data.data)
          this.countslist1 = res.data.data
          console.log(res.data)
          // this.total = res.data.data.length
        }
      })
    }





  }
}
</script>

<style lang="less" scoped>

</style>
