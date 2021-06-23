<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>计数展示</el-breadcrumb-item>
      <el-breadcrumb-item>机械明细表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
<!--      v-loading="loading"-->
<!--      element-loading-text="拼命加载中"-->
<!--      element-loading-spinner="el-icon-loading"-->
<!--      element-loading-background="rgba(0, 0, 0, 0.8)">-->
    <span>生效时间：</span>
      <el-date-picker
        v-model="listQuery.dateRange"
        type="datetimerange"
        style="margin-left: 10px"
        align="right"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        value-format="yyyy-MM-dd HH:mm:ss"
      >
      </el-date-picker>
      <span> 车辆类型：</span>
      <el-select
        v-model="listQuery.carType"
        placeholder="请选择"
        style="width: 200px"
        class="filter-item"
        clearable
        @change='selectCarType'
      >
        <el-option
          v-for="item in carType_Options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <span> 车号：</span>
      <el-select
        v-model="listQuery.trackNo"
        placeholder="请选择"
        style="width: 200px"
        class="filter-item"
        clearable
      >
        <el-option
          v-for="item in trackNo_Options"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-button

        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        查询
      </el-button>
        <el-table
          id="table"
          :data= list.slice((currentPage-1)*pageSize,currentPage*pageSize)
          :row-class-name="tableRowClassName"
          border
          fit
          highlight-current-row
          style="width: 100%"
          max-height="550"
        >
          <!-- ID -->
          <el-table-column label="序号"  align="center" width="70">
            <template slot-scope="scope">
              <span> {{ scope.$index + (currentPage - 1) * pageSize + 1 }} </span>
            </template>
          </el-table-column>
          <el-table-column label="车号" width="100px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.carNo }}</span>
            </template>
          </el-table-column>
          <el-table-column label="车型" width="100px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.carType }}</span>
            </template>
          </el-table-column>
          <el-table-column label="车数" width="100px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.tripNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单价" width="100px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.unitPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column label="物料" width="100px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.material}}</span>
            </template>
          </el-table-column>
          <el-table-column label="运距" width="100px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.transportDistance }}</span>
            </template>
          </el-table-column>
          <el-table-column label="倍数" width="100px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.multiple }}</span>
            </template>
          </el-table-column>
          <el-table-column label="装运收入" width="100px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.loadTransportIncome }}</span>
            </template>
          </el-table-column>
          <el-table-column label="标箱车数" width="100px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.biaoxiangCar }}</span>
            </template>
          </el-table-column>
          <el-table-column label="方量" width="100px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.volume }}</span>
            </template>
          </el-table-column>
          <el-table-column label="计时收入" width="100px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.timeIncome }}</span>
            </template>
          </el-table-column>
          <el-table-column label="装煤收入" width="100px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.loadCoalIncome }}</span>
            </template>
          </el-table-column>
          <el-table-column label="毛收入" width="100px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.grossIncome }}</span>
            </template>
          </el-table-column>
          <el-table-column label="加油升数" width="100px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.sumOilL }}</span>
            </template>
          </el-table-column>
          <el-table-column label="燃油费" width="100px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.fuelFee }}</span>
            </template>
          </el-table-column>
          <el-table-column label="工资" width="100px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.salary }}</span>
            </template>
          </el-table-column>
          <el-table-column label="修理费" width="100px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.maintenanceFee }}</span>
            </template>
          </el-table-column>
          <el-table-column label="伙食费" width="100px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.mealFee }}</span>
            </template>
          </el-table-column>
          <el-table-column label="配件费" width="100px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.accessoryFee }}</span>
            </template>
          </el-table-column>
          <el-table-column label="罚款" width="100px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.penalty }}</span>
            </template>
          </el-table-column>
          <el-table-column label="奖金" width="100px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.reward }}</span>
            </template>
          </el-table-column>
          <el-table-column label="利润" width="100px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.profit }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单车消耗" width="100px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.oilConsumePerCar }}</span>
            </template>
          </el-table-column>
          <el-table-column label="油耗比" width="100px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.oilConsumeRatio }}</span>
            </template>
          </el-table-column>
        </el-table>
      <div style="height: 10%">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { getList,getExcavatorAndCar } from '@/api/MachineDetail'

export default {
  name: 'MachineDetail',
  data() {
    return {
      loading: true,
      currentPage: 1,
      pageSize: 10,
      list: [],
      total: 0,
      listQuery: {
        beginTime: '',// '2021-03-21 00:00:00'
        endTime: '',// '2021-03-21 24:00:00'
        trackNo: '',// '501#'
        dateRange: new Date(),
        carType: ''
      },
      carType_Options: [
        {label: '挖机', value: '挖机'},
        {label: '卡车', value: '卡车'}
      ],
      trackNo_Options: [],
      Excavator_Options: [],
      Car_Options: [],
    }
  },
  mounted() {
    this.getExcavatorAndCar()
    //this.getList()
  },
  methods: {
    tableRowClassName({row}) {
      if (row.carNo === '合计') {
        return 'total-row'
      }else {
        return ''
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
    },
    getList(){
        if(this.listQuery.dateRange[0] === '') {
          this.listQuery.beginTime = '2021-01-01 00:00:00'
          this.listQuery.endTime = '2021-01-01 00:00:00'
        }else {
          this.listQuery.beginTime = this.listQuery.dateRange[0]
          this.listQuery.endTime = this.listQuery.dateRange[1]
        }

      getList(this.listQuery).then( resp =>{
        this.list = resp.data
        this.slicelist = this.list.slice(0,10)
        console.log("list===",this.slicelist)
        this.total = resp.data.length
      })
      //this.loading = false
    },
    getExcavatorAndCar(){
      getExcavatorAndCar().then( resp =>{
        this.Car_Options = resp.data.car
        this.Excavator_Options = resp.data.excavator
      })
    },
    selectCarType(param){
      if (param === '挖机') {
        this.trackNo_Options = this.Excavator_Options
        console.log('车号1：',this.trackNo_Options)
      }else if (param === '卡车') {
        this.trackNo_Options = this.Car_Options
        console.log('车号2：',this.trackNo_Options)
      }
    },
    handleFilter() {
        this.getList()
    }
  }
}
</script>

<style>
.el-table .total-row {
  background: cadetblue;
}
</style>
