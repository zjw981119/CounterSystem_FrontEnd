<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>展示</el-breadcrumb-item>
      <el-breadcrumb-item>挖机配置表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <!-- 日期时间选择器 -->
        <el-col :span="8">
          <el-date-picker v-model="dateValue" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-col>
        <!-- 查询按钮 -->
        <el-col :span="4">
          <el-button icon="el-icon-search" type="primary" @click="getList">查询</el-button>
        </el-col>
      </el-row>

      <!-- 展示工作记录区域 -->
      <el-table ref="multipleTable" :data="recordlist" border stripe :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" height="460">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="车号" prop="carId"></el-table-column>
        <el-table-column label="车型" prop="carType"></el-table-column>
        <el-table-column label="内部/外部" prop="type"></el-table-column>
        <el-table-column label="车主姓名" prop="ownerName"></el-table-column>
        <el-table-column label="油品单价" prop="oilPrice"></el-table-column>
        <el-table-column label="维修费" prop="maintenanceFee"></el-table-column>
        <el-table-column label="饭费" prop="mealFee"></el-table-column>
        <el-table-column label="配件费" prop="accessoryFee"></el-table-column>
        <el-table-column label="罚款" prop="penalty"></el-table-column>
        <el-table-column label="奖金" prop="reward"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip effect="dark" content="修改配置信息" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)"></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除配置信息" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeConfigByRfid(scope.row.rfid)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>

      </el-table>


    </el-card>
    <!-- 修改配置信息的对话框 -->
    <el-dialog title="修改配置信息" :visible.sync="editDialogVisible" width="30%" @close="editDialogClosed">
      <el-form ref="editFormRef" :model="editForm" :rules="addFormRules" label-width="80px">
        <el-form-item label="rfid">
          <el-input v-model="editForm.rfid" disabled></el-input>
        </el-form-item>
        <el-form-item label="车号" prop="carnum">
          <el-input v-model="editForm.carnum"></el-input>
        </el-form-item>
        <el-form-item label="矿车地址" prop="address">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editConfigInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { queryConditional } from '../../api/DiggerConfig'
import { parseTime } from '../../utils/time-util'

export default {
  data(){
    return{
      recordlist: [],
      dateValue: new Date(),
      editDialogVisible: false,

    }
  },
  mounted() {
    this.getList()
  },
  methods:{
    getList(){
      queryConditional(this.$qs.stringify({date:parseTime(this.dateValue,"{y}-{m}-{d}")})).then(resp => {
        this.recordlist=resp.data
      }).catch(error => {
        console.log(error)
      })
    },
    editDialogClosed() {

    }


  }
}
</script>

<style lang="less" scoped>

</style>
