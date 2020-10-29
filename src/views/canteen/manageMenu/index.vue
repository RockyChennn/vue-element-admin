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
      :key="mid"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="日期" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.eatDate | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间段" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{
            row.mperiod === 0 ? '早餐' : row.mperiod === 1 ? '午餐' : '晚餐'
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="菜单" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.menu }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100px"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button size="mini" type="danger" @click="handleDelete(row.mid)">
            删除
          </el-button>
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
        :rules="rules"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="时间段" prop="mperiod">
          <el-select
            v-model="temp.mperiod"
            class="filter-item"
            placeholder="请选择时间段"
          >
            <el-option
              v-for="item in mperiodType"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="eatDate">
          <el-date-picker
            v-model="temp.eatDate"
            type="date"
            placeholder="请选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="菜单" prop="menu">
          <el-input
            v-model="temp.menu"
            :autosize="{ minRows: 3, maxRows: 5 }"
            type="textarea"
            placeholder="请输入菜单内容"
          />
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
import { menuList, addMenu, deleteMenu } from '@/api/canteen'
import { parseTime } from '@/utils/index'
import Pagination from '@/components/Pagination'

export default {
  name: 'ManageMenu',
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
        pageSize: 20,
        fromToday: 0
      },
      queryType: [
        { label: '全部菜单', key: 0 },
        { label: '今后菜单', key: 1 }
      ],
      temp: {
        eatDate: parseTime(new Date()),
        menu: '',
        mperiod: ''
      },
      mperiodType: [
        { label: '早餐', key: 0 },
        { label: '午餐', key: 1 },
        { label: '晚餐', key: 2 }
      ],
      rules: {
        mperiod: [
          { required: true, message: '时间段不能为空', trigger: 'blur' }
        ],
        eatDate: [{ required: true, message: '日期不能为空', trigger: 'blur' }],
        menu: [{ required: true, message: '菜单内容不能为空', trigger: 'blur' }]
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
      menuList(this.listQuery).then(response => {
        const {
          data: {
            data: { list, total }
          }
        } = response
        this.list = list
        // this.listQuery.pageNum = pageNum
        // this.listQuery.pageSize = pageSize
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
        eatDate: parseTime(new Date()),
        menu: '',
        mperiod: 0
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
          addMenu(this.temp).then(() => {
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
    handleDelete(mid) {
      deleteMenu(mid).then(() => {
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
