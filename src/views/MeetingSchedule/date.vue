<template>
  <el-calendar v-model="calendarvalue" style="width:100%;">
    <template slot="dateCell" slot-scope="{data}">
      <div>
        <div>{{ data.day.split('-').slice(2).join('-') }}</div>
        <div v-for="item in meetings" :key="item.ID">
          <div
            v-if="parseInt(item.Content[0].date.split('.')[0])==parseInt(data.day.split('-')[0])&&parseInt(item.Content[0].date.split('.')[1])==parseInt(data.day.split('-')[1])&&parseInt(item.Content[0].date.split('.')[2])==parseInt(data.day.split('-')[2])"
          >
            {{ item.Name }}
          </div>
        </div>
      </div>
    </template>

  </el-calendar>
</template>

<script>
export default {
  data() {
    return {
      meetings: [{ ID: 0, Date: '2020.6.20', Name: '物理答疑', Content: [{ date: '2020.06.21', place: '安楼A107', type: { id: 1, name: '学术会议' }, matters: [{ id: 0, matter: '讲解习题' }, { id: 1, matter: '提问' }, { id: 2, matter: '答疑' }], staffs: [{ type: 0, id: '0001', name: '5603物理班' }, { type: 1, id: '001', name: '赵旭豪' }, { type: 1, id: '002', name: '王家振' }, { type: 1, id: '003', name: '周晗' }], other: '请勿参加！' }] }, { ID: 1, Date: '2020.6.28', Name: 'XXX立项会议', Content: [{ date: '2020.7.1', place: '博楼B304', type: { id: 1, name: '立项审批' }, matters: [{ id: 0, matter: '项目介绍' }, { id: 1, matter: '项目展示' }, { id: 2, matter: '提问环节' }], staffs: [{ type: 0, id: '0001', name: '立项审核组' }, { type: 1, id: '001', name: '赵旭豪' }, { type: 1, id: '002', name: '王家振' }, { type: 1, id: '003', name: '周晗' }], other: '请准时参加' }] }, { ID: 2, Date: '2020.7.1', Name: '第17周例行周会', Content: [{ date: '2020.7.3', place: '诚楼C201', type: { id: 1, name: '例行会议' }, matters: [{ id: 0, matter: '讨论1+1=？' }, { id: 1, matter: '讨论1+2=？' }, { id: 2, matter: '讨论1+3=？' }], staffs: [{ type: 0, id: '0001', name: '智慧会议项目组' }, { type: 1, id: '001', name: '赵旭豪' }, { type: 1, id: '002', name: '王家振' }, { type: 1, id: '003', name: '周晗' }], other: '无' }] }],
      calendarvalue: new Date()
    }
  },
  mounted: function() {
    var _this = this
    this.$axios.get('/api/meetings')
      .then(function(response) {
        _this.meetings = response.data.meetings
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }
}
</script>

<style scoped>

</style>
