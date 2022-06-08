import Link from 'next/link'
import BreadCrumb from '../../components/bread-crumb'
import Footer from '../../components/footer'
import HeadInitalize from '../../components/head-initalize'
import Navbar from '../../components/navbar'

const text = {
    teachers: "Teachers 老師",
    classmates: "Classmates 同學",
    tzuyi: "Tzuyi 慈誠懿德"
}

const link = {
    teachers: "/members/teachers",
    classmates: "/members/classmates",
    tzuyi: "/members/tzuyi"
}

const image = {
    teachers: "/members/teacher.png",
    classmates: "/members/classmates.png",
    tzuyi: "/members/tzuyi.png"
}

const Choice = ({ link, text, image }) => {
    return (
        <Link href={link}>
            <div className='flex flex-col justify-center ring-blue ring-1 rounded-4xl py-6 my-2 px-4 md:px-8 md:mx-8 cursor-pointer hover:bg-insta hover:bg-opacity-20'>
                <img src={image} />
                <p className='mx-auto text-xl text-blue mt-2'>{text}</p>
            </div>
        </Link>
    )
}


const IndexPage = () => (
    <div>
        <HeadInitalize
            title="22屆知足班"
            description="歡迎來到高一知足班的大家庭，這裡充滿著歡樂以及笑容，但也可能充滿了黑暗。但其實最重要的還是我們大家一起經歷過，為高中生活留下美好為來吧！"
            icon="v1"
            thumbnail="weikai.jpg" />
        <Navbar Current="/members" />
        <BreadCrumb current="/members" className="my-8" />
        <div className='flex items-start justify-around md:justify-between xl:mx-48 lg:mx-16 md:mx-8'>
            <div className='flex flex-col md:flex-row py-8 px-12 ring-blue ring-2 rounded-lg shadow-sm bg-white-light'>
                <Choice link={link.teachers} text={text.teachers} image={image.teachers} />
                <Choice link={link.classmates} text={text.classmates} image={image.classmates} />
                <Choice link={link.tzuyi} text={text.tzuyi} image={image.tzuyi} />
            </div>
        </div>
        <Footer />
    </div>
)

export default IndexPage
