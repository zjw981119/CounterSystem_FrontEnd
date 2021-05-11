<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>展示</el-breadcrumb-item>
      <el-breadcrumb-item>工作记录查询</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-row :gutter="20">
        <!-- 日期时间选择器 -->
        <!-- value-format:"yyyy-MM-dd HH:mm:ss" -->
        <el-col :span="8">
          <el-date-picker v-model="timevalue" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['06:00:00', '06:00:00']" value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-col>
        <!-- 查询车号输入框 -->
        <el-col :span="4">
          <el-input placeholder="请输入想要查询的车号" v-model="queryInfo.queryCar" clearable>
          </el-input>
        </el-col>
        <!-- 查询按钮 -->
        <el-col :span="4">
          <el-button icon="el-icon-search" type="primary" @click="getRecordData">查询</el-button>
        </el-col>
      </el-row>

      <!-- 展示工作记录区域 -->
      <el-table ref="multipleTable" :data="recordlist" border stripe :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" height="460">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="计数宝编号" prop="address"></el-table-column>
        <el-table-column label="挖机编号" prop="grabCarNum"></el-table-column>
        <el-table-column label="车辆编号" prop="carNum"></el-table-column>
        <el-table-column label="刷卡时间" prop="time"></el-table-column>
        <el-table-column label="车数" prop="degree"></el-table-column>
        <!-- 物料选择器 -->
        <el-table-column label="物料" prop="material">
          <template slot-scope="scope">
            <el-select v-model="scope.row.material" @change="changeMultiMaterial(scope.row.material)" clearable placeholder="">
              <el-option v-for="item in MaterialOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column label="运距" prop="distance">
          <template slot-scope="scope">
            <el-input v-model="scope.row.distance" @change="changeMultiDistance(scope.row.distance)" clearable></el-input>
          </template>
        </el-table-column>

        <el-table-column label="单价" prop="price">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price" @change="changeMultiPrice(scope.row.price)" clearable></el-input>
          </template>
        </el-table-column>
        <!-- 车载选择器 -->
        <el-table-column label="车辆状态" prop="isFull">
          <template slot-scope="scope">
            <el-select v-model="scope.row.isFull" @change="changeMultiCarLoad(scope.row.isFull)" clearable placeholder="">
              <el-option v-for="item in CarLoadOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column label="特殊情况加车数" prop="remark">
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark" @change="changeMultiRemark(scope.row.remark)" clearable></el-input>
          </template>
        </el-table-column>

        <el-table-column label="图片">
          <template slot-scope="scope">
            <el-image style="width: 50px; height: 50px" :src="scope.row.picture" :preview-src-list="[scope.row.picture]">
            </el-image>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 20, 40]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>

    <!-- 修改满载判断数据 -->
    <div style="margin-top: 20px">
      <el-button type="primary" icon="el-icon-edit" @click="setNoLoad();changeCarload();">空111载</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="setHalfLoad();changeCarload()">半载</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="setFullLoad();changeCarload()">满载</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timevalue: '',

      queryInfo: {
        queryCar: '',
        beginTime: '',
        endTime: '',
        //当前页数
        pagenum: 1,
        //每页数据条数
        pagesize: 10,
      },
      total: 0,
      carload: '',

      //物料选择器的数据
      MaterialOptions: [
        {
          value: '1',
          label: '硬土',
        },
        {
          value: '2',
          label: '软土',
        },
      ],

      //车载选择器的数据
      CarLoadOptions: [
        {
          value: '-1',
          label: '满车',
        },
        {
          value: '0',
          label: '空车',
        },
        {
          value: '1',
          label: '半车',
        },
      ],

      recordlist: [],

      selectlist: [],
    }
  },

  methods: {
    //修改车载值
    setNoLoad() {
      this.carload = '空载'
    },
    setHalfLoad() {
      this.carload = '半载'
    },
    setFullLoad() {
      this.carload = '满载'
    },
    //获取矿车工作记录数据
    async getRecordData() {
      var that = this
      console.log(this.timevalue)
      console.log(this.queryInfo.queryCar)
      if (this.timevalue == 0 || this.timevalue == null) {
        return this.$message.error('查询日期时间不得为空')
      }
      this.queryInfo.beginTime = this.timevalue[0]
      this.queryInfo.endTime = this.timevalue[1]
      const { data: res } = await this.$http.get(
        'http://localhost:8083/Server/counter/getRecord',
        {
          params: this.queryInfo,
        }
      )
      if (res.result.code !== '20000') {
        return that.$message.error('获取工作记录失败')
      }
      this.recordlist = res.data
      this.total = res.total
      console.log(res)
    },

    //监听pagesize改变的事件
    handleSizeChange(newSize) {
      //console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getRecordData()
    },

    //监听页码改变的事件
    handleCurrentChange(newPage) {
      //console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getRecordData()
    },

    //监听单价输入框改变的事件
    changeMultiPrice(newPrice) {
      //console.log(newPrice)
      var length = this.$refs.multipleTable.selection.length
      //若没有使用多选框，则直接返回
      if (length == 0) return
      //使用多选框，则修改所有选中行的价格
      else {
        for (
          let index = 0;
          index < this.$refs.multipleTable.selection.length;
          index++
        ) {
          this.$refs.multipleTable.selection[index].price = newPrice
        }
      }
    },

    //监听运距输入框改变的事件
    changeMultiDistance(newDistance) {
      //console.log(newPrice)
      var length = this.$refs.multipleTable.selection.length
      //若没有使用多选框，则直接返回
      if (length == 0) return
      //使用多选框，则修改所有选中行的价格
      else {
        for (
          let index = 0;
          index < this.$refs.multipleTable.selection.length;
          index++
        ) {
          this.$refs.multipleTable.selection[index].distance = newDistance
        }
      }
    },

    //监听特殊情况加车数输入框改变的事件
    changeMultiRemark(newRemark) {
      //console.log(newPrice)
      var length = this.$refs.multipleTable.selection.length
      //若没有使用多选框，则直接返回
      if (length == 0) return
      //使用多选框，则修改所有选中行的价格
      else {
        for (
          let index = 0;
          index < this.$refs.multipleTable.selection.length;
          index++
        ) {
          this.$refs.multipleTable.selection[index].remark = newRemark
        }
      }
    },

    //监听物料选择器改变的事件
    changeMultiMaterial(newMaterial) {
      console.log(newMaterial)
      var length = this.$refs.multipleTable.selection.length
      //若没有使用多选框，则直接返回
      if (length == 0) return
      //使用多选框，则修改所有选中行的价格
      else {
        for (
          let index = 0;
          index < this.$refs.multipleTable.selection.length;
          index++
        ) {
          this.$refs.multipleTable.selection[index].material = newMaterial
        }
      }
    },

    //监听车载选择器改变的事件
    changeMultiCarLoad(newCarLoad) {
      console.log(newCarLoad)
      var length = this.$refs.multipleTable.selection.length
      //若没有使用多选框，则直接返回
      if (length == 0) return
      //使用多选框，则修改所有选中行的价格
      else {
        for (
          let index = 0;
          index < this.$refs.multipleTable.selection.length;
          index++
        ) {
          this.$refs.multipleTable.selection[index].isFull = newCarLoad
        }
      }
    },
    //车载修改按钮
    async changeCarload() {
      var that = this
      //弹框询问是否想要修改
      const confirmResult = await this.$confirm(
        '此操作将修改所选数据行的车载信息为空载, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消修改')
      }

      this.selectlist = this.$refs.multipleTable.selection
      //没有选中数据
      if (this.selectlist.length == 0)
        return this.$message.error('没有选中的数据行')
      console.log(this.selectlist)
      var selectID = new Array()
      for (let index = 0; index < this.selectlist.length; index++) {
        selectID.push(this.selectlist[index].id)
      }
      const {
        data: res,
      } = await this.$http.post(
        'http://localhost:8083/Server/counter/setCarload',
        { IdList: selectID, CarLoad: this.carload }
      )
      if (res.result.code !== '20000') {
        return that.$message.error('修改车载信息失败')
      }
      that.$message.success('修改车载信息成功')
      //console.log(selectID)
      //刷新表格
      this.getRecordData()
    },
  },
}
</script>

<style lang="less" scoped>
</style>
