<template>
  <div>
    

    <el-card class="box-card">
      <div slot="header" class="clearfix">
    <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>采购管理</el-breadcrumb-item>
          <el-breadcrumb-item>采购审批</el-breadcrumb-item>
        </el-breadcrumb>
        </div>
      <div class="text item has-gutter">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="申报人">
                  <span>{{ props.row.applier }}</span>
                </el-form-item>
                <el-form-item label="申请部门">
                  <span>{{ props.row.apartment }}</span>
                </el-form-item>
                <el-form-item label="申请日期">
                  <span>{{ props.row.applyTime }}</span>
                </el-form-item>
                <el-form-item label="用途描述">
                  <span>{{ props.row.description }}</span>
                </el-form-item>
                <el-form-item label="设备名称">
                  <span>{{ props.row.equipmentName }}</span>
                </el-form-item>
                <el-form-item label="设备编号">
                  <span>{{ props.row.equipmentId }}</span>
                </el-form-item>
                <el-form-item label="表单编号">
                  <span>{{ props.row.formId }}</span>
                </el-form-item>
                <el-form-item label="所需数目">
                  <span>{{ props.row.number }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="表单ID"
            prop="formId">
          </el-table-column>
          <el-table-column
            label="设备名称"
            prop="equipmentName">
          </el-table-column>
          <el-table-column
            label="申报人"
            prop="applier">
          </el-table-column>
          <!-- 操作按钮 -->
          <el-table-column
            fixed="right"
            label="审批"
            width="100">
            <template slot-scope="scope">
              <el-button  @click="handleClick(scope.row)" type="success" icon="el-icon-check" circle></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
          class="pagination"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="2"
          @current-change="page">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    const _this = this
    this.$axios.get('http://localhost:8181/purchaseform/findAll/1/2').then(function(resp) {
      console.log(resp)
       _this.tableData = resp.data.content
       _this.total = resp.data.totalElements
    })
  },
  data() {
    return {
      total: null,
      tableData: null
    }
  },
  methods: {
    page(currentPage) {
      const _this = this
      this.$axios.get('http://localhost:8181/purchaseform/findAll/'+currentPage+'/2').then(function(resp) {
        console.log(resp)
        _this.tableData = resp.data.content
        _this.total = resp.data.totalElements
      })
    },
    handleClick(row) {
      console.log(row)
      let equipment = {
        id: row.equipmentId,
        equipmentName: row.equipmentName,
        useTime: row.number,
        safeState: 'success',
        apartment: row.apartment,
        number: row.number
      }
      const _this = this
      this.$axios.put('http://localhost:8181/equipment/update/'+row.equipmentId,equipment).then(function(resp) {
        console.log('审批通过'+resp)
        // location.reload()
      })
      this.$axios.put('http://localhost:8181/purchaseform/update/',row).then(function(resp) {
        console.log(resp)
      })
    }
  }
}
</script>

<style scoped>

  .pagination{
      margin-top: 20px;
    }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
    height: 65vh;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
    box-shadow: 3px 3px 5px rgba(168, 164, 168, 0.829) !important;
  }

  .has-gutter {
    line-height: 10px;
  }

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #1e4d8f;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>