import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';

function ScrollToTop() {
    const [top, setTop] = useState("hidden")
    useEffect(() => {
        window.onscroll = function () {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                setTop('block')
            } else {
                setTop('hidden')
            }
        };
    })
    function backTop(e) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return (
        <button type="button" onClick={(e) => backTop(e)} className={`${top} group inline-block fixed p-3 m-4 bg-white-light text-blue font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-white hover:shadow-lg focus:bg-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-white active:shadow-lg transition duration-150 ease-in-out bottom-5 right-5`}>
            <FontAwesomeIcon icon={faArrowCircleUp} className="w-8 h-8 group-hover:animate-spin" />
        </button>
    )
}

export default ScrollToTop;