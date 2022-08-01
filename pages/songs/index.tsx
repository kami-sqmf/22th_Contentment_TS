import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import BreadCrumb from '../../components/bread-crumb'
import Footer from '../../components/footer'
import HeadInitalize from '../../components/head-initalize'
import Navbar from '../../components/navbar'
import ytSearch from '../../utils/youtubeAPI';
import ReactDOM from 'react-dom'

const yt = new ytSearch()

const text = {
    form: {
        search: '在這裡輸入想要點的歌！',
        id: '輸入您的學號'
    },
    confirm: {
        title: "確定要新增至歌單嗎？",
        errorId: "請輸入正確的學號！",
        errorRange: "別班的先去吃s！",
        error0: "本操作將會覆蓋原本的歌曲！"
    }
}

async function sendSongApi(id, vid) {
    try {
        const res = await fetch("/api/youtube", {
            method: 'POST',
            headers: {
                Authorization: "I know this is easy, but don't Hack this!"
            },
            body: JSON.stringify({
                id: id,
                vid: vid,
            })
        })
        const resJson = await res.json() as any
        if (resJson.operation == "success") return "success"
        if (resJson.operation == "alert") return text.confirm[`error${resJson.data}`]
    } catch (err) {
        return "伺服器正在維修中！請洽詢湯哥！"
    }
}

function timeSince(date) {

    var seconds = Math.floor(((new Date() as any) - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " 年前";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " 個月前";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " 天前";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " 小時前";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " 分鐘前";
    }
    return Math.floor(seconds) + " seconds";
}

function Search() {
    function confirmSong(vid) {
        const confirmMenu = document.getElementById("ConfirmMenu")
        ReactDOM.render(<ConfirmSong vid={vid} />, confirmMenu);
    }
    // Video Object
    const Video = ({ thumbnail, avatar, title, channel, published, vid }) => (
        <div className='flex flex-col max-w-xs group hover:scale-110 ease-in-out duration-300' onClick={() => confirmSong(vid)}>
            <div className='relative'>
                <img className="w-auto max-h-48" height={thumbnail.height} width={thumbnail.width} src={thumbnail.url} />
                <p className='text-sm text-white md:opacity-0 group-hover:opacity-90 absolute bottom-2 right-2 px-2 py-1 bg-gray-800 rounded-lg ease-in duration-200'>按一下點歌！</p>
            </div>
            <div className='flex flex-row justify-items-center justify-start'>
                <img className="h-10 m-2 rounded-full" src={avatar} />
                <p className='font-bold text-blue mt-1'>{title.replaceAll("&quot;", '"')}</p>
            </div>
            <div className="flex flex-col ml-14 text-gray-500 text-sm">
                <p>{channel} 。 {timeSince(new Date(published))}</p>
            </div>
        </div>
    )
    // Search State
    const [searchFocus, setSearchFocus] = useState("text-gray-500");
    const focusSearchFocus = () => { setSearchFocus("text-blue") };
    const blurSearchFocus = () => { setSearchFocus("text-gray-500") };
    const searchEnter = async (e) => {
        if ((e.code as string).includes("Enter")) {
            e.target.blur()
            const videoList = await yt.videoByKeyword(e.target.value)
            let videosElement = []
            for (let item of videoList.items) {
                const channel = await yt.channelByID(item.snippet.channelId)
                videosElement.push(<Video vid={item.id.videoId} thumbnail={item.snippet.thumbnails.medium} avatar={channel.items[0].snippet.thumbnails.default.url} title={item.snippet.title} channel={channel.items[0].snippet.title} published={item.snippet.publishTime} />)
            }
            renderSearchList(videosElement)
        }
    }
    const [searchList, renderSearchList] = useState(null as Array<JSX.Element>);
    // Main Object
    return (
        <div>
            <div className='relative rounded-md mt-2'>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faSearch} className={`h-4 ${searchFocus}`} />
                </div>
                <input name='search' id='search' type={"text"} onKeyUp={searchEnter} onBlur={blurSearchFocus} onFocus={focusSearchFocus} placeholder={text.form.search} autoComplete={"off"}
                    className="text-xl block w-full pl-9 rounded-md ring-1 ring-blue-light focus:ring-blue  focus:text-blue" />
            </div>
            <div id="vidList" className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6'>{searchList}</div>
        </div>
    )
}

function Notification({Text}) {
    return (
        <div className="m-auto">
            <div className="bg-white rounded-lg border-gray-300 border p-3 shadow-lg">
                <div className="flex flex-row">
                    <div className="px-2">
                        <svg width="24" height="24" viewBox="0 0 1792 1792" fill="#44C997" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" />
                        </svg>
                    </div>
                    <div className="ml-2 mr-6">
                        <span className="font-semibold">Successfully Saved!</span>
                        <span className="block text-gray-500">Anyone with a link can now view this file</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ConfirmSong({ vid }) {
    const [errorMessage, setErrorMessage] = useState(null)
    async function sendSongReqeust(e: any = false) {
        if (e) {
            setErrorMessage(null)
            if (!((e as any).code as string).includes("Enter")) return;
        }
        const id = (document.querySelector("#id") as any).value
        if (id.length != 6) {
            setErrorMessage(text.confirm.errorId)
        } else {
            const res = await sendSongApi(id, vid)
            if (res != "success") return setErrorMessage(res)

            return ReactDOM.render(null, document.getElementById("ConfirmMenu"))
        }
    }
    return (
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                    <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <FontAwesomeIcon icon={faAdd} className="h-8" />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">{text.confirm.title}</h3>
                                    <div className="mt-2 flex flex-col">
                                        <input name='id' id='id' type={"text"} onKeyDown={(e) => sendSongReqeust(e)} placeholder={text.form.id} autoComplete={"off"}
                                            className="text-xl block w-full pl-4 rounded-md ring-1 ring-blue-light focus:ring-blue  focus:text-blue" />
                                        <p className='text-sm text-red-600'>{errorMessage}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="button" id="confirmButton" onClick={() => sendSongReqeust()} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white enabled:hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-75 disabled:cursor-default">確認點歌</button>
                            <button type="button" onClick={() => ReactDOM.render(null, document.getElementById("ConfirmMenu"))} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SongPage() {
    return (
        <div>
            <HeadInitalize
                title="22屆知足班 - 點歌系統"
                description="你是不是在煩惱到底要聽什麼歌？沒關係，我也幫不了你。但是你可以再想想看，要聽什麼歌，然後在這個網頁中搜尋！"
                icon="v1"
                thumbnail="song.jpg" />
            <Navbar Current="/songs" />
            <BreadCrumb current="/songs" className="mt-8"></BreadCrumb>
            <div className='mt-4 mx-8 xl:mx-48 lg:mx-16'>
                <Search />
                <div id="ConfirmMenu"></div>
            </div>
            <Footer />
        </div>
    )
}

export default SongPage