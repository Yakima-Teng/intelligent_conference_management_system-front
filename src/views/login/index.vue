<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">智慧会议系统</div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="0px" auto-complete="on" class="ms-content">
        <el-form-item prop="username">
          <el-input ref="username" v-model="loginForm.username" type="text" tabindex="1" auto-complete="on" placeholder="用户名">
            <span slot="prefix" class="svg-container">
              <svg-icon icon-class="user" />
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin()"
          >
            <span slot="prefix" class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <span slot="suffix" class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin()">登录</el-button>
        </div>
        <p class="login-tips">Tips : 欢迎登陆~</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.$message.success('登录成功！')
            this.loading = false
          }).catch((error_msg) => {
            this.loading = false
            this.$message.error(error_msg)
          })
        } else {
          console.log('错误输入！')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  /* 输入框内的图标 */
  .svg-container {
    padding: 0px 8px 0px 0px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  /* 显示密码按钮 */
  .show-pwd {
    position: absolute;
    right: 5px;
    top: 0px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }

  /* 整个背景 */
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: rgb(32, 216, 63);
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
