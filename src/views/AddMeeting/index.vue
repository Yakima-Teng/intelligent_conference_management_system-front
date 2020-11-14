<template>
  <div>
    <el-card class="main-wraper">
      <!-- 表单 -->
      <el-form ref="form" :rules="formRules" :model="form" label-width="110px">
        <!-- 会议名称 -->
        <el-form-item label="会议名称" prop="name">
          <el-col :xs="24" :sm="18" :md="15" :lg="12" :xl="8">
            <el-input v-model="form.name" placeholder="请输入会议名称" />
          </el-col>
        </el-form-item>

        <!-- 会议日期 -->
        <el-form-item label="会议日期" prop="date">
          <el-date-picker v-model="form.date" type="date" placeholder="选择会议日期" />
        </el-form-item>

        <!-- 会议时间 -->
        <el-form-item label="会议时间" prop="meetingTime">
          <el-time-picker
            v-model="form.meetingTime"
            is-range
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            format="HH:mm"
            style="width:450px;"
            @change="handleSelectTime"
          />
        </el-form-item>

        <!-- 会议地点 -->
        <el-form-item label="会议地点" prop="place">
          <el-select v-model="form.place" placeholder="请选择">
            <el-option
              v-for="item in availableMeetingRooms"
              :key="item.id"
              :label="item.isAvailable?(item.name+'(容量:'+item.seats+')'):(item.name+'(容量:'+item.seats+')'+'(已被预订)')"
              :value="item.id"
              :disabled="!item.isAvailable"
            />
            <el-card slot="empty">请选择会议时间后查看可用会议室</el-card>
          </el-select>
        </el-form-item>

        <!-- 会议类型 -->
        <el-form-item label="会议类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option-group v-for="group in typeOptions" :key="group.label" :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-option-group>
          </el-select>
        </el-form-item>

        <!-- 会议议程 -->
        <el-form-item label="会议议程" prop="matters" required>
          <el-col :xs="24" :sm="21" :md="18" :lg="14" :xl="8">
            <el-input v-for="item in form.matters" :key="item.key" v-model="item.content" style="width:85%;">
              <el-button v-if="form.matters.length>1" slot="append" type="danger" icon="el-icon-delete" circle @click="removeMatter(item)" />
            </el-input>
            <el-button type="success" icon="el-icon-plus" circle @click="addMatter" />
          </el-col>
        </el-form-item>

        <!-- 选择参会人员 -->
        <el-form-item label="选择参会人员" required>
          <el-button type="primary" @click="dialogAddStaffsVisible = true">添加</el-button>
        </el-form-item>

        <!-- todo：事务负责人员，通知时间、方式，会议标签 -->

        <!-- 备注 -->
        <el-form-item label="备注">
          <el-col :xs="24" :sm="18" :md="15" :lg="12" :xl="8">
            <el-input v-model="form.other" />
          </el-col>
        </el-form-item>

        <!-- todo：从模板导入 -->
        <!-- 底部按钮 -->
        <el-form-item>
          <el-button type="success" @click="beforeSubmit()">创建会议</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 添加参会人员的弹窗 todo:选择参会人员后，确定时二次显示确认-->
    <el-dialog title="添加参会人员" :visible.sync="dialogAddStaffsVisible" top="30px">
      <el-form v-model="chosenStaffs">

        <el-form-item label="选择部门">
          <el-radio-group v-model="chosenStaffs.chosenDepartment" @change="handleDepartmentChange">
            <el-radio-button
              v-for="department in allDepartments"
              :key="department.id"
              :label="department.id"
            >
              {{ department.name }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="部门职工" />
        <el-transfer
          v-model="chosenStaffs.staffs"
          filterable
          :titles="['全部人员', '应邀出席']"
          :button-texts="['取消', '邀请']"
          :data="availableStaffs"
        >
          <span slot-scope="{ option }">(工号:{{ option.key }}){{ option.label }}</span>
        </el-transfer>
      </el-form>

      <!-- 底部按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddStaffsVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogAddStaffsVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 提交表单二次确认弹窗 -->
    <el-dialog title="会议预览" :visible.sync="dialogSubmitVisible" top="30px">
      <!-- 主内容 -->
      <div>
        <p>会议名称：物理答疑</p>
        <p>会议时间：2020.11.11 20:00-22:00</p>
        <p>会议地点：德楼540</p>
        <p>会议类型：工程会议</p>
        <p>会议议程：</p>
        <p>1、xxxxxxx</p>
        <p>2、xxxxxxx</p>
        <p>3、xxxxxxx</p>
        <p>4、xxxxxxx</p>
        <p>参会人员：aa,bb,cc,dd,ee,fff,uu,ccc,kkk</p>
        <p>会议备注：xxxxxxxxxxxx</p>
      </div>

      <!-- 底部按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSubmitVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchDepartments, fetchStaffs, fetchAvailableMeetingRooms, fetchMeetingTypes } from '@/api/addMeeting'
export default {
  data: () => {
    return {
      form: {
        name: '', // 会议名称
        date: null, // 会议日期
        place: null, // 会议地点
        meetingTime: null, // 会议时间 // 若不为null或date*2数组，则el-time-picker无法选择 todo:即时上传时间判断会议室是否可用
        type: '', // 会议类型
        matters: [{ content: '', key: 0 }], // 会议议程
        other: '' // 会议备注
      },
      typeOptions: [], // 会议类型
      chosenStaffs: {
        chosenDepartment: '', // 暂时选中的部门
        staffs: [] // 暂时选中的参会职工
      },
      allDepartments: [], // 可选择的部门
      availableStaffs: [], // 可供选择的参会人员 todo：根据选择的部门动态调整 todo：根据会议室容量判断最多能选多少
      departmentStaffs: [], // 部门员工
      dialogAddStaffsVisible: false, // 是否打开选择参会人员的对话框
      dialogSubmitVisible: false, // 是否打开提交表单二次确认的对话框
      availableMeetingRooms: [], // 可供选择的会议室
      formRules: { // prop必须和v-model的值一模一样，否则无法正常校验，会一直显示'请输入xxxx' 踩坑了
        name: [
          { required: true, message: '请输入会议名称', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择会议日期', trigger: 'change' }
        ],
        meetingTime: [
          { required: true, message: '请选择会议时间', trigger: 'change' }
        ],
        place: [
          { required: true, message: '请选择会议地点', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择会议类型', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    // todo:解决最后提交的表单问题
    submitData: function() {
      return {
        meetingName: this.form.name
      }
    }
  },
  mounted() {
    // 获取所有部门
    this.getDepartments()
    // 获取所有员工
    this.getDepartmentStaffs()
    // 获取会议类型
    this.getMeetingTypes()
  },
  methods: {
    // 获取会议类型
    getMeetingTypes() {
      fetchMeetingTypes().then(response => {
        this.typeOptions = response.data
      })
    },
    // 获取所有部门
    getDepartments() {
      fetchDepartments().then(response => {
        this.allDepartments = response.data
      })
    },
    // 获取所有员工
    getDepartmentStaffs() {
      fetchStaffs().then(response => {
        this.departmentStaffs = response.data
      })
    },
    // 处理选择时间后，去请求可用会议室列表
    handleSelectTime(SelectTime) {
      if (this.form.date) {
        // 先自己拼接一下预约的时间
        const tmpDate = this.form.date.getFullYear().toString() + '-' + (this.form.date.getMonth() + 1).toString() + '-' + this.form.date.getDate().toString()
        const tmpStartTime = SelectTime[0].getHours().toString() + ':' + SelectTime[0].getMinutes().toString()
        const tmpEndTime = SelectTime[1].getHours().toString() + ':' + SelectTime[1].getMinutes().toString()
        fetchAvailableMeetingRooms({ Date: tmpDate, StartTime: tmpStartTime, EndTime: tmpEndTime }).then(response => {
          this.availableMeetingRooms = response.data
        })
      }
    },
    // 去掉一个会议事项输入框
    removeMatter(item) {
      var index = this.form.matters.indexOf(item)
      if (index !== -1) {
        this.form.matters.splice(index, 1)
      }
    },
    // 添加一个会议事项输入框
    addMatter() {
      this.form.matters.push({
        content: '',
        key: Date.now()
      })
    },
    // 点击创建会议按钮，验证并打开会议预览
    beforeSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.chosenStaffs.staffs.length === 0) {
            this.$message({ type: 'error', message: '尚未选择参会人员。', duration: 5 * 1000 })
          } else if (this.form.matters[0] === undefined || this.form.matters[0].content === '') {
            this.$message({ type: 'error', message: '尚输入会议议程。', duration: 5 * 1000 })
          } else {
            this.dialogSubmitVisible = true
          }
        }
      })
    },
    // 切换部门
    handleDepartmentChange() {
      // 清空原来的availableStaffs数组
      this.availableStaffs.splice(0, this.availableStaffs.length)
      // 循环从所有员工里找到选中的部门，然后一个个id->key，name->label转换(el-transfor需要)添加
      this.departmentStaffs.forEach(element => {
        if (element.dep_id === this.chosenStaffs.chosenDepartment) {
          element.staffs.forEach(staff => {
            this.availableStaffs.push({ key: staff.id, label: staff.name })
          })
        }
      })
    },
    submitForm() {
      const meetingData = { meetingName: this.form.name }
      console.log(meetingData)
      this.dialogSubmitVisible = false
    }
  }
}
</script>

<style scoped>
.main-wraper {
  margin: 10px;
  height: 590px;
  overflow: auto;
}
</style>
