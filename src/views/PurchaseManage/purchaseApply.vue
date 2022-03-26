<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
    <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>采购管理</el-breadcrumb-item>
          <el-breadcrumb-item>采购申请</el-breadcrumb-item>
        </el-breadcrumb>
        </div>
      <div class="text item">
        <div class="text item">
        <el-form :rules="rules" style="width: 60%" ref="purchaseForm" :model="purchaseForm" label-width="80px" size="small">
          <el-form-item label="申报人" prop="applier">
            <el-input v-model="purchaseForm.applier" ></el-input>
          </el-form-item>
          <el-form-item label="设备名称" prop="equipmentName">
            <el-input v-model="purchaseForm.equipmentName" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="设备编号" prop="equipmentId">
            <el-input v-model="purchaseForm.equipmentId" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="所需数目" prop="number">
            <el-input  
              v-model="purchaseForm.number" 
              size="mini">
            </el-input>
          </el-form-item>
          <el-form-item label="申请部门" prop="apartment">
            <el-select v-model="purchaseForm.apartment" placeholder="请选择所属部门">
              <el-option label="人力资源部" value="人力资源部"></el-option>
              <el-option label="技术部" value="技术部"></el-option>
              <el-option label="测试部门" value="测试部门"></el-option>
              <el-option label="行政部" value="行政部"></el-option>
              <el-option label="财务部" value="财务部"></el-option>
              <el-option label="保卫处" value="保卫处"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请时间" prop="applyTime">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="purchaseForm.applyTime" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="用途描述" prop="description">
            <el-input type="textarea" v-model="purchaseForm.description" placeholder="请描述一下设备的损坏原因"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('purchaseForm')">提交申请</el-button>
            <el-button @click="resetForm('purchaseForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
      return {
        purchaseForm: {
          applier: '',
          equipmentName: '',
          equipmentId: '',
          number: '',
          applyTime: '',
          apartment: '',
          description: ''
        },
        rules: {
          applier: [
            { required: true, message: '请输入申请人名字', trigger: 'blur' },
          ],
          equipmentName: [
            { required: true, message: '请输入报废设备', trigger: 'change' }
          ],
          applyTime: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          apartment: [
            { required: true, message: '请输入所属部门', trigger: 'blur' },
          ],
          equipmentId: [
            { required: true, message: '请输入设备编号', trigger: 'blur' },
          ]
      }
      }
    },
    methods: {
      submitForm(formName) {
      const _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.$axios.post('http://localhost:8181/purchaseform/save', _this.purchaseForm).then(function(resp) {
              console.log(resp)
              if(resp.data == 'success'){
                _this.$message({
                  message: '恭喜你，这是一条成功消息',
                  type: 'success'
                });
              }
            })
            
          } else {
            alert('error submit!!')
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      test() {
        console.log(this.purchaseForm)
      }
    }
}
</script>

<style scoped>


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