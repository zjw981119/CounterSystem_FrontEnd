<template>
  <div>
    <el-container>
      <el-header style="text-align: center;background-color: #E9EEF3">
        <span>日期范围: </span>
        <el-date-picker
          v-model="listQuery.dateRange"
          type="datetimerange"
          style="margin-left: 10px"
          align="right"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
        <span>运输车号：</span>
        <el-select
          v-model="listQuery.carNo"
          placeholder="运输车号"
          clearable
          style="width: 200px"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        >
          <el-option
            v-for="item in transportCar_Options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button
          class="filter-item"
          style="margin-left: 10px"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter">
          查询
        </el-button>
      </el-header>
      <el-main>
        <el-table
          :key="tableKey"
          :data="list"
          border
          fit
          highlight-current-row
          style="width: 100%"
          id="table"
          max-height="800">
          <el-table-column label="序号" align="center" width="100">
            <template slot-scope="scope">
              <span> {{ scope.$index+(pageManage.currentPage - 1) * pageManage.size + 1 }} </span>
            </template>
          </el-table-column>
          <el-table-column label="记录id" width="150px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="运输车号" width="150px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.carNo }}</span>
            </template>
          </el-table-column>
          <el-table-column label="图片" width="150px" align="center">
            <template slot-scope="{ row }">
              <el-popover placement="right" trigger="hover" width="700">
                <el-image slot="reference" :src="img_url+ row.id"></el-image>
                <el-image :src="img_url+ row.id"></el-image>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="满载预判" width="150px" align="center">
            <template slot-scope="{ row }">
              <span v-if="row.isFull === -1">未判</span>
              <span v-else-if="row.isFull === -2">未知</span>
              <span v-else-if="row.isFull === -3">图片错误</span>
              <span v-else-if="row.isFull === 1">满载</span>
              <span v-else>未满</span>
            </template>
          </el-table-column>
          <el-table-column label="运输次序" width="150px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.degree }}</span>
            </template>
          </el-table-column>
          <el-table-column label="记录时的设备名称" width="150px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.address }}</span>
            </template>
          </el-table-column>
          <el-table-column label="记录时间" width="200px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.time }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <div>
        <pagination v-show="pageManage.total >0 " :total="pageManage.total" :page.sync="pageManage.currentPage" :limit.sync="pageManage.size" @pagination="paginationFunction" />
      </div>
    </el-container>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { fetchListOfflineRecord, fetchOptions } from '@/api/Count/offlineRecordQuery'

const axios = require('axios')
export default {
  name: 'index',
  components: { Pagination },
  data() {
    return {
      img_url: 'http://110.17.165.146:7080/GuangNaReceived/file/showImage/',
      pageManage: {
        total: null,
        size: 10,
        currentPage: 1
      },
      tableKey: 0,
      list: null,
      listQuery: {
        carNo: '',
        dateRange: new Date(),
        begintime: '',
        endtime: ''
      },
      transportCar_Options: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    }
  },
  created() {
    this.getList()
    this.getOptions()
  },
  methods: {
    paginationFunction(param) {
      this.pageManage.currentPage = param.page
      this.pageManage.size = param.limit
      this.getList()
    },
    handleFilter() {
      this.getList()
    },
    getOptions() {
      fetchOptions().then((response) => {
        // 车辆下拉框值
        for (const allCar of response.data.allCar) {
          const temp = {
            label: '',
            value: ''
          }
          temp.label = allCar
          temp.value = allCar
          this.transportCar_Options.push(temp)
        }
        console.log(this.transportCar_Options)
      })
    },
    getList() {
      if (this.listQuery.dateRange != null) {
        this.listQuery.begintime = this.listQuery.dateRange[0]
        this.listQuery.endtime = this.listQuery.dateRange[1]
      } else {
        this.listQuery.begintime = null
        this.listQuery.endtime = null
      }
      fetchListOfflineRecord(this.pageManage.currentPage, this.pageManage.size, this.listQuery).then((response) => {
        console.log(response)
        this.list = response.data.list
        this.pageManage.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
        }, 1.5 * 1000)
      })
    }
  }
}
</script>

<style scoped>

</style>
