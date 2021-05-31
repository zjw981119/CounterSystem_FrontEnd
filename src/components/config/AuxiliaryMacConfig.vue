<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>计数配置表</el-breadcrumb-item>
      <el-breadcrumb-item>辅助机械配置表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card>

      <!-- 日期选择与查询 -->
      <el-row :gutter="10">
        <!-- 日期选择 -->
        <el-col :span="5">
          <el-date-picker v-model="timevalue" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-col>
        <!-- 查询按钮 -->
        <el-col :span="2">
          <el-button icon="el-icon-search" type="primary" @click="getAuxMacConfig">查询</el-button>
        </el-col>
        <!-- 上传按钮 -->
        <el-col :span="2">
          <el-button type="primary" @click="UploadData">上传<i class="el-icon-upload el-icon--right"></i></el-button>
        </el-col>
      </el-row>
      <!-- 配置列表区域 class="rule-input" -->
      <el-table :data="configlist" border stripe :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" height="520">
        <el-table-column type="index" label="#" fixed="left"></el-table-column>
        <el-table-column label="辅助车号" prop="carId">
          <template slot-scope="scope">
            <el-input v-model="scope.row.carId"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="车型" prop="carType">
          <template slot-scope="scope">
            <el-input v-model="scope.row.carType"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="单价" prop="price">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip effect="dark" content="新增配置信息" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="medium" @click="addConfig"></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除配置信息" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="medium" @click="removeConfigById(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>

</template>

<script>
export default {
  data() {
    return {
      timevalue: '',
      configlist: [
        {
          carType: '',
          carId: '',
          price: '',
        },
      ],
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
    // 新增一条空的配置信息
    addConfig() {
      this.configlist.push({
        id: '',
        carType: '',
        carId: '',
        price: '',
      })
    },

    //获取配置信息请求
    async getAuxMacConfig() {
      var that = this
      const { data: res } = await this.$http.get(
        'http://localhost:8083/Server/AuxMachine/getConfig',
        {
          params: { timevalue: this.timevalue },
        }
      )
      if (res.result.code !== '20000') {
        return that.$message.error('获取配置表失败')
      }
      this.configlist = res.data
      //如果查询到0条数据，则添加一条空白数据
      if (this.configlist.length == 0) {
        this.addConfig()
      }
      console.log(res)
    },

    //根据id删除对应的配置信息
    async removeConfigById(config) {
      var that = this
      console.log(config.id)

      //弹框询问用户是否确认删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该配置信息, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)

      //如果用户确认删除，则返回值为字符串confirm
      //如果用户取消删除，则返回值为字符串cancel
      //console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }

      //如果是新增的空数据，则直接删除前端列表中的对象
      if (config.id == '') {
        this.configlist.pop()
      } else {
        //若存在id,则像后端发送请求，对数据库进行删除操作
        const { data: res } = await this.$http.get(
          'http://localhost:8083/Server/AuxMachine/delete?id=' + config.id
        )
        if (res.result.code !== '20000') {
          return that.$message.error('删除配置信息失败')
        }

        this.$message.success('删除配置信息成功')
        this.getAuxMacConfig()
      }
    },

    //监听上传数据按钮
    async UploadData() {
      var that = this
      //清空列表
      var configLength = this.configlist.length
      //弹框询问是否想要提交
      const confirmResult = await this.$confirm(
        '此操作将提交车辆配置信息, 是否继续?',
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

      //没有选择日期，不能上传
      if (this.timevalue == '' || this.timevalue == null) {
        return this.$message.error('必须选择日期')
      }
      //提交数据为0
      if (configLength == 0) {
        return this.$message.error('不存在可以修改的数据')
      }

      //给每个对象的updateTime属性赋值
      for (let index = 0; index < configLength; index++) {
        this.configlist[index].updateTime = this.timevalue
      }
      console.log(this.configlist)
      //发送请求
      const { data: res } = await this.$http.post(
        'http://localhost:8083/Server/AuxMachine/setConfig?timevalue=' +
          this.timevalue,
        this.configlist
      )
      if (res.result.code !== '20000') {
        return that.$message.error('修改数据失败')
      }
      that.$message.success('修改数据成功')
      this.getAuxMacConfig
    },
  },
}
</script>

<style lang="less" scoped>
</style>