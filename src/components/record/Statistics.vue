<template>
  <div style="text-align: center;">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>展示</el-breadcrumb-item>
      <el-breadcrumb-item>车辆运输统计</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 时间选择、搜索区域 -->
      <el-row :gutter="20">
        <el-col :span="16">
          <el-date-picker type="daterange" v-model="timevalue" range-separator="至" 
          start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="getcountData">查询</el-button>
        </el-col>
      </el-row>

      <!-- 统计数据区域 -->
      <el-table :data="countslist" border stripe size="medium" :summary-method="getSummaries" show-summary 
      :header-cell-style="{'text-align':'center'}" > 
        <el-table-column type="index" label="#" width="50" align="center"></el-table-column>
        <el-table-column label="车号" prop="carNum" align="center"></el-table-column>
        <el-table-column label="运输趟数" prop="counts" align="center"></el-table-column>
      </el-table>
    </el-card>
  </div>

</template>

<script>
export default {
  data() {
    return {
      timevalue: '',

      editForm: {
        beginTime: '',
        endTime: '',
      },

      countslist: [],
    }
  },

  methods: {
    //获取车辆运输统计数据
    async getcountData() {
      var that = this
      console.log(this.timevalue)
      if (this.timevalue == 0 ||this.timevalue==null) {
        return this.$message.error('查询日期不得为空')
      }
      this.editForm.beginTime = this.timevalue[0]
      this.editForm.endTime = this.timevalue[1]
      const { data: res } = await this.$http.get(
        'http://localhost:8083/Server/counter/getData',
        {
          params: this.editForm,
        }
      )
      if (res.result.code !== '20000') {
        return that.$message.error('获取统计数据失败')
      }
      this.countslist = res.data
      console.log(res)
    },

    //合计方法
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        const values = data.map((item) => Number(item[column.property]))
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 趟'
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    },
  },
}
</script>

<style lang="less" scoped>
.el-card {
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15) !important ;
  padding-left: 20% !important;
  padding-right: 20% !important;
}
</style>