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
      <!-- <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button> -->
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
          <span>{{ row.mperiod === 0 ? '早餐' : row.mperiod === 1 ? '午餐' : '晚餐' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="菜单" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.menu }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="菜单" min-width="150px">
        <template slot-scope="{ row }">
          <span class="link-type" @click="handleUpdate(row)">{{
            row.title
          }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column :label="$t('table.author')" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column
        v-if="showReviewer"
        :label="$t('table.reviewer')"
        width="110px"
        align="center"
      >
        <template slot-scope="{ row }">
          <span style="color:red;">{{ row.reviewer }}</span>
        </template>
      </el-table-column>-->
      <!-- <el-table-column
        :label="$t('table.status')"
        class-name="status-col"
        width="100"
      >
        <template slot-scope="{ row }">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column> -->
      <el-table-column
        label="操作"
        width="100px"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <!-- <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button> -->
          <!-- <el-button
            v-if="row.status != 'published'"
            size="mini"
            type="success"
            @click="handleModifyStatus(row, 'published')"
          >
            {{ $t('table.publish') }}
          </el-button>
          <el-button
            v-if="row.status != 'draft'"
            size="mini"
            @click="handleModifyStatus(row, 'draft')"
          >
            {{ $t('table.draft') }}
          </el-button> -->
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
          >
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item :label="$t('table.type')" prop="type">
          <el-select
            v-model="temp.type"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.date')" prop="timestamp">
          <el-date-picker
            v-model="temp.timestamp"
            type="datetime"
            placeholder="Please pick a date"
          />
        </el-form-item>
        <el-form-item :label="$t('table.title')" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item :label="$t('table.status')">
          <el-select
            v-model="temp.status"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.importance')">
          <el-rate
            v-model="temp.importance"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :max="3"
            style="margin-top:8px;"
          />
        </el-form-item>
        <el-form-item :label="$t('table.remark')">
          <el-input
            v-model="temp.remark"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table
        :data="pvData"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{
          $t('table.confirm')
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { menuList, addMenu, deleteMenu } from '@/api/canteen'
import { menuList } from '@/api/canteen'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
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
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      queryType: [
        { label: '全部菜单', key: 0 },
        { label: '今后菜单', key: 1 }
      ],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        eatDate: new Date(),
        menu: '',
        mperiod: 0
      },
      mperiodType: [
        { label: '早餐', key: 0 },
        { label: '午餐', key: 1 },
        { label: '晚餐', key: 2 }
      ],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [
          { required: true, message: 'type is required', trigger: 'change' }
        ],
        timestamp: [
          {
            type: 'date',
            required: true,
            message: 'timestamp is required',
            trigger: 'change'
          }
        ],
        title: [
          { required: true, message: 'title is required', trigger: 'blur' }
        ]
      },
      downloadLoading: false
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
            data: { list, pageNum, pageSize, total }
          }
        } = response
        this.list = list
        this.listQuery.pageNum = pageNum
        this.listQuery.pageSize = pageSize
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
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          // createArticle(this.temp).then(() => {
          //   this.list.unshift(this.temp)
          //   this.dialogFormVisible = false
          //   this.$notify({
          //     title: '成功',
          //     message: '创建成功',
          //     type: 'success',
          //     duration: 2000
          //   })
          // })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          // updateArticle(tempData).then(() => {
          //   const index = this.list.findIndex(v => v.id === this.temp.id)
          //   this.list.splice(index, 1, this.temp)
          //   this.dialogFormVisible = false
          //   this.$notify({
          //     title: '成功',
          //     message: '更新成功',
          //     type: 'success',
          //     duration: 2000
          //   })
          // })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: '成功',
        message: '删除成功' + row.mid,
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    // handleDownload() {
    //   this.downloadLoading = true
    //   import('@/vendor/Export2Excel').then(excel => {
    //     const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
    //     const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
    //     const data = this.formatJson(filterVal)
    //     excel.export_json_to_excel({
    //       header: tHeader,
    //       data,
    //       filename: 'table-list'
    //     })
    //     this.downloadLoading = false
    //   })
    // },
    formatJson(filterVal) {
      return this.list.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    }
  }
}
</script>
