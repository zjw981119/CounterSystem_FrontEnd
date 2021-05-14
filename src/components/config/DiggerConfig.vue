<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>展示</el-breadcrumb-item>
      <el-breadcrumb-item>挖机配置表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <!-- 日期时间选择器 -->
        <el-col :span="8">
          <el-date-picker v-model="dateValue" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-col>
        <!-- 查询按钮 -->
        <el-col :span="4">
          <el-button icon="el-icon-search" type="primary" @click="getList">查询</el-button>
        </el-col>
      </el-row>

      <!-- 展示工作记录区域 -->
      <el-table ref="multipleTable" :data="recordlist" border stripe :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" height="460">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="车号" prop="carNo"></el-table-column>
        <el-table-column label="车型" prop="carType"></el-table-column>
        <el-table-column label="内部/外部" prop="innerOrOuter"></el-table-column>
        <el-table-column label="车主姓名" prop="carMasterName"></el-table-column>
        <el-table-column label="油品单价" prop="oilPrice"></el-table-column>
        <el-table-column label="工资" prop="salary"></el-table-column>

      </el-table>


    </el-card>
  </div>
</template>

<script>
import { queryConditional } from '@/api/DiggerConfig'
import { parseTime } from '@/utils/time-util'

export default {
  data(){
    return{
      recordlist: [],
      dateValue: new Date().toLocaleDateString()

    }
  },
  mounted() {
    this.getList()
  },
  methods:{
    getList(){
      queryConditional({date:parseTime(this.dateValue,"{y}-{m}-{d}")}).then(resp => {
        this.recordlist=resp.data
      }).catch(error => {
        console.log(error)
      })
    }

  }
}
</script>

<style lang="less" scoped>

</style>
