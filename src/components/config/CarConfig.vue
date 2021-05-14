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
          <el-button icon="el-icon-search" type="primary">查询</el-button>
        </el-col>
        <!-- 上传按钮 -->
        <el-col :span="2">
          <el-button type="primary" @click="UploadData">上传<i class="el-icon-upload el-icon--right"></i></el-button>
        </el-col>
      </el-row>
      <!-- 配置列表区域 class="rule-input" -->
      <el-table :data="configlist" border stripe :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" height="520">
        <el-table-column type="index" label="#" fixed="left"></el-table-column>
        <el-table-column label="车号" prop="carNum" width="100px">
          <template slot-scope="scope">
            <el-input v-model="scope.row.carNum"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="车型" prop="carType" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.carType"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="内部/外部" prop="place" width='100px'>
          <template slot-scope="scope">
            <el-select v-model="scope.row.place" placeholder="">
              <el-option v-for="item in PlaceOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column label="绑定挖机" prop="grabCar" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.grabCar"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="车主姓名" prop="ownerName" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.ownerName"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="油品单价" prop="initPrice" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.initPrice"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="方量(倍率)" prop="volume" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.volume"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="标箱量" prop="teu" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.teu"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="工资" prop="salary" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.salary"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="修理费" prop="repairCost" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.repairCost"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="伙食费" prop="foodCost" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.foodCost"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="配件费" prop="fittingsCost" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.fittingsCost"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="罚款" prop="fine" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.fine"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="奖金" prop="bonus" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.bonus"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="150px" fixed="right">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip effect="dark" content="新增配置信息" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="addConfig"></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除配置信息" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeConfigById(scope.row.id)"></el-button>
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
        },
      ],

      //物料选择器的数据
      PlaceOptions: [
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

  methods: {
    // 新增一条空的配置信息
    addConfig() {
      this.configlist.push({
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
    removeConfigById(id) {
      console.log(id)
    },

    //监听上传数据按钮
    async UploadData() {
      var that = this
      //清空列表
      var configLength = this.configlist.length
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

      //没有选择日期，不能上传
      if (this.timevalue == '') {
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
        'http://localhost:8083/Server/Carconfig/setConfig?timevalue=' +
          this.timevalue,
        this.configlist
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