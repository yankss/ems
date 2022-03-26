<template>
  <div id="total">
    <div class="box">
      <h1>公司设备管理系统</h1>
      <el-form :model="loginForm" status-icon  ref="loginForm" label-width="50px" class="demo-ruleForm main">
          
          <el-form-item class="itemLabel" label="账号" prop="username">
            <el-input class="itemLabel" style="width: 60%" v-model="loginForm.username" size="mini"></el-input>
          </el-form-item>
          
          <el-form-item class="itemLabel" label="密码" prop="password">
            <el-input class="itemLabel" style="width: 60%" size="mini" type="password" v-model="loginForm.password" autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item>
            <el-button id="loginbtn" type="primary" @click="submitForm('loginForm')">登录</el-button>
            <el-button id="resetbtn" @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      
  
    </div>
  </div>
  
</template>

<script>
export default {
 data() {
      return {
        loginForm: {
          username: '',
          password: '',
          checkPass: '',
          token: ''
        },
        
      };
    },
    methods: {
      submitForm(loginForm) {
        this.$refs[loginForm].validate((valid) => {
          if (valid) {
            const _this = this
            this.$axios.get('http://localhost:8181/user/findAll').then(function(resp) {
              resp.data.forEach(function(item) {
                // 检测是否有该账号
                if (_this.loginForm.username == item.username) {
                  if (_this.loginForm.password == item.password) {
                    console.log(item)
                    _this.$axios.put('http://localhost:8181/user/addToken/',item).then(function(resp) {
                      console.log(resp)
                    })
                    // 如果有，则把该账号的权限值存储起来
                    setTimeout(() => {
                      _this.$axios.get('http://localhost:8181/user/findById/'+item.id).then(function(resp2) {
                        _this.$store.commit('setRight', resp2.data.useRight)
                        sessionStorage.setItem('token',resp2.data.token)
                      })
                    }, 200);
                    // window.sessionStorage.setItem('token',token)
                    
                    setTimeout(() => {
                      _this.$router.push('/welcome')
                      _this.$message.success('登录成功')
                    }, 1000);
                  }
                }
              })
            })
          } else {
            return false;
          }
        })
        
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}




</script>

<style scoped>
@import "../../util/resetElementui.css";
  html, body {
    width: 100%;
    height: 100%;
    overflow: scroll;
    color: #e5eef0;
  }
  
 
  .itemLabel {
    color: #00E6F6;
  }
  
  

  html::-webkit-scrollbar, body::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  #total {
    width: 100%;
    height: 100%;
    background-size: cover;
    line-height: 10px;
    display: block;
    background: url("../../assets/total4.jpg")
  }

  .box {
    width: 400px;
    height: 400px;
    position: absolute;
    margin-left: 60vh;
    margin-top: 20vh;
    box-shadow: 0px 0px 20px rgb(18, 18, 19);
  }

  .box h1 {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    color: #e5eef0;
  }

  .main {
    margin-top: 100px;
    width: 400px;
    height: 400px;
    position: relative;
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    background: inherit;
    border-radius: 18px;
    overflow: hidden;
    z-index: 100;
  }

  .main::before {
    width: calc(100% + 20px);
    height: calc(100% + 20px);
    background: inherit;
    box-shadow: inset 0 0  0.4
    rgba(143, 63, 63, 0.25);
    position: absolute;
    top: -10px;
    left: -10px;
    overflow: hidden;
    z-index: -1;
  }
  

  #resetbtn {
    width: 100px;
    font-size: 16px;
    font-family: 'Bebas Neue', cursive;
    background-color: rgba(57, 88, 69, 0.4);
    color: rgb(241, 234, 234);
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: 0.8s;
  }

  #resetbtn:hover {
    background-color: rgba(12,80,38,0.67);
  }

  #resetbtn::before, #resetbtn::after {
    content: "";
    display: block;
    width: 100px;
    height: 100%;
    background: rgba(179, 255, 210, 0.5);
    opacity: 0.5;
    position: absolute;
    left: 0;
    top: 0;
    transform: skewX(-15deg);
    filter: blur(30px);
    overflow: hidden;
    transform: translateX(-100px);
  }

  #resetbtn::after {
    width: 50px;
    background: rgba(179, 255, 210, 0.3);
    left: 60px;
    filter: blur(5px);
    opacity: 0;
  }

  #resetbtn::before {
    transition: 2s;
    transform: translateX(320px);
    opacity: 0.7;
  }

  #resetbtn::placeholder {
    color: #3d5245;
  }

  #resetbtn:hover::after {
    transition: 2s;
    transform: translateX(320px);
    opacity: 1;
  }


  #loginbtn, #loginbtn::after {
    width: 100px;
    font-size: 16px;
    font-family: 'Bebas Neue', cursive;
    background: linear-gradient(45deg, transparent 5%,
    #136983 5%);
    border: 0;
    color: rgb(241, 234, 234);
    letter-spacing: 3px;
    /* box-shadow: 6px 0px 0px #00E6F6; */
    outline: transparent;
    position: relative;
  }

  #loginbtn::after {
    --slice-0: inset(50% 50% 50% 50% );
    --slice-1: inset(80% -6px 0 0 );
    --slice-2: inset(50% -6px 30% 0 );
    --slice-3: inset(10% -6px 85% 0 );
    --slice-4: inset(40% -6px 43% 0 );
    --slice-5: inset(80% -6px 5% 0 );
    content: '登录';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 3%,
    #00E6F6 3%, #00E6F6 5%, #5b92e493 5%);
    text-shadow: -3px -3px 0px #F8F005, 3px 3px 0px #00E6F6;
    clip-path: var(--slice-0);
  }

  #loginbtn:hover::after {
    animation: 1s glitch;
    animation-timing-function: steps(.3, end);
  }

  @keyframes glitch {
  0% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 10px);
  }
  10% {
    clip-path: var(--slice-2);
    transform: translate(-5px, 0px);
  }
  20% {
    clip-path: var(--slice-3);
    transform: translate(-20px, 5px);
  }
  30% {
    clip-path: var(--slice-4);
    transform: translate(10px, -10px);
  }
  40% {
    clip-path: var(--slice-1);
    transform: translate(-5x, 10px);
  }
  50% {
    clip-path: var(--slice-3);
    transform: translate(-10px, -5px);
  }
  60% {
    clip-path: var(--slice-2);
    transform: translate(10px, 10px);
  }
  70% {
    clip-path: var(--slice-4);
    transform: translate(-10px, -10px);
  }
  80% {
    clip-path: var(--slice-1);
    transform: translate(0px, -10px);
  }
  90% {
    clip-path: var(--slice-3);
    transform: translate(-10px, 0px);
  }
  100% {
    clip-path: var(--slice-2);
    transform: translate(-5px, 5px);
  }
  }
</style>