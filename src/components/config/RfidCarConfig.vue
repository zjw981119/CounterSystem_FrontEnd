<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>计数配置表</el-breadcrumb-item>
      <el-breadcrumb-item>rfid与车号配置表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入想要查询的rfid号" v-model="queryInfo.query" clearable @clear="getConfig">
            <el-button slot="append" icon="el-icon-search" @click="getConfig"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加</el-button>
        </el-col>
      </el-row>

      <!-- 配置列表区域 -->
      <el-table :data="configlist" border stripe :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" height="520">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="rfid号" prop="rfid" sortable></el-table-column>
        <el-table-column label="车号" prop="carNum" sortable></el-table-column>
        <el-table-column label="矿区地址" prop="address"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip effect="dark" content="修改配置信息" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.rfid,scope.row.carNum,scope.row.address)"></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除配置信息" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeConfigByRfid(scope.row.rfid)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 20, 40]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination> -->
    </el-card>

    <!-- 添加配置信息的对话框 -->
    <el-dialog title="添加配置信息" :visible.sync="addDialogVisible" width="30%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
        <!-- rfid卡号 -->
        <el-form-item label="rfid" prop="rfid">
          <el-input v-model="addForm.rfid"></el-input>
        </el-form-item>
        <!-- 车号 -->
        <el-form-item label="车号" prop="carnum">
          <el-input v-model="addForm.carnum"></el-input>
        </el-form-item>
        <!-- 地址 -->
        <el-form-item label="矿车地址" prop="address">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addConfig">确 定</el-button>
      </span>
    </el-dialog>

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
export default {
  data() {
    //验证rfid规则
    var checkRfid = (rule, value, cb) => {
      //验证rfid的正则表达式,必须用//包裹正则表达式
      const regRfid = /[1-9][0-9]{7}/

      if (regRfid.test(value)) {
        return cb()
      }

      cb(new Error('rfid卡号为8位数字'))
    }

    /*
    //验证车号规则
    var checkCarnum = (rule, value, cb) => {
      //验证rfid的正则表达式,必须用//包裹正则表达式
      const regRfid = /[A-Z]{2}[0-9]{3}/

      if (regRfid.test(value)) {
        return cb()
      }

      cb(new Error('车号为两位大写字母+三位数字组合'))
    }
*/
    return {
      //获取rfid配置表的参数对象
      queryInfo: {
        query: '',
        address: 'PANH',
        //当前页数
        //pagenum: 1,
        //每页数据条数
        //pagesize: 10,
      },
      total: 0,
      configlist: [],
      // 控制添加配置信息对话框的显示和隐藏
      addDialogVisible: false,
      // 添加配置信息的表单数据
      addForm: {
        rfid: '',
        carnum: '',
        address: '',
      },
      //添加表单的验证规则对象
      addFormRules: {
        rfid: [
          { required: true, message: '请输入rfid卡号', trigger: 'blur' },
          { validator: checkRfid, trigger: 'blur' },
          //{ min: 8, max: 8, message: 'rfid卡号为8位数字', trigger: 'blur' },
        ],
        carnum: [
          { required: true, message: '请输入车号', trigger: 'blur' },
          //{ validator: checkCarnum, trigger: 'blur' },
        ],
        address: [
          { required: true, message: '请输入矿车地址', trigger: 'blur' },
          { min: 4, max: 8, message: '请输入合法的矿车地址', trigger: 'blur' },
        ],
      },
      //修改对话框的显示与隐藏
      editDialogVisible: false,
      //查询到的配置信息
      editForm: {
        rfid: '',
        carnum: '',
        address: '',
      },
    }
  },

  created() {
    this.getConfig()
  },

  methods: {
    async getConfig() {
      var that = this
      const { data: res } = await this.$http.get(
        'http://localhost:8083/Server/Rfidshow/initConfig',
        {
          params: this.queryInfo,
        }
      )
      if (res.result.code !== '20000') {
        return that.$message.error('获取配置表失败')
      }
      this.configlist = res.data
      this.total = res.total
      console.log(res)
    },

    //监听添加配置信息对话框的关闭时间
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },

    //点击按钮，添加新的配置信息
    addConfig() {
      this.$refs.addFormRef.validate(async (valid) => {
        var that = this
        if (!valid) return
        //可以发起添加配置信息的网络请求
        const { data: res } = await this.$http.post(
          'http://localhost:8083/Server/Rfidshow/add',
          this.addForm
        )
        if (res.result.code !== '20000') {
          return that.$message.error('新增配置信息失败')
        }
        that.$message.success('添加配置信息成功')
        //隐藏对话框
        this.addDialogVisible = false
        //重新获取配置信息表
        this.getConfig()
      })
    },
    //展示编辑配置表的对话框
    showEditDialog(rfid, carNum, address) {
      this.editForm.rfid = rfid
      this.editForm.carnum = carNum
      this.editForm.address = address
      this.editDialogVisible = true
    },
    //监听修改对话框的关闭时间
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    //修改配置信息并提交
    editConfigInfo() {
      var that = this
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        //发起修改配置信息的数据请求
        const { data: res } = await this.$http.post(
          'http://localhost:8083/Server/Rfidshow/update',
          this.editForm
        )
        if (res.result.code !== '20000') {
          return that.$message.error('修改配置信息失败')
        }
        that.$message.success('修改配置信息成功')
        //隐藏对话框
        this.editDialogVisible = false
        //重新获取配置信息表
        this.getConfig()
      })
    },
    //根据rfid删除对应的配置信息
    async removeConfigByRfid(rfid) {
      var that = this
      //console.log(rfid)
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
      const { data: res } = await this.$http.get(
        'http://localhost:8083/Server/Rfidshow/delete?rfid=' + rfid
      )
      if (res.result.code !== '20000') {
        return that.$message.error('删除用户失败')
      }

      this.$message.success('删除配置信息成功')
      this.getConfig()
    },

    /*
    //监听pagesize改变的事件
    handleSizeChange(newSize) {
      //console.log(newSize)
      this.queryInfo.pagesize=newSize
      this.getConfig()
    },

    //监听页码改变的事件
    handleCurrentChange(newPage) {
      //console.log(newPage)
      this.queryInfo.pagenum=newPage
      this.getConfig()
    }, 
    */
  },
}
</script>


<style lang="less" scoped>
.el-card {
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15) !important ;
}
</style>