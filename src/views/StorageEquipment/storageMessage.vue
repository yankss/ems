<template>
  <div>
    

    <el-card class="box-card">
      <div slot="header" class="clearfix">
    <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>设备入库</el-breadcrumb-item>
          <el-breadcrumb-item>入库信息</el-breadcrumb-item>
        </el-breadcrumb>
        </div>
      <div class="text item has-gutter">
                  <div style="margin-top: 20px">
            <el-button @click="clearFilter">清除所有过滤器</el-button>
          </div>
          <el-table
            ref="filterTable"
            :data="tableFilterData"
            style="width: 100%">
            <!-- 表单编号 -->
            <el-table-column
              prop="formId"
              label="编号"
              width="180">
            </el-table-column>
            <!-- 日期 -->
            <el-table-column
              prop="applyTime"
              label="日期"
              sortable
              width="180"
              column-key="applyTime"
              >
            </el-table-column>
            <!-- 申请人 -->
            <el-table-column
              prop="applier"
              label="姓名"
              width="180">
            </el-table-column>
            <!-- 设备名称 -->
            <el-table-column
              prop="equipmentName"
              label="设备名称">
            </el-table-column>
            <!-- 部门标签 -->
            <el-table-column
              prop="apartment"
              label="部门"
              width="100"
              :filters="apartmentList"
              :filter-method="filterTag"
              filter-placement="bottom-end"
              :formatter="formatterApartment">
              <template slot-scope="scope">
                <el-tag
                  :type="'primary'"
                  disable-transitions>{{scope.row.apartment}}
                  </el-tag>
              </template>
            </el-table-column>

           
          </el-table>

        <!-- 分页 -->
        <el-pagination
          class="pagination"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="4"
          @current-change="page">>
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    const _this = this
      this.$axios.get('http://localhost:8181/purchaseform/findAll/1/4').then(function(resp) {
        console.log(resp)
        _this.tableData = resp.data.content
        _this.total = resp.data.totalElements

      })
  },
  data() {
    return {
      tableData: [],
      total: null,
      apartmentList: [{text: 'test', value: 'test'},
                      {text: 'ttt', value: 'ttt'},
                      {text: 'qqq', value: 'qqq'},
                      {text: 'eee', value: 'eee'},
                      {text: 'ooo', value: 'ooo'},
                      {text: '保卫处',value: '保卫处'}]
    }
  },
  computed: {
    tableFilterData: function() {
      console.log(this.tableData)
      return this.tableData.filter(item => item.isStorage == 1)
    }
  },
  methods: {
    page(currentPage) {
      const _this = this
      this.$axios.get('http://localhost:8181/purchaseform/findAll/'+currentPage+'/4').then(function(resp) {
        console.log(resp)
        _this.tableData = resp.data.content
        _this.total = resp.data.totalElements
      })
    },
    clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      filterTag(value, row) {
        return row.apartment === value;
      },
      formatterApartment(row) {
        console.log(row)
        let rowApartment = row.apartment
        if (rowApartment === 'test'){
          return 'test'
        }if (rowApartment === 'ttt'){
          return 'ttt'
        }
        if (rowApartment === 'qqq'){
          return 'qqq'
        }
        if (rowApartment === 'eee'){
          return 'eee'
        }
        if (rowApartment === 'ooo'){
          return 'ooo'
        }
        if (rowApartment === '保卫处'){
          return '保卫处'
        }
        
      },
  }
}
</script>

<style scoped>

  .pagination{
      margin-top: 20px;
    }
  .has-gutter {
    line-height: 10px;
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
</style>