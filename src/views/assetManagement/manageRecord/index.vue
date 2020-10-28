/* eslint-disable */
<template>
  <div class="app-container calendar-list-container">
    <el-row class="panel-group" :gutter="40">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-all-devices">
            <svg-icon icon-class="list" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">正常设备</div>
            <count-to
              class="card-panel-num"
              :start-val="0"
              :end-val="workDevices"
              :duration="2"
            />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-move-devices">
            <svg-icon icon-class="example" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">故障设备</div>
            <count-to
              class="card-panel-num"
              :start-val="0"
              :end-val="blockDevices"
              :duration="1"
            />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-down-devices">
            <svg-icon icon-class="eye" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">维修设备</div>
            <count-to
              class="card-panel-num"
              :start-val="0"
              :end-val="maintainDevices"
              :duration="1"
            />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-maintain-devices">
            <svg-icon icon-class="star" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">所有设备</div>
            <count-to
              class="card-panel-num"
              :start-val="0"
              :end-val="devicesCount"
              :duration="2"
            />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-divider />

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.did"
        clearable
        class="filter-item"
        style="width: 150px;"
        placeholder="请输入设备编号"
      />
      <el-input
        v-model="listQuery.deviceName"
        clearable
        class="filter-item"
        style="width: 150px;"
        placeholder="请输入类目名称"
      />
      <el-date-picker
        v-model="listQuery.dateTime"
        clearable
        class="filter-item"
        style="width: 180px;"
        placeholder="请选择起始日期"
        type="date"
      />
      <el-select
        v-model="listQuery.category"
        clearable
        class="filter-item"
        style="width: 150px;"
        placeholder="请选择资产类别"
      >
        <el-option label="固定资产" value="固定资产" />
        <el-option label="局控低值易耗品" value="局控低值易耗品" />
        <el-option label="低值易耗品" value="低值易耗品" />
      </el-select>
      <el-select
        v-model="listQuery.status"
        clearable
        class="filter-item"
        style="width: 150px;"
        placeholder="请选择设备状态"
      >
        <el-option label="正常" value="0" />
        <el-option label="故障" value="1" />
      </el-select>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
        >查找</el-button
      >
    </div>

    <div class="filter-container">
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
        >添加</el-button
      >
      <el-button
        class="filter-item"
        type="primary"
        :loading="downloadLoading"
        icon="el-icon-download"
        @click="handleDownload"
        >导出</el-button
      >
      <el-upload
        class="filter-item"
        action="https://hzrail.club:7443/device/upload"
        :limit="1"
        :auto-upload="true"
        accept=".xlsx,.xls"
        :on-success="handleSuccess"
        :on-error="handleError"
      >
        <el-button type="primary" :loading="uploadLoading"
          >上传<i class="el-icon-upload el-icon&#45;&#45;right"
        /></el-button>
      </el-upload>
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
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table
            v-loading="listLoading"
            size="small"
            :data="props.row.repair"
            element-loading-text="正在查询中。。。"
            border
            fit
            highlight-current-row
          >
            <el-table-column
              align="center"
              min-width="90px"
              label="维修编号"
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
              min-width="90px"
              label="维修时间"
              prop="dateTime"
            >
              <template slot-scope="scope">
                {{
                  scope.row.dateTime.substring(
                    0,
                    scope.row.dateTime.indexOf('T')
                  )
                }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              min-width="90px"
              label="负责人"
              prop="principal"
            />
            <el-table-column
              align="center"
              min-width="90px"
              label="电话"
              prop="phoneNumber"
            />
            <el-table-column
              align="center"
              min-width="90px"
              label="问题描述"
              prop="troubleDescription"
            />
            <el-table-column
              align="center"
              min-width="90px"
              label="是否修复"
              prop="solved"
            >
              <template slot-scope="scope">
                {{ scope.row.solved == 0 ? '修复' : '未修复' }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="操作"
              width="180"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button size="mini" @click="handleUpdateRepair(scope.row)"
                  >编辑</el-button
                >
                <!-- <el-button type="danger" size="mini"  @click="handleBeforeDelete(scope.row)">删除</el-button> -->
              </template>
            </el-table-column>
          </el-table>
          <div class="filter-container">
            <el-button
              class="filter-item"
              type="primary"
              icon="el-icon-edit"
              @click="handleCreateRepair(props.row.device.did)"
              >添加维修记录</el-button
            >
          </div>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        width="110px"
        label="设备编号"
        prop="device.did"
        sortable
      />

      <el-table-column
        align="center"
        min-width="90px"
        label="设备名称"
        prop="device.deviceName"
      />

      <el-table-column align="center" width="90px" label="二维码">
        <template slot-scope="scope">
          <el-button plain size="mini" @click="showQRcode(scope.row)"
            >查看</el-button
          >
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        width="90px"
        label="购置日期"
        prop="device.dateTime"
      >
        <template slot-scope="scope">
          {{
            scope.row.device.dateTime.substring(
              0,
              scope.row.device.dateTime.indexOf('T')
            )
          }}
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        width="80px"
        label="对内造价"
        prop="device.price"
      />

      <el-table-column
        align="center"
        min-width="80px"
        label="存放地址"
        prop="device.address"
      />

      <el-table-column
        align="center"
        min-width="80px"
        label="责任人"
        prop="device.principal"
      />

      <el-table-column
        align="center"
        width="110px"
        label="资产类别"
        prop="device.category"
      />

      <el-table-column
        align="center"
        width="100px"
        label="设备状态"
        prop="device.status"
      >
        <template slot-scope="scope">
          <el-tag
            :type="
              scope.row.device.status === 0
                ? 'success'
                : scope.row.device.status === 1
                ? 'danger'
                : 'warning'
            "
            >{{ scope.row.device.status === 0 ? '正常' : '故障' }}</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="操作"
        width="180"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="handleBeforeDelete(scope.row)"
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

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        background
        :current-page="listQuery.pageNum"
        :page-sizes="[10, 20]"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

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
        <!--  <el-form-item label="设备编号" prop="id">
          <el-input v-model="dataForm.id"></el-input>
        </el-form-item> -->
        <el-form-item label="设备名称" prop="deviceName">
          <el-input v-model="dataForm.deviceName" />
        </el-form-item>
        <!--  <el-form-item label="二维码链接" prop="qrcodePageLink">
          <el-input v-model="dataForm.qrcodePageLink"></el-input>
        </el-form-item> -->

        <el-form-item label="购置日期" prop="dateTime">
          <el-date-picker
            v-model="dataForm.dateTime"
            type="date"
            placeholder="购置日期"
          />
        </el-form-item>
        <el-form-item label="对内造价" prop="price">
          <el-input v-model="dataForm.price" />
        </el-form-item>
        <el-form-item label="存放地址" prop="address">
          <el-input v-model="dataForm.address" />
        </el-form-item>
        <el-form-item label="责任人" prop="principal">
          <el-input v-model="dataForm.principal" />
        </el-form-item>
        <el-form-item label="资产类别" prop="category">
          <el-select v-model="dataForm.category" placeholder="请选择">
            <el-option label="固定资产" value="固定资产" />
            <el-option label="局控低值易耗品" value="局控低值易耗品" />
            <el-option label="低值易耗品" value="低值易耗品" />
          </el-select>
        </el-form-item>
        <el-form-item label="设备状态" prop="status">
          <el-select v-model="dataForm.status">
            <el-option label="正常" value="0" />
            <el-option label="故障" value="1" />
            <!-- <el-option label="维修" value="2">
            </el-option> -->
          </el-select>
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
        <el-button v-else type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改【维修】对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="repairFormVisible">
      <el-form
        ref="repairForm"
        :rules="rules"
        :model="repairForm"
        status-icon
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <!--  <el-form-item label="设备名称" prop="deviceName">
          <el-input v-model="repairForm.deviceName"></el-input>
        </el-form-item> -->
        <el-form-item
          v-if="dialogStatus == 'create'"
          label="负责人"
          prop="price"
        >
          <el-input v-model="repairForm.principal" />
        </el-form-item>
        <el-form-item
          v-if="dialogStatus == 'create'"
          label="电话"
          prop="address"
        >
          <el-input v-model="repairForm.phoneNumber" />
        </el-form-item>
        <el-form-item
          v-if="dialogStatus == 'create'"
          label="问题描述"
          prop="principal"
        >
          <el-input v-model="repairForm.troubleDescription" />
        </el-form-item>
        <el-form-item label="是否修复" prop="solved">
          <el-select v-model="repairForm.solved">
            <el-option label="修复" value="0" />
            <el-option label="故障" value="1" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="repairFormVisible = false">取消</el-button>
        <el-button
          v-if="dialogStatus == 'create'"
          type="primary"
          @click="createRepairData"
          >确定</el-button
        >
        <el-button v-else type="primary" @click="updateRepairData"
          >确定</el-button
        >
      </div>
    </el-dialog>

    <!-- 展示二维码 -->
    <el-dialog :visible.sync="qrcodeVisible">
      <el-form
        id="printTest"
        ref="dataForm"
        :rules="rules"
        :model="dataForm"
        status-icon
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="设备编号" prop="did" style="margin-bottom: 5px;">
          <label v-model="dataForm.did">{{ dataForm.did }}</label>
        </el-form-item>
        <el-form-item
          label="设备名称"
          prop="deviceName"
          style="margin-bottom: 5px;"
        >
          <label v-model="dataForm.deviceName">{{ dataForm.deviceName }}</label>
        </el-form-item>
        <!--        <el-form-item label="购置日期" prop="dateTime">
          <label v-model="dataForm.dateTime">{{dataForm.dateTime.substring(0,dataForm.dateTime.indexOf("T"))}}</label>
        </el-form-item> -->
        <el-form-item
          label="责任人"
          prop="principal"
          style="margin-bottom: 5px;"
        >
          <label v-model="dataForm.principal">{{ dataForm.principal }}</label>
        </el-form-item>
        <el-form-item
          prop="principal"
          style="margin-left: -100px;margin-bottom: 5px;"
        >
          <el-image
            style="width: 200px; height: 200px"
            :src="imageUrl + dataForm.did + '.jpg'"
          />
        </el-form-item>
      </el-form>
      <div class="filter-container" style="margin-left: 45px;">
        <el-button
          v-print="'#printTest'"
          class="filter-item"
          type="primary"
          icon="el-icon-edit"
          >打印二维码</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  countInfo,
  listDevice,
  createDevice,
  updateDevice,
  deleteDevice,
  createRepair
} from '@/api/asset'
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      workDevices: 0,
      blockDevices: 0,
      maintainDevices: 0,
      devicesCount: 0,
      list: undefined,
      total: undefined,
      listLoading: true,
      imageUrl: 'http://qrcode.jqhu.top/images/',
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        did: '',
        deviceName: '',
        dateTime: '',
        category: '',
        status: undefined
      },
      dataForm: {
        did: '',
        deviceName: '',
        qrcodePageLink: '',
        dateTime: '',
        price: undefined,
        address: '',
        principal: '',
        category: '',
        status: ''
      },
      repairForm: {
        did: undefined,
        deviceName: '',
        deviceId: '',
        dateTime: '',
        principal: '',
        phoneNumber: '',
        troubleDescription: '',
        solved: ''
      },
      dialogFormVisible: false,
      repairFormVisible: false,
      qrcodeVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      deleteItem: false,
      rules: {
        name: [{ required: true, message: '类目名称不能为空', trigger: 'blur' }]
      },
      downloadLoading: false,
      uploadLoading: false
    }
  },
  created() {
    countInfo().then(response => {
      this.workDevices = response.data.data[0].count
      this.blockDevices = response.data.data[1].count
      this.maintainDevices = response.data.data[2].count
      this.devicesCount = response.data.data[3].count
    })
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      listDevice(this.listQuery)
        .then(response => {
          this.list = response.data.data.items
          this.total = response.data.data.total
          this.listLoading = false
        })
        .catch(() => {
          this.list = []
          this.total = 0
          this.listLoading = false
        })
    },
    handleFilter() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    },
    resetForm() {
      this.dataForm = {
        did: '',
        deviceName: '',
        qrcodePageLink: '',
        dateTime: '',
        price: undefined,
        address: '',
        principal: '',
        category: '',
        status: undefined
      }
    },
    resetRepairForm(deviceId) {
      this.repairForm = {
        did: undefined,
        deviceName: '',
        deviceId: deviceId,
        dateTime: '',
        principal: '',
        phoneNumber: '',
        troubleDescription: '',
        solved: ''
      }
    },
    showQRcode(row) {
      this.dataForm = Object.assign({}, row.device)
      this.qrcodeVisible = true
    },
    handleCreate() {
      this.resetForm()
      // 设置默认值
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleCreateRepair(deviceId) {
      this.resetRepairForm(deviceId)
      // 设置默认值
      this.dialogStatus = 'create'
      this.repairFormVisible = true
      this.$nextTick(() => {
        this.$refs['repairForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          createDevice(this.dataForm).then(response => {
            const newList = {}
            newList.device = response.data.data
            newList.repair = []
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
    createRepairData() {
      this.$refs['repairForm'].validate(valid => {
        if (valid) {
          createRepair(this.repairForm).then(response => {
            for (const v of this.list) {
              if (v.repair.did === this.repairForm.did) {
                const index = this.list.indexOf(v)
                this.list[index].repair.unshift(response.data.data)
                break
              }
            }
            // this.list.repair.unshift(response.data.data)
            this.repairFormVisible = false
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
    handleUpdate(row) {
      this.dataForm = Object.assign({}, row.device)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdateRepair(repair) {
      this.repairForm = Object.assign({}, repair)
      this.dialogStatus = 'update'
      this.repairFormVisible = true
      this.$nextTick(() => {
        this.$refs['repairForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          updateDevice(this.dataForm).then(response => {
            for (const v of this.list) {
              if (v.device.did === response.data.data.did) {
                const index = this.list.indexOf(v)
                this.list[index].device = response.data.data
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    updateRepairData() {
      this.$refs['repairForm'].validate(valid => {
        if (valid) {
          createRepair(this.repairForm).then(response => {
            this.repairFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleBeforeDelete(row) {
      this.deleteItem = true
      this.delteRow = row
    },
    handleDelete(row) {
      this.dataForm = Object.assign({}, this.delteRow.device)
      const data = {
        deviceId: this.dataForm.did
      }
      deleteDevice(data).then(response => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.deleteItem = false
        const index = this.list.indexOf(this.delteRow)
        this.list.splice(index, 1)
      })
    },
    handleSuccess(response, file, fileList) {
      if (response.code === 200) {
        this.$notify({
          title: '成功',
          message: '上传成功',
          type: 'success',
          duration: 2000
        })
      } else {
        this.$notify({
          title: '错误',
          message: response.message,
          type: 'error',
          duration: 2000
        })
      }
    },
    handleError() {
      this.$notify({
        title: '错误',
        message: '上传失败，请重新上传',
        type: 'error',
        duration: 2000
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [
          '设备编号',
          '设备名称',
          '二维码链接',
          '购置日期',
          '对内造价',
          '存放地址',
          '责任人',
          '资产类别',
          '设备状态'
        ]
        const filterVal = [
          'did',
          'deviceName',
          'qrcodePageLink',
          'dateTime',
          'price',
          'address',
          'principal',
          'category',
          'status'
        ]
        listDevice().then(response => {
          const allList = response.data.data
          excel.export_json_to_excel2(tHeader, allList, filterVal, '设备列表')
          this.downloadLoading = false
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.filter-item {
  margin-left: 10px;
}

.panel-group {
  margin-top: 18px;

  .card-panel-col {
    // margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border: 2px solid rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-all-devices {
        background: #f4516c;
      }
      .icon-move-devices {
        background: #36a3f7;
      }
      .icon-down-devices {
        background: #40c9c6;
      }
      .icon-maintain-devices {
        background: #34bfa3;
      }
    }
    .icon-all-devices {
      color: #40c9c6;
    }
    .icon-move-devices {
      color: #36a3f7;
    }
    .icon-down-devices {
      color: #f4516c;
    }
    .icon-maintain-devices {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
