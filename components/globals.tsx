import { faHouse, faPeopleLine, faCameraRetro, faCalendarDays, faMusic, IconDefinition } from '@fortawesome/free-solid-svg-icons'
export const Navs: Array<navs> = [
    { nameEn: 'Home', nameCh: '首頁', link: '/', emoji: faHouse },
    { nameEn: 'Members', nameCh: '成員', link: '/members', emoji: faPeopleLine, child: [{ name: '老師 Teachers', link: '/members/teachers' }, { name: '同學 Classmates', link: '/members/classmates' }, { name: '懿德爸媽', link: '/members/tzuyi', child: [{ name: '第一組', link: '/members/tzuyi/first' }, { name: '第二組', link: '/members/tzuyi/second' }, { name: '第三組', link: '/members/tzuyi/third' }] }] },
    { nameEn: 'Album', nameCh: '相簿', link: '/album', emoji: faCameraRetro },
    { nameEn: 'Schedule', nameCh: '行事曆', link: '/calendar', emoji: faCalendarDays },
    { nameEn: 'Songs', nameCh: '歌單', link: '/songs', emoji: faMusic }
  ]
export type navs = { nameEn: string; nameCh: string; link: string; emoji: IconDefinition; child?: Array<navsChild>; }
export type navsChild = { name: string; link: string; child?: Array<navsChild>; }
export const InstaProfile = "s21_the_best";
export const DiscordInviteCode = "DRUY4w56eJd"
export const GithubRepo = "kami-sqmf/22th_Contentment"
export const websiteMap = [{ name: "班級活動", url: "/album" }, { name: "班級成員", url: "/members" }, { name: "班級圖片", url: "https://drive.google.com/drive/folders/1wbB9I_MiKtDveHVjyNmSixH3f5_77DDH?usp=sharing" }, { name: "班級點歌系統", url: "/songs" }, { name: "課表與行事曆", url: "/calender" }]
export const usefulLink = [{ name: "學校網頁", url: "https://www.tcsh.hlc.edu.tw/home" }, { name: "學校 Facebook", url: "https://www.facebook.com/1724270161215510" }, { name: "學系歷程平台", url: "https://epf.mlife.org.tw/Portal.do" }, { name: "今日人間菩提", url: "/api/youtube?search=daai" }, { name: "互動ABC 線上版", url: "/api/youtube?search=LiveABC&month=7" }]