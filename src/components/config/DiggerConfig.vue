<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>展示</el-breadcrumb-item>
      <el-breadcrumb-item>挖机配置表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="10">
        <!-- 日期时间选择器 -->
        <el-col :span="5">
          <el-date-picker v-model="dateValue" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-col>
        <!-- 查询按钮 -->
        <el-col :span="2">
          <el-button icon="el-icon-search" type="primary" @click="getList">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button icon="el-icon-search" type="primary" @click="editData">确认全部更改</el-button>
        </el-col>
      </el-row>

      <!-- 配置列表区域 class="rule-input" -->
      <el-table :data="diggerConfigList" border stripe :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" height="520">
        <el-table-column type="index" label="#" fixed="left"></el-table-column>
        <el-table-column label="车号" prop="carNum" width="100px">
          <template slot-scope="scope">
            <el-input v-model="scope.row.carId"></el-input>
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
              <el-option v-for="item in PlaceOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column label="车主姓名" prop="ownerName" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.ownerName"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="倍率" prop="ratio" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.ratio"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="油品单价" prop="oilPrice" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.oilPrice"></el-input>
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
            <!-- 修改按钮 -->
            <el-tooltip effect="dark" content="新增配置信息" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="addConfig"></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除配置信息" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeConfigById(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 修改配置信息的对话框 -->
  </div>
</template>

<script>
import { queryConditionalConfig,delDiggerConfig,editDiggerConfig} from '../../api/DiggerConfig'
import { parseTime } from '../../utils/time-util'

export default {
  data(){
    return{
      diggerConfigList: [],
      dateValue: new Date(),
      editDialogVisible: false,
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
    }
  },
  mounted() {
    this.getList()
  },
  methods:{
    getList(){
      queryConditionalConfig(this.$qs.stringify({date:parseTime(this.dateValue,"{y}-{m}-{d}")})).then(resp => {
        this.diggerConfigList=resp.data
        if(this.diggerConfigList.length===0){
          this.addConfig()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    addConfig() {
      this.diggerConfigList.push({
        id: '',
        carId: '',
        carType: '',
        type: '',
        ownerName: '',
        ratio: '',
        oilPrice: '',
        salary: '',
        maintenanceFee: '',
        mealFee: '',
        accessoryFee: '',
        penalty: '',
        reward: '',
        date: '',
      })
    },
    //监听上传数据按钮
    async editData() {
      //清空列表
      var configLength = this.diggerConfigList.length
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
      if (this.dateValue === '' || this.dateValue == null) {
        return this.$message.error('必须选择日期')
      }
      //提交数据为0
      if (this.diggerConfigList === 0) {
        return this.$message.error('不存在可以修改的数据')
      }

      //给每个对象的updateTime属性赋值
      for (let index = 0; index < configLength; index++) {
        this.diggerConfigList[index].date = parseTime(this.dateValue,"{y}-{m}-{d}")
      }
      //发送请求
      editDiggerConfig(this.diggerConfigList).then(resp=>{
        this.getList()
        if (resp.result.code === '20000') {
          return this.$message.success('修改配置信息成功')
        }
      }).catch(error=>{
        console.log(error)
      })
    },

    async removeConfigById(config) {
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
        this.diggerConfigList.pop()
      } else {
        //若存在id,则像后端发送请求，对数据库进行删除操作
        delDiggerConfig(config.id).then(resp=>{
          this.getList()
          if (resp.result.code == '20000') {
            return this.$message.success('删除配置信息成功')
          }
        }).catch(error =>{
          console.log(error)
        })
      }
    },
  }
}
</script>

<style lang="less" scoped>

</style>
