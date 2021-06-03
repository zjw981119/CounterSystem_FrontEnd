<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>展示</el-breadcrumb-item>
      <el-breadcrumb-item>挖机生产情况表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="12">
        <!-- 日期时间选择器 -->
        <el-col :span="3">
          <el-date-picker v-model="dateValue" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-col>
        <el-col :span="3">
          <el-select v-model="this.diggerNo" placeholder="请选择挖机">
            <el-option v-for="item in diggerNoOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-col>
        <!-- 查询按钮 -->
        <el-col :span="2">
          <el-button icon="el-icon-search" type="primary" @click="getList">查询</el-button>
        </el-col>
        <!-- 添加按钮 -->
        <el-col :span="2">
          <el-button icon="el-icon-search" type="primary" @click="addDialogVisible = true">添加</el-button>
        </el-col>
        <!-- 修改按钮 -->
        <el-col :span="2">
          <el-button icon="el-icon-search" type="primary" @click="editData = true">上传</el-button>
        </el-col>
      </el-row>

      <!-- 配置列表区域 class="rule-input" -->
      <el-table :data="diggerProductionList" border stripe :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" height="520">
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

        <el-table-column label="车数" prop="ratio" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.num"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="倍率" prop="beilv" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.beilv"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="物料" prop="wuliao" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.wuliao"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="挖机单价" prop="wajidanjia" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.wajidanjia"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="计时时间" prop="jishishijian" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.jishishijian"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="计时单价" prop="jishidanjia" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.jishidanjia"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="装煤车数" prop="zhuangmeiche" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.zhuangmeiche"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="装煤单价" prop="zhuangmeidanjia" width='100px'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.zhuangmeidanjia"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="100px" fixed="right">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
<!--            <el-tooltip effect="dark" content="新增配置信息" placement="top" :enterable="false">-->
<!--              <el-button type="primary" icon="el-icon-edit" size="mini" @click="editDiggerProduction(scope.row)"></el-button>-->
<!--            </el-tooltip>-->
            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除配置信息" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeDiggerProductionById(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

    </el-card>
    <!-- 添加挖机生产情况的对话框 -->
    <el-dialog title="添加挖机生产信息" :visible.sync="addDialogVisible" width="30%" @close="addDialogVisible = false">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedDiggers" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="dig in optionDiggers" :label="dig" :key="dig">{{dig}}</el-checkbox>
      </el-checkbox-group>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDiggerProduction">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改挖机生产情况的对话框 -->
    <el-dialog title="修改挖机生产信息" :visible.sync="editDialogVisible" width="30%" @close="editDialogVisible = false">
      <el-form ref="editFormRef" :model="tempDiggerProduction" :rules="editFormRules" label-width="80px">
        <el-form-item label="车号" prop="carId">
          <el-input v-model="tempDiggerProduction.carId" ></el-input>
        </el-form-item>
        <el-form-item label="车型" prop="carType">
          <el-input v-model="tempDiggerProduction.carType"></el-input>
        </el-form-item>
        <el-form-item label="内部/外部" prop="type">
          <el-input v-model="tempDiggerProduction.type"></el-input>
        </el-form-item>
        <el-form-item label="车主" prop="ownerName">
          <el-input v-model="tempDiggerProduction.ownerName"></el-input>
        </el-form-item>
        <el-form-item label="车数" prop="num">
          <el-input v-model="tempDiggerProduction.num"></el-input>
        </el-form-item>
        <el-form-item label="倍率" prop="beilv">
          <el-input v-model="tempDiggerProduction.beilv"></el-input>
        </el-form-item>
        <el-form-item label="物料" prop="wuliao">
          <el-input v-model="tempDiggerProduction.wuliao"></el-input>
        </el-form-item>
        <el-form-item label="挖机单价" prop="wajidanjia">
          <el-input v-model="tempDiggerProduction.wajidanjia"></el-input>
        </el-form-item>
        <el-form-item label="计时时间" prop="jishishijian">
          <el-input v-model="tempDiggerProduction.jishishijian"></el-input>
        </el-form-item>
        <el-form-item label="计时单价" prop="jishidanjia">
          <el-input v-model="tempDiggerProduction.jishidanjia"></el-input>
        </el-form-item>
        <el-form-item label="装煤车数" prop="zhuangmeiche">
          <el-input v-model="tempDiggerProduction.zhuangmeiche"></el-input>
        </el-form-item>
        <el-form-item label="装煤单价" prop="zhuangmeidanjia">
          <el-input v-model="tempDiggerProduction.zhuangmeidanjia"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDiggerProduction">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  updateDiggerProduction,
  queryConditionalProduction, deleteDiggerProduction
} from '../../api/DiggerProduction'
import { queryConditionalConfig } from '../../api/DiggerConfig'
import { parseTime } from '../../utils/time-util'

export default {
  data(){
    return{
      //全选
      checkAll: false,
      //从挖机配置表里取出来的挖机号
      optionDiggers: [],
      //选中的挖机
      checkedDiggers: [],
      //全选标记
      isIndeterminate: true,
      //增加模态框
      addDialogVisible: false,
      //修改模态框
      editDialogVisible: false,
      //查询条件挖机号
      diggerNo: '',
      //从配置表里取出来的挖机列表
      diggerConfigList: [],
      //从挖机生产情况表里取出来的挖机生产情况表
      diggerProductionList: [],
      //查询条件日期
      dateValue: new Date(),
      //挖机生产情况json数据
      tempDiggerProduction: {
        id: '',
        date: '',
        carId: '',
        carType: '',
        type: '',
        ownerName: '',
        oilcarNum: '',
        oilL: '',
        oilTime: '',
        oilPrice: '',
        num: '',
        beilv: '',
        wuliao: '',
        wajidanjia: '',
        shijianxuanze: '',
        jishishijian: '',
        jishidanjia: '',
        zhuangmeiche: '',
        zhuangmeidanjia: '',
        yun: ''
      },
      //存放多条挖机生产情况json数据
      tempDiggerProductionArray: [],
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
      editFormRules: {
        carId: [
          { required: true, message: '请输入车号', trigger: 'blur' },
          // { validator: checkRfid, trigger: 'blur' },
          //{ min: 8, max: 8, message: 'rfid卡号为8位数字', trigger: 'blur' },
        ],
        // carnum: [
        //   { required: true, message: '请输入车号', trigger: 'blur' },
        //   //{ validator: checkCarnum, trigger: 'blur' },
        // ],
        // address: [
        //   { required: true, message: '请输入矿车地址', trigger: 'blur' },
        //   { min: 4, max: 8, message: '请输入合法的矿车地址', trigger: 'blur' },
        // ],
      },
    }
  },
  created() {
    this.getDiggerConfigList()
  },
  mounted() {
    this.getList()
  },
  methods:{
    //条件查询挖机配置表
    getDiggerConfigList() {
      queryConditionalConfig(this.$qs.stringify({date:parseTime(this.dateValue,"{y}-{m}-{d}")})).then(resp => {
        this.diggerConfigList=resp.data
        for (let i = 0; i < resp.data.length; i++) {
          this.optionDiggers.push(resp.data[i].carId)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    //条件查询挖机生产数据表
    getList(){
      queryConditionalProduction(this.$qs.stringify({date:parseTime(this.dateValue,"{y}-{m}-{d}"),diggerNo:this.diggerNo})).then(resp => {
        this.diggerProductionList=resp.data
      }).catch(error => {
        console.log(error)
      })
    },

    addDiggerProduction() {
      this.resetTempProduction()
      for (let i = 0; i < this.checkedDiggers.length; i++) {
        for (let j = 0; j < this.diggerConfigList.length; j++) {
          if(this.checkedDiggers[i]===this.diggerConfigList[i].carId){
            this.tempDiggerProduction.carId=this.diggerConfigList[i].carId
            this.tempDiggerProduction.carType=this.diggerConfigList[i].carType
            this.tempDiggerProduction.type=this.diggerConfigList[i].type
            this.tempDiggerProduction.ownerName=this.diggerConfigList[i].ownerName
            this.tempDiggerProduction.beilv=this.diggerConfigList[i].ratio
            this.tempDiggerProduction.date=parseTime(this.dateValue,"{y}-{m}-{d}")
            break
          }
        }
        this.diggerProductionList.push(this.tempDiggerProduction)
        //this.resetTempProduction()
      }
      this.addDialogVisible=false
      // addDiggerProduction(this.tempDiggerProductionArray).then(resp=>{
      //   this.getList()
      //   if (resp.result.code == '20000') {
      //     return this.$message.success('添加挖机生产信息成功')
      //   }
      //
      // }).catch(error=>{
      //   console.log(error)
      // })
    },
    async editData() {
      //清空列表
      var configLength = this.diggerProductionList.length
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
      if (this.diggerProductionList === 0) {
        return this.$message.error('不存在可以修改的数据')
      }

      //给每个对象的updateTime属性赋值
      for (let index = 0; index < configLength; index++) {
        this.diggerProductionList[index].date = parseTime(this.dateValue,"{y}-{m}-{d}")
      }
      //发送请求
      updateDiggerProduction(this.diggerProductionList).then(resp=>{
        this.getList()
        if (resp.result.code === '20000') {
          return this.$message.success('修改配置信息成功')
        }
      }).catch(error=>{
        console.log(error)
      })
    },
    async removeDiggerProductionById(config) {
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
        this.diggerProductionList.pop()
      } else {
        // 若存在id,则像后端发送请求，对数据库进行删除操作
        deleteDiggerProduction(config.id).then(resp=>{
          this.getList()
          if (resp.result.code == '20000') {
            return this.$message.success('删除配置信息成功')
          }
        }).catch(error =>{
          console.log(error)
        })
      }
    },
    //清空数据生产json数据
    resetTempProduction(){
      this.tempDiggerProduction={
        id: '',
        date: '',
          carId: '',
          carType: '',
          type: '',
          ownerName: '',
          oilcarNum: '',
          oilL: '',
          oilTime: '',
          oilPrice: '',
          num: '',
          beilv: '',
          wuliao: '',
          wajidanjia: '',
          shijianxuanze: '',
          jishishijian: '',
          jishidanjia: '',
          zhuangmeiche: '',
          zhuangmeidanjia: '',
          yun: ''
      }
    },
    handleCheckAllChange(val) {
      this.checkedDiggers = val ? this.optionDiggers : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.optionDiggers.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.optionDiggers.length;
    },
    //根据多选框的选择的挖机信息去查找配置表里取得的挖机的基本信息进行配置
    // addDigger() {
    //   this.resetTempProduction()
    //   this.tempDiggerProductionArray=[]
    //   for (let i = 0; i < this.checkedDiggers.length; i++) {
    //     for (let j = 0; j < this.diggerConfigList.length; j++) {
    //       if(this.checkedDiggers[i]===this.diggerConfigList[i].carId){
    //         this.tempDiggerProduction.carId=this.diggerConfigList[i].carId
    //         this.tempDiggerProduction.carType=this.diggerConfigList[i].carType
    //         this.tempDiggerProduction.type=this.diggerConfigList[i].type
    //         this.tempDiggerProduction.ownerName=this.diggerConfigList[i].ownerName
    //         this.tempDiggerProduction.beilv=this.diggerConfigList[i].ratio
    //         this.tempDiggerProduction.date=parseTime(this.dateValue,"{y}-{m}-{d}")
    //         break
    //       }
    //     }
    //     this.tempDiggerProductionArray.push(this.tempDiggerProduction)
    //     //this.resetTempProduction()
    //   }
    //   this.addDialogVisible=false
    //   addDiggerProduction(this.tempDiggerProductionArray).then(resp=>{
    //     this.getList()
    //     if (resp.result.code == '20000') {
    //       return this.$message.success('添加挖机生产信息成功')
    //     }
    //
    //   }).catch(error=>{
    //     console.log(error)
    //   })
    // },
    //监听上传数据按钮
    editDiggerProductionHandle(row){
      this.editDialogVisible=true
      console.log(row)
      this.tempDiggerProduction=Object.assign({},row)
    },
    editDiggerProduction(){
      this.$refs.editFormRef.validate((valid) => {
        if (valid) {
          updateDiggerProduction(this.tempDiggerProduction).then(resp=>{
            this.getList()
            if (resp.result.code == '20000') {
              return this.$message.success('修改挖机生产信息成功')
            }
          }).catch(error=>{
            console.log(error)
          })
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>

</style>
