import React, { useEffect } from 'react';
import BreadCrumb from '../components/bread-crumb';
import Footer from '../components/footer'
import HeadInitalize from '../components/head-initalize'
import dynamic from 'next/dynamic'
import Navbar from '../components/navbar';

const DynamicCalendar = dynamic(() => import('../components/calendar'), {
    ssr: false,
  })
const CalendarPage = () => {
    return (
        <div>
            <HeadInitalize
                title="22屆知足班"
                description="歡迎來到高二知足班的大家庭，這裡充滿著歡樂以及笑容，但也可能充滿了黑暗。但其實最重要的還是我們大家一起經歷過，為高中生活留下美好為來吧！"
                icon="v1"
                thumbnail="weikai.jpg" />
            <Navbar Current="/" />
            <BreadCrumb current="/calendar" className="mt-8" />
            <div className="flex items-center justify-around xl:mx-48 lg:mx-16 md:mx-8 mt-8">
                <div className='w-full h-1/2'>
                    <DynamicCalendar />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CalendarPage