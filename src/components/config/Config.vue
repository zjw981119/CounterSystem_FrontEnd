<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>展示</el-breadcrumb-item>
      <el-breadcrumb-item>rfid与车号配置表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="search">
            <el-button slot="append" icon="el-icon-search" ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加</el-button>
        </el-col>
      </el-row>

      <!-- 配置列表区域 -->
      <el-table :data="configlist" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="rfid号" prop="rfid"></el-table-column>
        <el-table-column label="车号" prop="carNum"></el-table-column>
        <el-table-column label="矿区地址" prop="address"></el-table-column>
        <el-table-column label="操作" width="150">
          <template scope="{}"> 
              <!-- 修改按钮 -->
              <el-tooltip effect="dark" content="修改配置信息" placement="top" :enterable="false">
                <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
              </el-tooltip>
              <!-- 删除按钮 -->
              <el-tooltip effect="dark" content="删除配置信息" placement="top" :enterable="false">
                <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
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
      //获取rfid配置表的参数对象
      queryInfo: {
        address: 'GNXM',
      },      
      search:'',

      configlist: [],
    }
  },

  created() {
    this.getConfig()
  },

  methods: {
    async getConfig() {
      const { data: res } = await this.$http.get(
        'http://localhost:8081/Server/show/initConfig',
        {
          params: this.queryInfo,
        }
      )
      if (res.result.code !== '20000') {
        return this.$$message.error('获取配置表失败')
      }
      this.configlist = res.data
      console.log(res)
    },
  },
}
</script>

<style lang="less" scoped>
</style>