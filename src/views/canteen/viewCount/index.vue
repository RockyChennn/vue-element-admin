<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="日期" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="人数" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.count }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { viewLatestWeek } from '@/api/canteen'

export default {
  name: 'ViewCount',
  components: {},
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      viewLatestWeek().then(response => {
        const {
          data: { data }
        } = response
        this.list = data.forEach(item => {
          item.date = item.date.split(' ')[0]
        })
        this.list = data
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    }
  }
}
</script>
