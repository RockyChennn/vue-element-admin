<template>
  <div class="app-container calendar-list-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
        >添加</el-button
      >
    </div>

    <!-- 查询结果 -->
    <el-table
      v-loading="listLoading"
      size="small"
      :data="list"
      element-loading-text="正在查询中。。。"
      border
      fit
      highlight-current-row
    >
      <!-- <el-table-column
        align="center"
        min-width="110px"
        label="邮件编号"
        prop="id"
        sortable
      /> -->

      <el-table-column label="邮箱地址" align="center" min-width="110px">
        <template slot-scope="{ row }">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="操作"
        width="180"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button
            type="danger"
            size="mini"
            @click="handleBeforeDelete(row.email)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 删除条目的询问操作 -->
    <el-dialog title="确认删除" :visible.sync="deleteItem">
      删除后不可恢复,确认删除？
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteItem = false">取消</el-button>
        <el-button type="primary" @click="handleDelete">确定</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="dataForm"
        status-icon
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="邮件地址" prop="email">
          <el-input v-model="dataForm.email" />
        </el-form-item>
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
import { listEmail, createEmail, deleteEmail } from '@/api/asset'

export default {
  name: 'Email',
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        id: '',
        email: ''
      },
      dataForm: {
        id: undefined,
        email: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      rules: {
        email: [
          { required: true, message: '邮件地址不能为空', trigger: 'blur' }
        ]
      },
      deleteItem: false,
      deleteTarget: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      listEmail(this.listQuery)
        .then(response => {
          this.list = response.data.data.list
          this.listLoading = false
        })
        .catch(() => {
          this.list = []
          this.listLoading = false
        })
    },

    resetForm() {
      this.dataForm = {
        email: ''
      }
    },

    handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          createEmail(this.dataForm).then(response => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }
      })
    },

    handleBeforeDelete(email) {
      this.deleteItem = true
      this.deleteTarget = email
    },

    handleDelete() {
      deleteEmail({ email: this.deleteTarget }).then(response => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.deleteItem = false
        this.getList()
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
