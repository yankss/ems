<template>
  <div>
    

    <el-card class="box-card">
      <div slot="header" class="clearfix">
    <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>设备维修</el-breadcrumb-item>
          <el-breadcrumb-item>定期维护</el-breadcrumb-item>
        </el-breadcrumb>
        </div>
      <div class="text item has-gutter">
  ​      <el-table
          :data="tableData"
          border
          style="width: 100%">
          <!-- 设备编号 -->
          <el-table-column
            fixed
            prop="id"
            label="设备编号"
            width="80">
          </el-table-column>
          <!-- 设备名称 -->
          <el-table-column
            prop="equipmentName"
            label="设备名称"
            width="120">
          </el-table-column>
          <!-- 借用部门 -->
          <el-table-column
            prop="apartment"
            label="借用部门"
            width="120">
          </el-table-column>
          <!-- 使用时长 -->
          <el-table-column
            prop="useTime"
            label="使用时长"
            width="110">
          </el-table-column>
          <!-- 使用状态 -->
          <el-table-column
            prop="safeState"
            label="使用状态"
            width="120">
            <el-tag v-for="item in safeState" :type="item.safeState"></el-tag>
          </el-table-column>

          <!-- 查询信息 -->
          <el-table-column
            fixed="right"
            label="查询信息"
            width="120">
            <template slot-scope="scope">
                <el-button v-show="scope.row.messageFlage" plain @click="checkMessage(scope.row)" type="success" round>阅读</el-button>
            </template>
          </el-table-column>


          <!-- 维护 -->
          <el-table-column
            fixed="right"
            label="维护"
            width="120">
            <template slot-scope="scope">
              <el-button v-show="scope.row.mtaFlage" @click="maintainApply(scope.row)" type="text" size="small">申请</el-button>
              <el-button v-show="roleRight" @click="maintainApprove(scope.row)" type="primary" size="small" >批准</el-button>
            </template>
          </el-table-column>
          <!-- 检修 -->
          <el-table-column
            fixed="right"
            label="检修"
            width="120">
            <template slot-scope="scope">
              <el-button v-show="scope.row.serviceFlage" @click="serviceApply(scope.row)" type="text" size="small">申请</el-button>
              <el-button v-show="roleRight" type="primary" size="small" @click="servicApprove(scope.row)" >批准</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <!-- total为总页数， page-size为每页数据的数量 -->
        <el-pagination
        class="pagination"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="5"
          height="10px"
          @current-change="page">
        </el-pagination>
      </div>
      
    </el-card>
  </div>
</template>

<script>
export default {

  created() {
    this.roleRight = this.$store.state.useRight
    const _this = this
    this.$axios.get('http://localhost:8181/equipment/findAll/1/5').then(function(resp) {
      console.log(resp)
       _this.tableData = resp.data.content
       _this.total = resp.data.totalElements
       _this.stateList = resp.data.content
    })
  },

  data() {
    return {
      total: null,
      tableData: null,
      safeState:[],
      a: '!',
      roleRight:'',
    }
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    maintainApply(row) {
      console.log(row)
      this.$message('申请成功')
      row.mtaFlage = 0
      this.$axios.put('http://localhost:8181/equipment/update/maintainApply',row).then(function(resp) {
        console.log(resp)
      })
    },
    serviceApply(row) {
      console.log(row);
      this.$message('申请成功')
      row.serviceFlage = 0
      this.$axios.put('http://localhost:8181/equipment/update/maintainApply',row).then(function(resp) {
        console.log(resp)
      })
    },
    checkMessage(row) {
      row.messageFlage = 0
      row.mtaFlage = 1
      row.serviceFlage = 1
      const _this = this
      this.$axios.get('http://localhost:8181/equipment/findById/'+row.equipmentId).then(function(resp) {
        console.log(resp)
        if (resp.data.mtaFlage == 0 && resp.data.serviceFlage != 0) {
          _this.$notify({
            title: '维修结果',
            message: '当前设备已维修成功！',
            type: 'success'
          });
        } else if(resp.data.mtaFlage != 0 && resp.data.serviceFlage == 0){
          _this.$notify({
            title: '检修结果',
            message: `当前设备的使用状态为:`+resp.data.safeState+`!!!!!!!!!\n
            当前设备以及使用：`+resp.data.useTime+`天`,
            type: 'success'
          });
        } else if (resp.data.mtaFlage == 0 && resp.data.serviceFlage == 0) {
          _this.$notify({
            title: '检修与维修结果',
            message: `当前设备的使用状态为:`+resp.data.safeState+`!!!!!!!!!\n
            当前设备已经使用：`+resp.data.useTime+`天！！！！！！\n`+`当前设备已维修成功！`,
            type: 'success'
          });
        } else if (resp.data.mtaFlage != 0 && resp.data.serviceFlage != 0) {
          _this.$notify({
            title: '警告',
            message: `该设备并没有申请维护或检修，请确保是否已提交申请`,
            type: 'warning'
          });
        }
        // 存储数据到数据库
        _this.$axios.put('http://localhost:8181/equipment/update/maintainApply',row).then(function(resp) {
          console.log(resp)
        })
      })
    },
    page(currentPage) {
      const _this = this
      this.$axios.get('http://localhost:8181/equipment/findAll/'+currentPage+'/5').then(function(resp) {
        console.log(resp)
        _this.tableData = resp.data.content
        _this.total = resp.data.totalElements
      })
    },
    maintainApprove(row) {
      console.log(row)
      row.messageFlage = 1
      this.$axios.put('http://localhost:8181/equipment/update/maintainApply',row).then(function(resp) {
        console.log(resp)
      })
    },
    servicApprove(row) {
      console.log(row)
      row.messageFlage = 1
      this.$axios.put('http://localhost:8181/equipment/update/maintainApply',row).then(function(resp) {
        console.log(resp)
      })
    }
    
  }

}
</script>

<style scoped>

  .pagination {
    margin-top: 20px;
  }

  .el-table .warning-row {
    background: rgb(207, 81, 8);
  }

  .el-table .success-row {
    background: #3a9e04;
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

</style>