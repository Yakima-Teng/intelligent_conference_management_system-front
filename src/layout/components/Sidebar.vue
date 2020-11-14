<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="items[0].index"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :key="item.index" :index="item.index">
            <template slot="title">
              <i :class="item.icon" />
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :key="subItem.index"
                :index="subItem.index"
              >
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :key="subItem.index"
                :index="subItem.index"
              >{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :key="item.index" :index="item.index">
            <i :class="item.icon" />
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: 'el-icon-s-home',
          index: '/Dashboard',
          title: '系统首页'
        },
        {
          icon: 'el-icon-s-management',
          index: '1',
          title: '会议管理',
          subs: [
            {
              index: '/MeetingSchedule',
              title: '会议日程'
            },
            {
              index: '/AddMeeting',
              title: '新建会议'
            },
            {
              index: '/EditMeeting',
              title: '编辑会议'
            },
            {
              index: '/MeetingFlow',
              title: '会议流程'
            }
          ]
        },
        {
          icon: 'el-icon-document',
          index: '2',
          title: '会议模板',
          subs: [
            {
              index: '/AddTemplate',
              title: '新建模板'
            },
            {
              index: '/EditTemplate',
              title: '编辑模板'
            }
          ]
        },
        {
          icon: 'el-icon-s-custom',
          index: '3',
          title: '专家管理',
          subs: [
            {
              index: '405',
              title: 'xxxx'
            },
            {
              index: '403',
              title: 'xxxx'
            }
          ]
        },
        {
          icon: 'el-icon-s-data',
          index: '4',
          title: '会议大数据',
          subs: [
            {
              index: '407',
              title: 'xxxx'
            },
            {
              index: '406',
              title: 'xxxx'
            }
          ]
        },
        {
          icon: 'el-icon-folder-opened',
          index: '5',
          title: '会议文件管理'
        },
        {
          icon: 'el-icon-chat-line-square',
          index: '6',
          title: '消息通知'
        }
      ]
    }
  }
}
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
