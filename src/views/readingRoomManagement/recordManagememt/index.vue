<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="searchQuery.number"
        placeholder="电脑编号"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="searchQuery.name"
        placeholder="姓名"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-date-picker
        v-model="searchQuery.startTime"
        clearable
        class="filter-item"
        style="width: 180px;"
        placeholder="开始时间"
        @keyup.enter.native="handleFilter"
        type="date"
      />
    </div>

    <el-table
      :key="rid"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="编号" min-width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.number || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" min-width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.name || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.phone || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份证" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.idNumber || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始使用时间" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.startTime | parseTime('{m}-{d} {h}:{m}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束使用时间" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.endTime | parseTime('{m}-{d} {h}:{m}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际结束时间" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.finishTime | parseTime('{m}-{d} {h}:{m}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提醒次数" min-width="80px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.remindTimes || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.createTime | parseTime('{m}-{d} {h}:{m}:{s}') }}</span>
        </template>
      </el-table-column>
      <!--
      <el-table-column label="更新时间" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.updateTime | parseTime('{m}-{d} {h}:{m}:{s}') }}</span>
        </template>
      </el-table-column> -->

      <el-table-column label="操作" align="center" min-width="150px">
        <template slot-scope="{ row }">
          <el-row>
            <el-button
              size="mini"
              type="primary"
              @click="handleCreate(row.cid)"
            >
              使用
            </el-button>
            <el-button
              size="mini"
              type="primary"
              :disabled="row.finishTime !== ''"
              @click="handleUpdate(row.rid)"
            >
              归还
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(row.rid)">
              删除
            </el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.pageNum"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />

    <el-dialog title="创建菜单" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="record"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="姓名">
          <el-input v-model="record.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="record.number" placeholder="请输入电脑编号" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="record.phone" placeholder="请输入电话" />
        </el-form-item>
        <el-date-picker
          v-model="record.startTime"
          clearable
          class="filter-item"
          style="width: 180px;"
          placeholder="开始时间"
          type="date"
        />
        <el-date-picker
          v-model="record.endTime"
          clearable
          class="filter-item"
          style="width: 180px;"
          placeholder="结束时间"
          type="date"
        />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          放弃添加
        </el-button>
        <el-button type="primary" @click="createData()">
          确认添加
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  recordList,
  addRecord,
  deleteRecord,
  updateRecord,
  searchRecord
} from '@/api/reading'
import Pagination from '@/components/Pagination'
import { parseTime } from '@/utils/index'

export default {
  name: 'RecordManagement',
  components: { Pagination },
  filters: {},
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 20
      },
      searchQuery: {
        pageNum: 1,
        pageSize: 20,
        number: null,
        name: null,
        startTime: null
      },
      record: {
        name: null,
        number: null,
        phone: null,
        startTime: null,
        endTime: null
      },
      dialogFormVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      recordList(this.listQuery).then(response => {
        const {
          data: {
            data: { list, total }
          }
        } = response
        this.list = list
        this.total = total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },

    handleFilter() {
      this.listQuery.pageNum = 1
      this.getList()
    },

    handleSearch() {
      this.searchQuery.pageNum = 1
      searchRecord(this.searchQuery).then(response => {
        const {
          data: {
            data: { list, total }
          }
        } = response
        this.list = list
        this.total = total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },

    resetTemp() {
      this.record = {
        cid: null,
        name: null,
        number: null,
        phone: null,
        startTime: null,
        endTime: null
      }
    },

    handleCreate(cid) {
      this.resetTemp()
      this.cid = cid
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          addRecord(this.record).then(() => {
            this.handleFilter()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },

    handleUpdate(rid) {
      const finishTime = parseTime('{y}-{m}-{d} {h}:{m}:{s}')
      const params = {
        rid,
        finishTime
      }
      updateRecord(params).then(() => {
        this.$notify({
          title: '成功',
          message: '归还成功',
          type: 'success',
          duration: 2000
        })
        this.handleFilter()
      })
    },

    handleDelete(rid) {
      deleteRecord({ rid: rid }).then(() => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.handleFilter()
      })
    }
  }
}
</script>
<style scoped>
.filter-item {
  margin-left: 10px;
}
</style>
