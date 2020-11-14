<template>
  <div style="margin-top:20px;height:500px;width:100%;overflow:auto">
    <el-timeline style="padding:0px 40px">
      <div v-for="meeting in meetings" :key="meeting.ID">
        <el-timeline-item color="#07c4a8" :timestamp="'发布时间：'+meeting.Date" placement="top">
          <el-card :body-style="{ padding: '10px' }">
            <div slot="header" class="meetingname">
              {{ meeting.Name }}：
            </div>
            <el-table :data="meeting.Content" style="width: 100%">
              <el-table-column prop="date" label="会议时间" width="180" />
              <el-table-column prop="place" label="会议地点" width="180" />
              <el-table-column label="会议议程" width="180">
                <template slot-scope="scope">
                  <ol style="padding:0px 10px;">
                    <li v-for="matter in scope.row.matters" :key="matter.id">{{ matter.matter }}</li>
                  </ol>
                </template>
              </el-table-column>
              <el-table-column prop="staff" label="参会人员">
                <template slot-scope="scope">
                  <ol style="padding:0px 10px;">
                    <div v-for="staff in scope.row.staffs" :key="staff.id">
                      <li v-if="staff.type==1">(工号:{{ staff.id }}){{ staff.name }}</li>
                      <li v-else-if="staff.type==0">{{ staff.name }}</li>
                    </div>
                  </ol>
                </template>
              </el-table-column>
              <el-table-column prop="type.name" label="会议类型" width="180" />
              <el-table-column prop="other" label="备注" />
            </el-table>
          </el-card>
        </el-timeline-item>
      </div>
    </el-timeline>
  </div>
</template>

<script>
export default {
  name: 'MeetingScheduleTimeline',
  data: () => {
    return {
      meetings: [{ ID: 0, Date: '2020.6.20', Name: '物理答疑', Content: [{ date: '2020.6.21', place: '安楼A107', type: { id: 1, name: '学术会议' }, matters: [{ id: 0, matter: '讲解习题' }, { id: 1, matter: '提问' }, { id: 2, matter: '答疑' }], staffs: [{ type: 0, id: '0001', name: '5603物理班' }, { type: 1, id: '001', name: '赵旭豪' }, { type: 1, id: '002', name: '王家振' }, { type: 1, id: '003', name: '周晗' }], other: '请勿参加！' }] }, { ID: 1, Date: '2020.6.28', Name: 'XXX立项会议', Content: [{ date: '2020.7.1', place: '博楼B304', type: { id: 1, name: '立项审批' }, matters: [{ id: 0, matter: '项目介绍' }, { id: 1, matter: '项目展示' }, { id: 2, matter: '提问环节' }], staffs: [{ type: 0, id: '0001', name: '立项审核组' }, { type: 1, id: '001', name: '赵旭豪' }, { type: 1, id: '002', name: '王家振' }, { type: 1, id: '003', name: '周晗' }], other: '请准时参加' }] }, { ID: 2, Date: '2020.7.1', Name: '第17周例行周会', Content: [{ date: '2020.7.3', place: '诚楼C201', type: { id: 1, name: '例行会议' }, matters: [{ id: 0, matter: '讨论1+1=？' }, { id: 1, matter: '讨论1+2=？' }, { id: 2, matter: '讨论1+3=？' }], staffs: [{ type: 0, id: '0001', name: '智慧会议项目组' }, { type: 1, id: '001', name: '赵旭豪' }, { type: 1, id: '002', name: '王家振' }, { type: 1, id: '003', name: '周晗' }], other: '无' }] }]
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
