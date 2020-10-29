<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        添加电脑
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
      <el-table-column label="编号" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="200px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.status === 0 ? '空闲' : '使用中' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" min-width="250px" align="center">
        <template slot-scope="{ row }">
          <span>{{
            row.createTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}')
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新日期" min-width="250px" align="center">
        <template slot-scope="{ row }">
          <span>{{
            row.updateTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}')
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" min-width="350px">
        <template slot-scope="{ row }">
          <el-row>
            <el-button
              size="mini"
              type="success"
              :disabled="row.status === 1"
              @click="handleUse(row.cid, row.number)"
            >
              使用
            </el-button>
            <el-button
              size="mini"
              type="primary"
              :disabled="row.status === 0"
              @click="handleUpdate(row.cid)"
            >
              归还
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(row.cid)">
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

    <el-dialog title="添加电脑" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="temp"
        :rules="rules"
        label-position="left"
        label-width="120px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="电脑编号" prop="number">
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

    <el-dialog title="新增使用" :visible.sync="dialogUseFormVisible">
      <el-form
        ref="dataForm"
        :model="record"
        :rules="rules"
        label-position="left"
        label-width="120px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="record.name" placeholder="请输入姓名" />
        </el-form-item>
        <!-- <el-form-item label="编号" prop="number">
          <el-input v-model="record.number" placeholder="请输入电脑编号" />
        </el-form-item> -->
        <el-form-item label="电话" prop="phone">
          <el-input v-model="record.phone" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="record.startTime"
            clearable
            style="width: 180px;"
            placeholder="开始时间"
            type="datetime"
            value-format="timestamp"
          />
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            v-model="record.endTime"
            clearable
            style="width: 180px;"
            placeholder="结束时间"
            type="datetime"
            value-format="timestamp"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUseFormVisible = false">
          放弃添加
        </el-button>
        <el-button type="primary" @click="useItem()">
          确认添加
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  computerList,
  addItem,
  deleteItem,
  // findItem,
  freeItem,
  addRecord
} from '@/api/reading'
import Pagination from '@/components/Pagination'

export default {
  name: 'Management',
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
      record: {
        name: null,
        number: null,
        phone: null,
        startTime: null,
        endTime: null
      },
      rules: {
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        number: [
          { required: true, message: '电脑编号不能为空', trigger: 'blur' }
        ],
        phone: [{ required: true, message: '电话不能为空', trigger: 'blur' }],
        startTime: [
          { required: true, message: '开始时间不能为空', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '结束时间不能为空', trigger: 'blur' }
        ]
      },
      dialogFormVisible: false,
      dialogUseFormVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      computerList(this.listQuery).then(response => {
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
          addItem(this.temp).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '添加电脑成功',
              type: 'success',
              duration: 2000
            })
            this.handleFilter()
          })
        }
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

    handleUse(cid, number) {
      this.resetTemp()
      this.record.cid = cid
      this.record.number = number
      this.dialogUseFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    useItem() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          addRecord(this.record).then(() => {
            this.handleFilter()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '使用成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },

    handleUpdate(cid) {
      freeItem({ cid: cid }).then(() => {
        this.$notify({
          title: '成功',
          message: '归还成功',
          type: 'success',
          duration: 2000
        })
        this.handleFilter()
      })
    },
    handleDelete(cid) {
      deleteItem({ cid: cid }).then(() => {
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
