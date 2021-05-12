<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/controller.png" width="60" height="60" alt="" />
        <span>矿车计数管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏菜单区域 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409BFF" router :default-active="$route.path">
          <!-- 一级菜单1 -->
          <el-submenu index="1">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-folder-add"></i>
              <!-- 文本 -->
              <span>计数展示</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item index="/auxfuelrecord">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-data-analysis"></i>
                <!-- 文本 -->
                <span>辅助车辆加油情况表</span>
              </template>
            </el-menu-item>

            <el-menu-item index="/macrecord">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-data-analysis"></i>
                <!-- 文本 -->
                <span>机械统计表</span>
              </template>
            </el-menu-item>

            <el-menu-item index="/diggerproduction">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-data-analysis"></i>
                <!-- 文本 -->
                <span>挖机生产情况表</span>
              </template>
            </el-menu-item>

            <el-menu-item index="/carfuel">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-data-analysis"></i>
                <!-- 文本 -->
                <span>车辆油量表</span>
              </template>
            </el-menu-item>

            <el-menu-item index="/carrecord">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-data-analysis"></i>
                <!-- 文本 -->
                <span>车辆统计表</span>
              </template>
            </el-menu-item>

          </el-submenu>

          <!-- 一级菜单2 -->
          <el-submenu index="2">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-folder-add"></i>
              <!-- 文本 -->
              <span>计数配置表</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item index="/diggerconfig">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-data-analysis"></i>
                <!-- 文本 -->
                <span>挖机配置表</span>
              </template>
            </el-menu-item>

            <el-menu-item index="/carconfig">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-data-analysis"></i>
                <!-- 文本 -->
                <span>车辆配置表</span>
              </template>
            </el-menu-item>

            <el-menu-item index="/auxmacconfig">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-data-analysis"></i>
                <!-- 文本 -->
                <span>辅助机械配置表</span>
              </template>
            </el-menu-item>

            <el-menu-item index="/rfidconfig">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-data-analysis"></i>
                <!-- 文本 -->
                <span>rfid与车号配置表</span>
              </template>
            </el-menu-item>

          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  /*
  data(){
    return {
      //左侧菜单数据
      menuList: []
    }
  },
  //获取左侧菜单权限
  created(){
    this.getMenuList()
  },
  */

  methods: {
    logout() {
      //window.sessionStorage.clear()
      this.$router.push('/login')
    },

    /*
    //获取所有菜单
    async getMenuList(){
      const {data:res}= await this.$http.get('menus')
      if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
      console.log(res)
    }
    */
  },
}
</script>


<style lang="less" scoped>
// 使用scoped，使样式只作用在当前组件中
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
  }
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #eaedf1;
}
</style>