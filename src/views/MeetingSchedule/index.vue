<template>
  <div>
    <el-card class="main-wraper">
      <!-- todo：切换用的日历、菜单图标未响应式 -->
      <div class="title">近期会议日程</div>
      <el-tooltip effect="dark" content="切换日程显示方式" placement="left-end">
        <div class="changeviewbutton">
          <i
            class="el-icon-date"
            @click="toSomewhere('/MeetingSchedule/date')"
          />
          <i
            class="el-icon-menu"
            @click="toSomewhere('/MeetingSchedule/timeline')"
          />
        </div>
      </el-tooltip>
      <router-view />
    </el-card>
  </div>
</template>

<script>
export default {
  methods: {
    toSomewhere(somewhere) {
      this.$router.push(somewhere)
    }
  }
}
</script>

<style scoped>
/* el-card主容器 */
.main-wraper {
  margin: 10px;
  height: 590px;
}

/* “近期会议日程”的标题 */
.title {
  display:inline-block;
  position:relative;
  left:10px;
  font-size:2em
}

/* 切换日历/时间线的按钮 */
.changeviewbutton {
  display:inline-block;
  font-size:2.5em;
  color:#A2A9A1;
  position: absolute;
  right:50px;
  cursor:pointer;
}

.changeviewbutton i {
 margin: 5px 5px;
}
</style>>
