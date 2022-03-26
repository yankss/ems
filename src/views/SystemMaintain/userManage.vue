<template>
  <div>
    

    <el-card class="box-card">
      <div slot="header" class="clearfix">
    <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>系统维护</el-breadcrumb-item>
          <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        </el-breadcrumb>
        </div>
      <div class="text item has-gutter">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="工号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="username"
            label="工人名字"
            width="180">
          </el-table-column>
          <el-table-column
            prop="apartment"
            label="所属部门"
            width="180">
          </el-table-column>

          <el-table-column
            prop="identity"
            label="身份"
            width="180">

          </el-table-column>
          
          <el-table-column  label="权限开启">
            <template slot-scope="scope">
              <!-- 给element组件添加点击事件的时候，
                    如果无效，则需要在@click后加上.native -->
              <el-switch
                v-model="scope.row.useRight"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
                @change="rightControl(scope.row)"
                @click="hhhh(scope,row)">
              </el-switch>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
          class="pagination"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="5"
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
    this.$axios.get('http://localhost:8181/user/findAll/1/5').then(function(resp) {
      
        _this.tableData = resp.data.content
        _this.total = resp.data.totalElements
        console.log(resp)
    })
  },
  data() {
    return {
      total: null,
      tableData: null,
      value: ['使用者','管理者'],
      options:[],
    }
  },
  methods:{
    rightControl(rrr) {
      console.log(rrr)
      this.$axios.put('http://localhost:8181/user/update/',rrr).then(function(resp) {
        console.log(resp)
      }) 
    },
    hhh(row) {
      console.log(row)
      this.$axios.put('http://localhost:8181/user/update/',row).then(function(resp) {
        console.log(resp)
      })
    },
    page(currentPage) {
      const _this = this
      this.$axios.get('http://localhost:8181/user/findAll/'+currentPage+'/2').then(function(resp) {
        console.log(resp)
        _this.tableData = resp.data.content
        _this.total = resp.data.totalElements
      })
    }
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