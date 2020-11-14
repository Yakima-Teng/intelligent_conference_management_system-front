import request from '@/utils/request'

export function fetchDepartments() {
  return request({
    url: '/getDepartments',
    method: 'get'
  })
}

export function fetchStaffs() {
  return request({
    url: '/getStaffs',
    method: 'get'
  })
}

export function fetchAvailableMeetingRooms(data) {
  return request({
    url: '/getAvailableMeetingRooms',
    method: 'post',
    data
  })
}

export function fetchMeetingTypes() {
  return request({
    url: '/getMeetingTypes',
    method: 'get'
  })
}
