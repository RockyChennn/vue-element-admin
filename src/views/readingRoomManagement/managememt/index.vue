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
      <el-select
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
      </el-select>
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
              type="primary"
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
  computerList,
  addItem,
  deleteItem,
  // findItem,
  freeItem
} from '@/api/reading'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

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
        // eatDate: parseTime(new Date()),
        // menu: '',
        number: 0
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

    handleUpdate(cid) {
      freeItem(cid).then(() => {
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
      deleteItem(cid).then(() => {
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
