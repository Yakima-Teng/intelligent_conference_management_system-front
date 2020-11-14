<template>
  <div class="header">
    <!-- 主页按钮 -->
    <div class="home-btn" @click="toHome">
      <i class="el-icon-s-home" />
    </div>
    <!-- logo -->
    <div class="logo">智慧会议系统</div>
    <!-- 整个右侧容器 -->
    <div class="header-right">
      <!-- 用户头像与消息中心 -->
      <div class="header-user-con">
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip
            effect="dark"
            :content="message?`有${message}条未读消息`:`消息中心`"
            placement="bottom"
          >
            <router-link to="/tabs">
              <i class="el-icon-bell" />
            </router-link>
          </el-tooltip>
          <span v-if="message" class="btn-bell-badge" />
        </div>
        <!-- 用户头像 -->
        <el-dropdown trigger="click">
          <!-- 头像图片 -->
          <div class="avatar-wrapper">
            <img :src="avatar" class="user-avatar">
            <i class="el-icon-caret-bottom" />
          </div>
          <!-- 下拉菜单 -->
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>
                Home
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      message: 2
    }
  },
  computed: {
    ...mapGetters([
      'avatar'
    ])
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    toHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
/* 整个顶栏 */
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    font-size: 22px;
    color: #fff;
}
/* 首页按钮 */
.home-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 60px;
}
/* 智慧会议系统logo */
.header .logo {
    float: left;
    width: 200px;
    line-height: 60px;
}
/* 右边栏 */
.header-right {
    float: right;
}
/* 小喇叭和用户头像 */
.header-user-con {
    display: flex;
    height: 60px;
    align-items: center;
}
/* 整个小喇叭 */
.btn-bell {
    position: relative;
    width: 40px;
    height: 40px;
    margin-right: 10px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
/* 小喇叭的红点 */
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
/* 小喇叭图标 */
.btn-bell .el-icon-bell {
    line-height: 40px;
    margin:auto;
    font-size: 30px;
    color: #fff;
}
/* 头像和下拉的小三角 */
.avatar-wrapper {
    margin-right: 30px;
    margin-top: 5px;
    position: relative;
}
/* 头像的图片 */
.user-avatar {
    position: relative;
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    }
/* 下拉小三角 */
.el-icon-caret-bottom {
    position: relative;
    cursor: pointer;
    position: absolute;
    right: -20px;
    top: 25px;
    font-size: 12px;
    }
</style>
