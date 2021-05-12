<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>展示</el-breadcrumb-item>
      <el-breadcrumb-item>车辆油量表</el-breadcrumb-item>
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
      <el-table :data="carfuelList" border stripe :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" height="480">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="车号" prop="carNum"></el-table-column>
        <el-table-column label="车型" prop="carType"></el-table-column>
        <el-table-column label="内部/外部" prop="condition"></el-table-column>
        <el-table-column label="车主姓名" prop="ownerName"></el-table-column>
        <el-table-column label="油卡编号" prop="gasCard"></el-table-column>
        <el-table-column label="加油时间" prop="addTime"></el-table-column>
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
      carfuelList: [
        {
          carNum: '002#',
          carType: '自卸车',
          condition: '外部',
          ownerName: '磐宏',
          gasCard: '',
          gasVolume: '5',
          addTime: '2021-5-12 10:58:46',
          gasPrice: '6',
          totalPrice: '30',
        },
        {
          carNum: '503#',
          carType: '自卸车',
          condition: '外部',
          ownerName: '磐宏',
          gasCard: '',
          gasVolume: '5',
          addTime: '2021-5-12 15:40:30',
          gasPrice: '5.5',
          totalPrice: '27.5',
        },
        {
          carNum: '501#',
          carType: '自卸车',
          condition: '内部',
          ownerName: '磐宏',
          gasCard: '',
          gasVolume: '5',
          addTime: '2021-5-12 15:40:30',
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