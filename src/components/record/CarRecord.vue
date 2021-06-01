<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>计数展示</el-breadcrumb-item>
      <el-breadcrumb-item>工作记录查询</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-row :gutter="20">
        <!-- 日期时间选择器 -->
        <!-- value-format:"yyyy-MM-dd HH:mm:ss" -->
        <el-col :span="8">
          <el-date-picker v-model="timevalue" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['06:00:00', '06:00:00']" value-format="yyyy-MM-dd HH:mm:ss" @change="getSelection">
          </el-date-picker>
        </el-col>
        <!-- 车号选择器 -->
        <el-col :span="4">
          <el-select v-model="queryInfo.queryCar" placeholder="选择车号" clearable>
            <el-option v-for="item in Carnumoptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <!-- 刷卡器选择器 -->
        <el-col :span="4">
          <el-select v-model="queryInfo.queryAddress" placeholder="选择刷卡器编号" clearable>
            <el-option v-for="item in Addressoptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <!-- 挖机选择器 -->
        <el-col :span="4">
          <el-select v-model="queryInfo.queryDigger" placeholder="选择挖机号" clearable>
            <el-option v-for="item in Diggeroptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <!-- 查询按钮 -->
        <el-col :span="2">
          <el-button icon="el-icon-search" type="primary" @click="getRecordData">查询</el-button>
        </el-col>
        <!-- 上传按钮 -->
        <el-col :span="2">
          <el-button type="primary" @click="UploadData">上传<i class="el-icon-upload el-icon--right"></i></el-button>
        </el-col>
      </el-row>

      <!-- 展示工作记录区域 recordlist-->
      <el-table ref="multipleTable" :data="recordlist" border stripe :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" height="480" style="width: 100%">
        <el-table-column type="selection" width="55" fixed="left"></el-table-column>
        <el-table-column type="index" label="#" fixed="left"></el-table-column>
        <el-table-column label="计数宝编号" prop="address" width="120px"></el-table-column>
        <el-table-column label="挖机编号" prop="grabCarNum" width="120px"></el-table-column>
        <el-table-column label="车辆编号" prop="carNum" sortable width="120px"></el-table-column>
        <el-table-column label="刷卡时间" prop="time" sortable width="200px"></el-table-column>
        <el-table-column label="车数" prop="degree"></el-table-column>
        <!-- 物料选择器 -->
        <el-table-column label="物料" prop="material" width="100px">
          <template slot-scope="scope">
            <el-select v-model="scope.row.material" @change="changeMultiMaterial(scope.row.material)" placeholder="">
              <el-option v-for="item in MaterialOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column label="运距" prop="distance" width="100px">
          <template slot-scope="scope">
            <el-input v-model="scope.row.distance" @change="changeMultiDistance(scope.row.distance)" clearable></el-input>
          </template>
        </el-table-column>

        <el-table-column label="单价" prop="price" width="100px">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price" @change="changeMultiPrice(scope.row.price)" clearable></el-input>
          </template>
        </el-table-column>
        <!-- 车载选择器 -->
        <el-table-column label="车辆状态" prop="isFull" width="100px">
          <template slot-scope="scope">
            <el-select v-model="scope.row.isFull" @change="changeMultiCarLoad(scope.row.isFull)" placeholder="">
              <el-option v-for="item in CarLoadOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column label="特殊情况加车数" prop="additionalCount">
          <template slot-scope="scope">
            <el-input v-model="scope.row.additionalCount" clearable></el-input>
          </template>
        </el-table-column>

        <!-- 鼠标点击图片放大 -->
        <el-table-column label="图片" width="120px">
          <template slot-scope="scope">
            <!-- <el-image style="width: 50px; height: 50px" :src="scope.row.picture" :preview-src-list="[scope.row.picture]">
            </el-image> -->
            <el-popover placement="right" trigger="hover" width="700">
              <el-image slot="reference" :src="img_url+ scope.row.id"></el-image>
              <el-image :src="img_url+ scope.row.id"></el-image>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[20, 40, 60]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total" v-show="isShow">
      </el-pagination>
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
      img_url: 'http://222.74.94.190:8093/Server/file/showImage/',

      timevalue: '',
      isShow: false,
      //查询请求对象
      queryInfo: {
        queryCar: '',
        queryAddress: '',
        queryDigger: '',
        beginTime: '',
        endTime: '',
        //当前页数
        pagenum: 1,
        //每页数据条数
        pagesize: 40,
      },

      //选择器对象
      selectionlist: {
        carnumSelection: [],
        addressSelection: [],
        diggerSelection: [],
      },
      total: 0,
      carload: '',
      //车号选择器
      Carnumoptions: [
        {
          value: '',
          label: '',
        },
      ],
      //刷卡器选择器
      Addressoptions: [
        {
          value: '',
          label: '',
        },
      ],
      //挖机选择器
      Diggeroptions: [
        {
          value: '',
          label: '',
        },
      ],
      //物料选择器的数据
      MaterialOptions: [
        {
          value: '硬土',
          label: '硬土',
        },
        {
          value: '软土',
          label: '软土',
        },
        {
          value: '炮料',
          label: '炮料',
        },
      ],

      //车载选择器的数据
      CarLoadOptions: [
        {
          value: '-1',
          label: '满车',
        },
        {
          value: '空车',
          label: '空车',
        },
        {
          value: '半车',
          label: '半车',
        },
      ],

      recordlist: [],

      updatelist: [],
    }
  },

  methods: {
    //获得选择器数据
    async getSelection() {
      var that = this
      //清空前端选择器
      this.Carnumoptions = new Array()
      this.Addressoptions = new Array()
      this.Diggeroptions = new Array()
      //清空日期时不请求数据
      if (this.timevalue == 0 || this.timevalue == null) {
        return
      }
      const { data: res } = await this.$http.get(
        this.baseURL + 'counter/getSelection',
        { params: { beginTime: this.timevalue[0], endTime: this.timevalue[1] } }
      )
      if (res.result.code !== '20000') {
        return that.$message.error('获取选择器数据失败')
      }
      this.selectionlist = res.data
      //车号选择器赋值
      this.Carnumoptions.pop()
      for (
        let index = 0;
        index < this.selectionlist.carnumSelection.length;
        index++
      ) {
        this.Carnumoptions.push({
          value: this.selectionlist.carnumSelection[index],
          label: this.selectionlist.carnumSelection[index],
        })
      }
      //刷卡选择器赋值
      this.Addressoptions.pop()
      for (
        let index = 0;
        index < this.selectionlist.addressSelection.length;
        index++
      ) {
        this.Addressoptions.push({
          value: this.selectionlist.addressSelection[index],
          label: this.selectionlist.addressSelection[index],
        })
      }
      //挖机选择器赋值
      this.Diggeroptions.pop()
      for (
        let index = 0;
        index < this.selectionlist.diggerSelection.length;
        index++
      ) {
        this.Diggeroptions.push({
          value: this.selectionlist.diggerSelection[index],
          label: this.selectionlist.diggerSelection[index],
        })
      }
      console.log(this.selectionlist)
    },

    //获取矿车工作记录数据
    async getRecordData() {
      var that = this
      //满足分页查询条件时，pagination显示
      if (
        this.queryInfo.queryCar == '' &&
        this.queryInfo.queryAddress == '' &&
        this.queryInfo.queryDigger == ''
      ) {
        this.isShow = true
      } else {
        this.isShow = false
      }
      console.log(this.timevalue)
      console.log(this.queryInfo.queryCar)
      if (this.timevalue == 0 || this.timevalue == null) {
        return this.$message.error('查询日期时间不得为空')
      }
      this.queryInfo.beginTime = this.timevalue[0]
      this.queryInfo.endTime = this.timevalue[1]
      const { data: res } = await this.$http.get(
        this.baseURL + 'counter/getRecord',
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

    //监听上传数据按钮
    async UploadData() {
      var that = this
      //清空列表
      this.updatelist = new Array()

      var selectionLength = this.$refs.multipleTable.selection.length
      var recordLength = this.recordlist.length
      //弹框询问是否想要提交
      const confirmResult = await this.$confirm(
        '此操作将提交修改信息, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消提交')
      }

      //没有查询数据
      if (recordLength == 0) {
        return this.$message.error('没有修改的数据')
      }
      //没有使用批量选择,则提交当前页面所有数据
      else if (selectionLength == 0) {
        console.log(recordLength)
        for (let index = 0; index < recordLength; index++) {
          this.updatelist.push({
            id: this.recordlist[index].id,
            material: this.recordlist[index].material,
            distance: this.recordlist[index].distance,
            price: this.recordlist[index].price,
            isFull: this.recordlist[index].isFull,
            additionalCount: this.recordlist[index].additionalCount,
          })
        }
      }
      //使用批量选择，则提交选中的所有数据
      else {
        console.log(selectionLength)
        for (let index = 0; index < selectionLength; index++) {
          this.updatelist.push({
            id: this.$refs.multipleTable.selection[index].id,
            material: this.$refs.multipleTable.selection[index].material,
            distance: this.$refs.multipleTable.selection[index].distance,
            price: this.$refs.multipleTable.selection[index].price,
            isFull: this.$refs.multipleTable.selection[index].isFull,
            additionalCount: this.$refs.multipleTable.selection[index]
              .additionalCount,
          })
        }
      }

      //发送请求
      const { data: res } = await this.$http.post(
        this.baseURL + 'counter/setRecord',
        this.updatelist
      )
      if (res.result.code !== '20000') {
        return that.$message.error('修改数据失败')
      }
      that.$message.success('修改数据成功')
    },
  },
}
</script>

<style lang="less" scoped>
</style>