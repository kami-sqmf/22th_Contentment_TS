import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faClock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import BreadCrumb from '../../components/bread-crumb'
import Footer from '../../components/footer'
import HeadInitalize from '../../components/head-initalize'
import Navbar from '../../components/navbar'
import Link from 'next/link'

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
    <BreadCrumb current="/members/teachers" className="mt-8" Right={<SessionSelect className="md:invisible" />} ></BreadCrumb>
    <div className='flex items-start justify-around md:justify-between my-8 xl:mx-48 lg:mx-16 md:mx-8'>
      <SessionSelect className="hidden md:flex" />
      <div>
        <div className='grid grid-flow-col grid-rows-4 text-blue/30 z-30 absolute left-0 right-0 mx-auto max-w-max mt-24 xl:ml-48 lg:ml-16 md:ml-8'>
          <p className='row-start-1 row-span-2 text-6xl md:text-8xl'>Huang</p>
          <p className='row-start-2 row-span-2 invisible'>By KamiSqmf</p>
          <p className='row-start-3 row-span-2 text-6xl md:text-8xl'>Yulen</p>
        </div>
        <div className='grid grid-flow-row grid-cols-4 z-40 absolute left-0 right-0 mx-auto max-w-fit xl:ml-48 lg:ml-16 md:ml-8'>
          <p className='invisible'>Huang</p>
          <img className="col-span-2 w-80" src='/tempelate/Yulen.png' ></img>
          <p className='invisible'>Yulen</p>
        </div>
        <div className='grid grid-flow-row grid-cols-4 z-40 absolute left-0 right-0 mx-auto max-w-fit xl:ml-48 lg:ml-16 md:ml-8'>
          <p className='invisible'>Huang</p>
          <img className="col-span-2 w-80" src='/tempelate/Yulen.png' ></img>
          <p className='invisible'>Yulen</p>
        </div>
      </div>
      <div className='flex flex-col z-50'>
        <div className='flex flex-col'>
          <p className='text-lg text-blue-light'>資訊老師</p>
          <p className='text-4xl tracking-widest text-blue-light'>黃裕倫</p>
        </div>
          <p className='text-xl text-blue mt-8 w-80 md:w-128'>上課總是帶著我們一起了解演算法裡的奧妙，目前已教導我們 二進位、八進位、十六進位、二分搜尋法以及選擇排序法和氣泡排序法</p>

        <div className='flex flex-row items-center mt-8'>
          <FontAwesomeIcon icon={faClock} className="h-5 mr-4 text-blue-light" />
          <p className='text-xl text-blue-light'>任職期間： 高一上</p>
        </div>
        <div className='flex flex-row items-center px-4 py-2 mt-12 ring-2 ring-blue-light rounded-xl max-w-fit'>
          <FontAwesomeIcon icon={faEnvelope} className="h-7 mr-4 text-blue-light" />
          <p className='text-2xl text-blue-light'>聯絡老師</p>
        </div>
      </div>
      {/* <div className='invisible'></div> */}
    </div>
    <Footer />
  </div >
)

export default teachersPage
