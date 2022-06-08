import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import BreadCrumb from '../../components/bread-crumb'
import Footer from '../../components/footer'
import HeadInitalize from '../../components/head-initalize'
import Navbar from '../../components/navbar'

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
    <BreadCrumb current="/members/teachers" className="my-8" Right={<SessionSelect className="md:invisible" />} ></BreadCrumb>
    <div className='flex items-start justify-around md:justify-between xl:mx-48 lg:mx-16 md:mx-8'>
      <div>
        <SessionSelect className="hidden md:flex" />
          <div className='grid grid-flow-col grid-rows-4 opacity-20 absolute'>
            <p className='row-start-1 row-span-2 text-6xl md:text-8xl'>Huang</p>
            <p className='row-start-2 row-span-2 invisible'>By KamiSqmf</p>
            <p className='row-start-3 row-span-2 text-6xl md:text-8xl'>Yulen</p>
        </div>
        {/* <div className=''>
          <img className="w-48" src='/tempelate/Yulen.png'></img>
        </div> */}
      </div>
      <div className='invisible'></div>
    </div>
    <Footer />
  </div >
)

export default teachersPage
