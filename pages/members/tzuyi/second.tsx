import BreadCrumb from '../../../components/bread-crumb'
import Footer from '../../../components/footer'
import HeadInitalize from '../../../components/head-initalize'
import Navbar from '../../../components/navbar'

const IndexPage = () => (
  <div>
    <HeadInitalize
      title="22屆知足班"
      description="歡迎來到高一知足班的大家庭，這裡充滿著歡樂以及笑容，但也可能充滿了黑暗。但其實最重要的還是我們大家一起經歷過，為高中生活留下美好為來吧！"
      icon="v1"
      thumbnail="weikai.jpg" />
    <Navbar Current="/members/tzuyi/second" />
    <BreadCrumb current="/members/tzuyi/second" className="mt-8" />
    <div>
      ABCD
    </div>
    <Footer />
  </div>
)

export default IndexPage
