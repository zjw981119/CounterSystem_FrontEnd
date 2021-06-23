<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>计数配置表</el-breadcrumb-item>
      <el-breadcrumb-item>车辆配置表</el-breadcrumb-item>
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
          <el-button icon="el-icon-search" type="primary" @click="getCarConfig">查询</el-button>
        </el-col>
        <!-- 上传按钮 -->
        <el-col :span="2">
          <el-button type="primary" @click="UploadData">上传<i class="el-icon-upload el-icon--right"></i></el-button>
        </el-col>
      </el-row>
      <!-- 配置列表区域 class="rule-input" -->
      <el-table :data="configlist" border stripe :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" height="740">
        <el-table-column type="index" label="#" fixed="left"></el-table-column>

        <el-table-column label="车号" prop="carId" width="100px">
          <template slot-scope="scope">
            <el-select v-model="scope.row.carId">
              <el-option v-for="item in carNumOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column label="车型" prop="carType" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.carType"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="内部/外部" prop="type" width='100px'>
          <template slot-scope="scope">
            <el-select v-model="scope.row.type" placeholder="">
              <el-option v-for="item in placeOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column label="绑定挖机" prop="bindExcavator" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.bindExcavator"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="车主姓名" prop="ownerName" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.ownerName"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="油品单价" prop="oilPrice" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.oilPrice"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="方量(倍率)" prop="multiple" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.multiple"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="标箱量" prop="biaoxiang" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.biaoxiang"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="工资" prop="salary" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.salary"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="修理费" prop="maintenanceFee" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.maintenanceFee"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="伙食费" prop="mealFee" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.mealFee"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="配件费" prop="accessoryFee" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.accessoryFee"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="罚款" prop="penalty" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.penalty"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="奖金" prop="reward" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.reward"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="150px" fixed="right">
          <template slot-scope="scope">
            <!-- 添加按钮 -->
            <el-tooltip effect="dark" content="新增配置信息" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-plus" size="mini" @click="addConfig"></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除配置信息" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeConfigById(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
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

      configlist: [
        {
          carId: '',
          carType: '',
          type: '',
          bindExcavator: '',
          ownerName: '',
          oilPrice: '',
          multiple: '',
          biaoxiang: '',
          salary: '',
          maintenanceFee: '',
          mealFee: '',
          accessoryFee: '',
          penalty: '',
          reward: '',
        },
      ],

      //车号数组
      carNumSelection: [],

      //车号选择器
      carNumOptions: [],

      //物料选择器的数据
      placeOptions: [
        {
          value: '内部',
          label: '内部',
        },
        {
          value: '外部',
          label: '外部',
        },
      ],

      // 控制添加配置信息对话框的显示和隐藏
      addDialogVisible: false,
      // 添加配置信息的表单数据
      addForm: {
        rfid: '',
        carnum: '',
        address: '',
      },
    }
  },

  //自动获取当前日期的数据,并获取RFID配置表中全部车号
  created() {
    const date = new Date()
    const nowdate = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    }
    const newmonth = nowdate.month > 9 ? nowdate.month : '0' + nowdate.month
    const newday = nowdate.day > 9 ? nowdate.day : '0' + nowdate.day
    this.timevalue = nowdate.year + '-' + newmonth + '-' + newday
    //console.log(this.timevalue)
    //获取车辆配置信息
    this.getCarConfig()
    //获取RFID配置表中全部车号
    this.getCarNum()
  },

  methods: {
    // 新增一条空的配置信息
    addConfig() {
      this.configlist.push({
        id: '',
        carNum: '',
        carType: '',
        place: '',
        grabCar: '',
        ownerName: '',
        initPrice: '',
        volume: '',
        teu: '',
        salary: '',
        repairCost: '',
        foodCost: '',
        fittingsCost: '',
        fine: '',
        bonus: '',
        updateTime: '',
      })
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
          this.baseURL + 'Carconfig/delete?id=' + config.id
        )
        if (res.result.code !== '20000') {
          return that.$message.error('删除配置信息失败')
        }

        this.$message.success('删除配置信息成功')
        this.getCarConfig()
      }
    },

    //获取配置信息请求
    async getCarConfig() {
      var that = this
      const { data: res } = await this.$http.get(
        this.baseURL + 'Carconfig/getConfig',
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
      console.log(res.data)
    },

    //获取RFID配置表中的全部车号
    async getCarNum() {
      var that = this
      //清空选择器数据
      this.carNumOptions = new Array()
      const { data: res } = await this.$http.get(
        //this.baseURL + 'Carconfig/getCarNum',
        this.baseURL +'Carconfig/getCarNum',
        {
          params: { address: 'PANH' },
        }
      )
      if (res.result.code !== '20000') {
        return that.$message.error('获取车号配置信息失败')
      }
      this.carNumSelection = res.data
      console.log(this.carNumSelection)
      //车号选择器赋值
      this.carNumOptions.pop()
      for (let index = 0; index < this.carNumSelection.length; index++) {
        this.carNumOptions.push({
          value: this.carNumSelection[index],
          label: this.carNumSelection[index],
        })
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
        this.baseURL + 'Carconfig/setConfig?timevalue=' + this.timevalue,
        this.configlist
      )
      if (res.result.code !== '20000') {
        return that.$message.error('修改数据失败')
      }
      that.$message.success('修改数据成功')
      this.getCarConfig()
    },
  },
}
</script>

<style lang="less" scoped>
//去掉inpuut的边框
.rule-input ::v-deep {
  .el-input__inner {
    border: 0;
  }
}

//统一设置column宽度
.el-table-column {
  width: 100px;
}
</style>