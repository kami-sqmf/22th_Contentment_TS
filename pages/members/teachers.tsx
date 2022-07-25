import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleLeft, faAngleRight, faClock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import BreadCrumb from '../../components/bread-crumb'
import Footer from '../../components/footer'
import HeadInitalize from '../../components/head-initalize'
import Navbar from '../../components/navbar'
import Link from 'next/link'

const teacherInfo = {
  name: "黃裕倫",
  nameEn: "Yulen",
  nachnameEn: "Huang",
  subject: "資訊老師",
  description: "上課總是帶著我們一起了解演算法裡的奧妙，目前已教導我們 二進位、八進位、十六進位、二分搜尋法以及選擇排序法和氣泡排序法",
  time: "高一上",
  image: "/tempelate/Yulen.png",
  mail: "s11@tcsh.hlc.edu.tw",
}

const SessionSelect = ({ className }) => {
  return (
    <div className={`flex flex-row items-center max-w-max px-3 py-1 ring-1 ring-blue rounded-lg ${className}`}>
      <p className='text-blue'>現任老師</p>
      <FontAwesomeIcon className='text-blue h-4 ml-2' icon={faAngleDown} />
    </div>
  )
}

const teachersPage = () => (
  <div>
    <HeadInitalize
      title="22屆知足班"
      description="歡迎來到高一知足班的大家庭，這裡充滿著歡樂以及笑容，但也可能充滿了黑暗。但其實最重要的還是我們大家一起經歷過，為高中生活留下美好為來吧！"
      icon="v1"
      thumbnail="weikai.jpg" />
    <Navbar Current="/members/teachers" />
    <BreadCrumb current="/members/teachers" className="mt-8" Right={<SessionSelect className="lg:invisible" />} ></BreadCrumb>
    <div className='flex flex-row justify-around md:justify-between items-center my-8 xl:mx-48 lg:mx-16 mx-4'>
      <FontAwesomeIcon icon={faAngleLeft} className="w-8 text-blue/80 self-center" />
      <div className='grid grid-cols-5 grid-rows-8 md:grid-cols-8 md:grid-rows-6 max-w-7xl'>
        <p className='ml-4 md:ml-0 col-start-1 col-end-3 row-span-1 row-start-2 text-6xl md:text-8xl text-blue/20'>{teacherInfo.nachnameEn}</p>
        <p className='ml-4 md:ml-0 col-start-3 col-end-5 row-span-1 row-start-3 md:col-start-4 text-6xl md:text-8xl text-blue/20'>{teacherInfo.nameEn}</p>
        <img className="row-start-1 row-span-6 col-start-2 col-end-5 w-80" src={teacherInfo.image}></img>
        <div className='col-start-1 col-span-5 row-start-5 row-span-4 md:col-start-5 md:col-end-8 md:row-start-2 md:row-end-6 flex flex-col mx-4'>
          <div className='flex flex-col'>
            <p className='text-lg text-blue-light'>{teacherInfo.subject}</p>
            <p className='text-4xl tracking-widest text-blue-light'>{teacherInfo.name}</p>
          </div>
          <p className='text-xl text-blue mt-8 w-72 md:w-128 lg:w-96'>{teacherInfo.description}</p>
          <div className='flex flex-row items-center mt-4 max-w-fit'>
            <FontAwesomeIcon icon={faClock} className="h-5 mr-4 text-blue-light" />
            <p className='text-xl text-blue-light'>任職期間： {teacherInfo.time}</p>
          </div>
          <Link href={`mailto:${teacherInfo.mail}`}>
            <div
              className='flex flex-row items-center px-4 py-2 mt-12 ring-2 ring-blue-light rounded-xl max-w-fit cursor-pointer'>
              <FontAwesomeIcon icon={faEnvelope} className="h-7 mr-4 text-blue-light" />
              <p className='text-2xl text-blue-light'>聯絡老師</p>
            </div>
          </Link>
        </div>
      </div>
      <FontAwesomeIcon icon={faAngleRight} className="w-8 text-blue/80 self-center" />
    </div>
    <Footer />
  </div >
)

export default teachersPage
