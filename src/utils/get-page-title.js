import defaultSettings from '@/settings'

const title = defaultSettings.title || '智慧会议系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
