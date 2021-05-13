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
          <el-date-picker v-model="value1" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-col>
        <!-- 查询按钮 -->
        <el-col :span="4">
          <el-button icon="el-icon-search" type="primary">查询</el-button>
        </el-col>
      </el-row>

      <!-- 配置列表区域 -->
      <el-table :data="AuxcarfuelList" border stripe :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" height="480">
        <el-table-column label="辅助车号" prop="AuxcarNum"></el-table-column>
        <el-table-column label="车型" prop="carType"></el-table-column>
        <el-table-column label="油卡编号" prop="gasCard"></el-table-column>
        <el-table-column label="加油升数" prop="gasVolume"></el-table-column>
        <el-table-column label="油品单价" prop="gasPrice"></el-table-column>
        <el-table-column label="金额" prop="totalPrice"></el-table-column>
      </el-table>

    </el-card>

  </div>
</template>

<script>
export default {
  data() {
    return {
      AuxcarfuelList: [
        {
          AuxcarNum: '002#',
          carType: '装载机',
          gasCard: '1357955',
          gasVolume: '5',
          gasPrice: '6',
          totalPrice: '30',
        },
        {
          AuxcarNum: '503#',
          carType: '水车',
          gasCard: '1111555',
          gasVolume: '5',
          gasPrice: '5.5',
          totalPrice: '27.5',
        },
        {
          AuxcarNum: '501#',
          carType: '钻机',
          gasCard: '3455667',
          gasVolume: '5',
          gasPrice: '5.5',
          totalPrice: '27.5',
        },
      ],
    }
  },
}
</script>


<style lang="less" scoped>
.el-card {
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15) !important ;
}
</style>