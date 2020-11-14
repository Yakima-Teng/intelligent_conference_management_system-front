<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :key="key" :include="tagsList">
        <router-view />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import bus from '@/components/bus'
export default {
  name: 'AppMain',
  data() {
    return {
      tagsList: []
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  created() {
    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on('tags', msg => {
      const arr = []
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name)
      }
      this.tagsList = arr
    })
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  /* min-height: calc(100vh - 60px);这里的60px根据头部高度来定 */
  width: 100%;
  overflow: auto;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
