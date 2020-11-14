<template>
  <div class="app-wrapper">
    <el-container>
      <el-header style="padding:0px;">
        <navbar />
      </el-header>
      <el-container>
        <el-aside style="padding:0px;width:250px;background: #ffffff">
          <sidebar />
        </el-aside>
        <el-main style="padding:0px;">
          <tags-view />
          <div class="content">
            <app-main />
          </div>
          <el-backtop target=".content" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Navbar, AppMain, Sidebar, TagsView } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain,
    Sidebar,
    TagsView
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>

  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    background: #f0f0f0;
  }
</style>
