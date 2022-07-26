import Footer from '../components/footer'
import HeadInitalize from '../components/head-initalize'
import Navbar from '../components/navbar'

const text = {
  first: {
    title: "知足、團結、強大，文采飛揚。",
    subtitle: "這就是我們的高二知足",
    image: "/index/home.jpg"
  }
}

const IndexPage = () => (
  <div>
    <HeadInitalize
      title="22屆知足班"
      description="歡迎來到高一知足班的大家庭，這裡充滿著歡樂以及笑容，但也可能充滿了黑暗。但其實最重要的還是我們大家一起經歷過，為高中生活留下美好為來吧！"
      icon="v1"
      thumbnail="weikai.jpg" />
    <Navbar Current="/" />
    <div className="flex items-center justify-around xl:mx-48 lg:mx-16 md:mx-8 mt-8">
      <div itemID='first' className='flex flex-row justify-around'>
        <div className='font-["GenJyuuGothic"]'>
          <p className='text-5xl w-96 font-bold'>{text.first.title}</p>
          <p>{text.first.subtitle}</p>
        </div>
        <div className='invisible'>我他媽愛度洋平！</div>
        <div className='max-h-96 w-auto'>
          <img className="h-72 w-auto object-scale-down" src={text.first.image}/>
        </div>
      </div>
    </div>
    <Footer />
  </div>
)

export default IndexPage
