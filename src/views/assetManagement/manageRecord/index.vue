<template>
  <el-row class="panel-group" :gutter="40">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-all-devices">
          <svg-icon icon-class="list" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">所有设备</div>
          <count-to
            class="card-panel-num"
            :start-val="0"
            :end-val="allDevices"
            :duration="2600"
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
          <div class="card-panel-text">运行设备</div>
          <count-to
            class="card-panel-num"
            :start-val="0"
            :end-val="moveDevices"
            :duration="3000"
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
          <div class="card-panel-text">故障设备</div>
          <count-to
            class="card-panel-num"
            :start-val="0"
            :end-val="downDevices"
            :duration="3200"
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
          <div class="card-panel-text">维修设备</div>
          <count-to
            class="card-panel-num"
            :start-val="0"
            :end-val="maintainDevices"
            :duration="3600"
          />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { countInfo } from '@/api/asset'
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      allDevices: 0,
      moveDevices: 0,
      downDevices: 0,
      maintainDevices: 0
    }
  },
  created() {
    countInfo(this.listQuery).then(response => {
      this.allDevices = response.data.data.allDevices
      this.moveDevices = response.data.data.moveDevices
      this.downDevices = response.data.data.downDevices
      this.maintainDevices = response.data.data.maintainDevices
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
