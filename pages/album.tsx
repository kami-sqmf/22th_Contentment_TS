import Footer from '../components/footer'
import HeadInitalize from '../components/head-initalize'
import Navbar from '../components/navbar'

const text = {
  first: {
    title: "知足、團結、強大，文采飛揚。",
    subtitle: "這就是我們的高二知足",
    image: "/index/Home.jpg"
  }
}

const CalendarPage = () => (
  <div>
    <HeadInitalize
      title="22屆知足班"
      description="你是不是對高二知足的活動很好奇呢？那你就點進來吧！"
      icon="v1"
      thumbnail="weikai.jpg" />
    <Navbar Current="/album" />
    <div className="flex items-center justify-around xl:mx-48 lg:mx-16 md:mx-8 mt-8">
      <div>

      </div>
      <div>
        
      </div>
      <div>
        {}
      </div>
    </div>
    <Footer />
  </div>
)

export default CalendarPage
