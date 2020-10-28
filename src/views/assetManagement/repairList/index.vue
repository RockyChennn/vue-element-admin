<template>
  <div class="app-container calendar-list-container">
    <!-- 查询结果 -->
    <el-table
      v-if="did != ''"
      size="small"
      :data="list"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        align="center"
        min-width="70px"
        label="设备编号"
        prop="id"
      />
      <!--    <el-table-column align="center" min-width="90px" label="设备名称" prop="deviceName">
      </el-table-column>
       <el-table-column align="center" min-width="140px" label="购置日期" prop="dateTime">
      </el-table-column> -->
      <el-table-column
        align="center"
        min-width="50px"
        label="对内造价"
        prop="price"
      />
      <el-table-column
        align="center"
        min-width="70px"
        label="存放地址"
        prop="address"
      />
      <el-table-column
        align="center"
        min-width="70px"
        label="责任人"
        prop="principal"
      />
      <el-table-column
        align="center"
        min-width="70px"
        label="资产类别"
        prop="category"
      />
    </el-table>

    <div class="filter-container" style="margin-top: 20px;">
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
        >故障申报
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      size="small"
      :data="repairList"
      element-loading-text="正在查询中。。。"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        align="center"
        min-width="45px"
        label="设备编号"
        prop="did"
      />
      <el-table-column
        align="center"
        min-width="90px"
        label="设备名称"
        prop="deviceName"
      />
      <el-table-column
        align="center"
        min-width="80px"
        label="申报时间"
        prop="declareTime"
      />
      <el-table-column
        align="center"
        min-width="90px"
        label="负责人"
        prop="principal"
      />
      <el-table-column
        align="center"
        min-width="85px"
        label="联系方式"
        prop="phone"
      />
      <el-table-column
        align="center"
        min-width="90px"
        label="问题描述"
        prop="troubleDescription"
      />

      <!-- <el-table-column
        align="center"
        width="100px"
        label="设备状态"
        prop="solved"
      >
        <template slot-scope="scope">
          {{ scope.row.solved === 0 ? '已修复' : '故障' }}
        </template>
      </el-table-column> -->
    </el-table>

    <!-- 分页 -->
    <div v-if="repairList" class="pagination-container">
      <el-pagination
        background
        :current-page="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        layout="total, prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 添加或修改对话框 -->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="100%"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="dataForm"
        status-icon
        label-position="left"
        label-width="100px"
        style="width: 300px; margin-left:50px;"
      >
        <el-form-item label="设备名称" prop="deviceName" />
        <el-input v-model="dataForm.deviceName" width="80%" />
        <el-form-item label="责任人" prop="principal" />
        <el-input v-model="dataForm.principal" />
        <el-form-item label="联系方式" prop="phoneNumber" />
        <el-input v-model="dataForm.phoneNumber" />
        <el-form-item label="故障描述" prop="troubleDescription" />
        <el-input v-model="dataForm.troubleDescription" />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          v-if="dialogStatus == 'create'"
          type="primary"
          @click="createData"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listRepair, createRepair } from '@/api/asset'
import { getToken } from '@/utils/auth' // getToken from cookie

export default {
  name: 'Repair',
  data() {
    return {
      list: null,
      repairList: null,
      total: null,
      listLoading: true,
      did: '',
      roles: '',
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        did: ''
      },
      dataForm: {
        did: '',
        deviceName: '',
        principal: '',
        phoneNumber: '',
        troubleDescription: '',
        solved: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      rules: {
        deviceName: [
          { required: true, message: '设备名称不能为空', trigger: 'blur' }
        ],
        principal: [
          { required: true, message: '责任人不能为空', trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, message: '电话不能为空', trigger: 'blur' }
        ],
        troubleDescription: [
          { required: false, message: '问题描述不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (this.$store.state.user.roles.length !== 0) {
      this.roles = this.$store.state.user.roles
    }
    const id = this.$route.query.did
    if (id == null) {
      this.did = ''
      this.listQuery.did = ''
      this.dataForm.did = ''
    } else {
      this.did = id
      this.listQuery.did = id
      this.dataForm.did = id
    }

    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      listRepair(this.listQuery)
        .then(response => {
          // this.list = response.data.data.device
          this.repairList = response.data.data.list
          this.total = response.data.data.total
          this.listLoading = false
        })
        .catch(() => {
          // this.list = []
          this.repairList = []
          this.total = 0
          this.listLoading = false
        })
    },

    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    },

    resetForm() {
      this.dataForm = {
        did: '',
        deviceName: '',
        principal: '',
        phoneNumber: '',
        troubleDescription: '',
        solved: '1'
      }
      this.dataForm.did = this.did
    },

    handleCreate() {
      // 判断是否登录
      if (getToken()) {
        if (this.did === '') {
          this.$notify({
            title: '提示',
            message: '请扫码后进行填报',
            type: 'warning',
            duration: 2000
          })
        } else {
          this.resetForm()
          this.dialogStatus = 'create'
          this.dialogFormVisible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        }
      } else {
        this.$router.replace('/login')
      }
    },

    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          createRepair(this.dataForm).then(response => {
            this.repair.unshift(response.data.data)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }
  }
}
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 200px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
}
</style>
