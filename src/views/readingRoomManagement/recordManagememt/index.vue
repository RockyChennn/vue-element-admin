<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input
        v-model="listQuery.title"
        :placeholder="$t('table.title')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      /> -->
      <!-- <el-select
        v-model="listQuery.importance"
        :placeholder="$t('table.importance')"
        clearable
        style="width: 90px"
        class="filter-item"
      >
        <el-option
          v-for="item in importanceOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select> -->
      <!-- <el-select
        v-model="listQuery.type"
        :placeholder="$t('table.type')"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in calendarTypeOptions"
          :key="item.key"
          :label="item.display_name + '(' + item.key + ')'"
          :value="item.key"
        />
      </el-select> -->
      <!-- <el-select
        v-model="listQuery.fromToday"
        placeholder="查询类型"
        style="width: 140px; margin-right: 10px;"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in queryType"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select> -->
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        添加菜单
      </el-button>
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
          <span>{{ row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" min-width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份证" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.idNumber }}</span>
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
          <span>{{ row.remindTimes }}</span>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.createTime | parseTime('{m}-{d} {h}:{m}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.updateTime | parseTime('{m}-{d} {h}:{m}:{s}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" min-width="150px">
        <template slot-scope="{ row }">
          <el-row>
            <el-button
              size="mini"
              type="primary"
              @click="beforeOperate(true, row.rid)"
            >
              归还
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="beforeOperate(false, row.rid)"
            >
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

    <el-dialog
      :title="currentOperation === '归还' ? '确认归还' : '确认删除'"
      :visible.sync="operating"
    >
      {{ currentOperation }}操作不可逆，确认{{ currentOperation }}？
      <div slot="footer" class="dialog-footer">
        <el-button @click="operating = false">取消</el-button>
        <el-button type="primary" @click="operate()">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="创建菜单" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="编号">
          <el-input v-model="temp.number" placeholder="请输入电脑编号" />
        </el-form-item>
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
  // searchRecord
  updateRecord
} from '@/api/reading'
import Pagination from '@/components/Pagination'
import parseTime from '@/utils/index'

export default {
  name: 'RecordManagement',
  components: { Pagination },
  filters: {},
  data() {
    return {
      mid: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 20
      },
      temp: {
        number: 0
      },
      operating: false,
      currentOperation: '归还',
      targetRid: '',
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
    resetTemp() {
      this.temp = {
        number: null
      }
    },

    beforeOperate(isReturn, rid) {
      this.operating = true
      this.targetRid = rid
      if (isReturn) {
        this.currentOperation = '归还'
      } else {
        this.currentOperation = '删除'
      }
    },

    operate() {
      const { currentOperation, targetRid } = this
      if (currentOperation === '归还') {
        this.handleUpdate(targetRid)
      } else {
        this.handleDelete(targetRid)
      }
    },

    handleCreate() {
      this.resetTemp()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          addRecord(this.temp).then(() => {
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

    resetData() {
      this.operating = false
      this.targetRid = ''
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
        this.resetData()
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
        this.resetData()
        this.handleFilter()
      })
    }
  }
}
</script>
