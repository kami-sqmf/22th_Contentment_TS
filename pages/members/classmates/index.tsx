import { faAngleDown, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import BreadCrumb from '../../../components/bread-crumb'
import Footer from '../../../components/footer'
import HeadInitalize from '../../../components/head-initalize'
import { FollowInstaPlugin } from '../../../components/instagram-follow-plugin'
import Navbar from '../../../components/navbar'
import ScrollToTop from '../../../components/scroll-to-top'
import { getStudentProfile } from '../../../utils/getStu'

const NumberNavigator = () => {
  const buttonStyle = "rounded-md ring-2 ring-blue m-2 w-8 h-8 font-semibold"
  return (
    <div className='flex flex-row items-baseline text-blue'>
      <p className='hidden sm:flex text-gray-600 text-sm mr-4'>---------點選號碼</p>
      <Link href={`#stu9`}>
        <button className={buttonStyle}><p>9</p></button>
      </Link>
      <Link href={`#stu17`}>
        <button className={buttonStyle}><p>17</p></button>
      </Link>
      <Link href={`#stu24`}>
        <button className={buttonStyle}><p>24</p></button>
      </Link>
      <Link href={`#stu32`}>
        <button className={buttonStyle}><p>32</p></button>
      </Link>
      <Link href={`#stu39`}>
        <button className={buttonStyle}><p>39</p></button>
      </Link>
      <p className='hidden sm:flex text-gray-600 text-sm ml-4'>快速跳轉---------</p>
    </div>
  )
}

const SessionSelect = ({ className, pageSelect, setPagesSelect }) => {
  function changeSection(e) {
    setPagesSelect(e.target.value)
  }
  return (
    <div className={`flex flex-row items-center max-w-max px-3 py-2 ring-1 ring-blue rounded-lg ${className}`}>
      <select onChange={(e) => changeSection(e)}>
        <option selected={false} value={1}>水生火熱</option>
        <option value={0}>知足靈堂</option>
      </select>
    </div>
  )
}

const committe = {
  100: "班長",
  1: "副班長",
  2: "風紀股長",
  3: "副風紀股長",
  4: "學藝股長",
  5: "副學藝股長",
  6: "衛生股長",
  7: "副衛生股長",
  8: "總務股長",
  9: "保健股長",
  10: "康樂股長",
  11: "服務股長",
  12: "視聽股長",
  13: "資訊股長",
  14: "人文股長",
  15: "圖書股長",
  16: "輔導股長",
  17: "環保股長",
}

const helper = {
  100: "國文小老師",
  1: "英文小老師",
  2: "數學小老師",
  3: "生物小老師",
  4: "化學小老師",
  5: "物理小老師",
  6: "地科小老師",
  7: "地理小老師",
  8: "歷史小老師",
  9: "公民小老師",
  10: "美麗新教室",
  11: "排考小老師",
}

const Profile = ({ info }) => {
  const Label = ({ text, info }: { text: "股長" | "小老師", info: Array<any> }) => {
    const xInfo = []
    for (let i = 0; i < info.length; i++) {
      if (info[i] != null) {
        let grade;
        if (i == 0) { grade = "一上 - " }
        if (i == 1) { grade = "一下 - " }
        if (i == 2) { grade = "二上 - " }
        if (i == 3) { grade = "二下 - " }
        if (i == 4) { grade = "三上 - " }
        if (i == 5) { grade = "三下 - " }
        if (info.length - 1 == i) { grade = "現任 - " }
        let what;
        if (text == "股長") { what = committe[info[i]] }
        else { what = helper[info[i]] }
        xInfo.push(`${grade}${what}`)
      }
    }
    const [label, setLabel] = useState(xInfo.length - 1)
    function setNext() {
      if (label > 0) setLabel(label - 1)
      else setLabel(xInfo.length - 1);
    }
    return (<div className='flex flex-row'>
      <div className='basis-2/6 text-gray-400 flex flex-row'>
        <p>{`${text}`}</p>
        {
          xInfo[0].slice(0, 2) != "現任" ? <FontAwesomeIcon icon={faClockRotateLeft} className="h-4 my-auto ml-2 hover:cursor-pointer" onClick={() => setNext()} /> : false
        }
      </div>
      <p className='basis-4/6'>{xInfo[label]}</p>
    </div>)
  }
  return (
    <div id={`stu${info.index}`} className='flex flex-col w-72 min-h-[32em] max-h-[38em] bg-white-light shadow-xl rounded-2xl overflow-hidden'>
      <div className='flex'>
        <img className='aspect-square object-cover w-72 h-72' alt="照片在這ㄛ！" src={info.avatar} />
      </div>
      <div className='flex flex-col px-5 py-6 font-["GenJyuuGothic"]'>
        <div className='flex flex-row items-baseline'>
          <p className='basis-5/12 text-2xl font-bold text-blue'>{info.nameCh}</p>
          <p className='basis-7/12 text-blue-light text-sm'>{`${info.index}號 ${info.nameEn}`}</p>
        </div>
        <div className='flex flex-col mt-3'>
          <div className='flex flex-row'>
            <p className='basis-2/6 text-gray-400'>生日</p>
            <p className='basis-4/6'>{`${parseInt((parseInt(info.birth) % 10000 / 100).toString())} 月 ${(parseInt(info.birth) % 100).toString()} 號`}</p>
          </div>
          {
            info.committe.filter(e => e > 0).length > 0 ? <Label text='股長' info={info.committe} /> : false
          }
          {
            info.helper.filter(e => e > 0).length > 0 ? <Label text='小老師' info={info.helper} /> : false
          }
          <div className='flex flex-row'>
            <p className='basis-2/6 text-gray-400'>自我介紹</p>
            <p className='basis-4/6'>{info.bio ? info.bio : "ta很懶，什麼東西沒也留下～"}</p>
          </div>
          <div className='mt-5'></div>
          <FollowInstaPlugin color={"blue"} insta={info.instagram} hide="inline-flex" />
        </div>
      </div>
    </div>
  )
}

const IndexPage = ({ stuData }) => {
  const [pageSelect, setPagesSelect] = useState(true)
  return (
    <div>
      <HeadInitalize
        title="22屆知足班 - 同學"
        description="蛤？你說你不知道我們班同學長怎樣！那你不妨來看看這個吧～應該是這麼形容的：『一坨俊男美女』呢！"
        icon="v1"
        thumbnail="buddaBath.jpeg" />
      <Navbar Current="/members/classmates" />
      <BreadCrumb current="/members/classmates" className="mt-8" Right={<SessionSelect className={""} pageSelect={pageSelect} setPagesSelect={setPagesSelect} />} />
      <div className='flex flex-col justify-around md:justify-between items-center my-8 xl:mx-48 lg:mx-16 mx-4'>
        <NumberNavigator />
        <div id="stuList" className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-24 mt-6 justify-between'>
          {stuData.map((info) => (
            info.isClassmate == pageSelect ? <Profile info={info} /> : false
          ))}
        </div>
        <NumberNavigator />
      </div>
      <Footer />
      <ScrollToTop/>
    </div>
  )
}

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const snapshot = await getStudentProfile()
  const stuData = []
  snapshot.forEach(doc => {
    stuData.push(doc.data())
  });
  return {
    props: {
      stuData
    }
  }
}

export default IndexPage
