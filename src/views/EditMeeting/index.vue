<template>
  <div>
    <!-- 此版本仅为了应付进度要求，写个大概框架，细节需要大量时间优化 -->
    <el-card class="main-wraper">
      <el-row>
        <!-- todo：多选、带tag展示已选项、分组、搜索 -->
        <!-- 筛选表单 -->
        <el-form :inline="true">
          <el-form-item label="筛选栏：" />
          <el-form-item label="会议状态">
            <el-select v-model="filterOptions.selectedMeetingStatus" placeholder="未选择" style="width:100px;">
              <el-option
                v-for="item in filterOptions.meetingStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="会议类型">
            <el-select v-model="filterOptions.selectedMeetingType" placeholder="未选择" style="width:150px;">
              <el-option
                v-for="item in filterOptions.meetingTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="标签">
            <el-select v-model="filterOptions.selectedMeetingTag" placeholder="未选择" style="width:150px;">
              <el-option
                v-for="item in filterOptions.meetingTags"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <!-- todo：快捷选项、其他细节优化 -->
          <el-form-item label="时间范围">
            <el-date-picker
              v-model="filterOptions.selectedMeetingTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <!-- todo：内置筛选、展开、等等细节 -->
        <!-- 可编辑会议列表 -->
        <el-table
          :data="meetingTableData"
          stripe
          height="250px;"
        >
          <el-table-column
            prop="meetingName"
            label="会议"
            width="180"
          />
          <el-table-column
            prop="meetingTime"
            label="时间"
            width="180"
          />
          <el-table-column
            prop="meetingRoom"
            label="地点"
          />
          <el-table-column
            prop="meetingStatus"
            label="状态"
          />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >
                编辑
              </el-button>
              <el-button
                type="danger"
                size="mini"
                @click="handleDelete(scope.$index, scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { } from '@/api/addMeeting'
export default {
  data: () => {
    return {
      filterOptions: {
        selectedMeetingStatus: null,
        selectedMeetingType: null,
        selectedMeetingTag: null,
        selectedMeetingTime: null,
        meetingStatus: [{ value: '1', label: '未发布' }, { value: '2', label: '已发布' }, { value: '3', label: '已召开' }],
        meetingTypes: [{ value: '1', label: '工程会议' }, { value: '2', label: '财务会议' }, { value: '3', label: '规划会议' }],
        meetingTags: [{ value: '1', label: '王总的' }, { value: '2', label: '豪子哥' }, { value: '3', label: '明天要参加' }]
      },
      meetingTableData: [
        { id: '0', meetingName: '会议1', meetingTime: '2020.12.6 12:00', meetingRoom: '安楼A207', meetingStatus: '已召开' },
        { id: '1', meetingName: '会议2', meetingTime: '2020.12.6 12:00', meetingRoom: '安楼A207', meetingStatus: '已召开' },
        { id: '2', meetingName: '会议3', meetingTime: '2020.12.6 12:00', meetingRoom: '安楼A207', meetingStatus: '已发布' },
        { id: '3', meetingName: '会议4', meetingTime: '2020.12.6 12:00', meetingRoom: '安楼A207', meetingStatus: '已发布' },
        { id: '4', meetingName: '会议5', meetingTime: '2020.12.6 12:00', meetingRoom: '安楼A207', meetingStatus: '已发布' },
        { id: '5', meetingName: '会议6', meetingTime: '2020.12.6 12:00', meetingRoom: '安楼A207', meetingStatus: '已发布' },
        { id: '6', meetingName: '会议7', meetingTime: '2020.12.6 12:00', meetingRoom: '安楼A207', meetingStatus: '已发布' },
        { id: '7', meetingName: '会议8', meetingTime: '2020.12.6 12:00', meetingRoom: '安楼A207', meetingStatus: '未发布' }
      ]
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log('编辑', index, row)
    },
    handleDelete(index, row) {
      console.log('删除', index, row)
    }
  }
}
</script>

<style scoped>
.main-wraper {
  margin: 10px;
  height: 600px;
  overflow: auto;
}
</style>
