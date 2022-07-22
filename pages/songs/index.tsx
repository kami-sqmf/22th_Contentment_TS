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
let override = 0

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
        if(resJson.operation == "success") return "success"
        if(resJson.operation == "alert") return text.confirm[`error${resJson.data}`]
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
                <p className='font-bold text-blue mt-1'>{title}</p>
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
            // const videoList = await yt.videoByKeyword(e.target.value)
            const videoList = {
                "kind": "youtube#searchListResponse",
                "etag": "o4x5EZf95fAQmbJu3vDH0-ghRG8",
                "nextPageToken": "CAwQAA",
                "regionCode": "TW",
                "pageInfo": {
                    "totalResults": 1000000,
                    "resultsPerPage": 12
                },
                "items": [
                    {
                        "kind": "youtube#searchResult",
                        "etag": "m3eiNnw9qEFUqlZQSf06qjXG3jM",
                        "id": {
                            "kind": "youtube#video",
                            "videoId": "1KN4DhVXw-Y"
                        },
                        "snippet": {
                            "publishedAt": "2020-08-11T15:00:00Z",
                            "channelId": "UClbieOB_NYcY9TlIthmyw-A",
                            "title": "yama - a.m.3:21 (Official Video)",
                            "description": "yama 4th Digital Single『a.m.3: 21』 ダウンロード 、 ストリーミング配信リンク https://linkco.re/X43EBret yama ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/1KN4DhVXw-Y/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/1KN4DhVXw-Y/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/1KN4DhVXw-Y/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "yama",
                            "liveBroadcastContent": "none",
                            "publishTime": "2020-08-11T15:00:00Z"
                        }
                    },
                    {
                        "kind": "youtube#searchResult",
                        "etag": "ydqajzUK-v6Rr8KioYBmY4XEbd0",
                        "id": {
                            "kind": "youtube#video",
                            "videoId": "lij8RpaZKZ4"
                        },
                        "snippet": {
                            "publishedAt": "2021-08-19T08:59:10Z",
                            "channelId": "UC9zY_E8mcAo_Oq772LEZq8Q",
                            "title": "yama - 麻痺 , a.m.3:21 / TFT FES vol.3 supported by Xperia &amp; 1000X Series",
                            "description": "「THE FIRST TAKE FES」は、ライブハウスからアーティストたちの一発撮りを鮮明に切り取るYouTubeコンテンツ。 観客なし。",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/lij8RpaZKZ4/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/lij8RpaZKZ4/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/lij8RpaZKZ4/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "THE FIRST TAKE",
                            "liveBroadcastContent": "none",
                            "publishTime": "2021-08-19T08:59:10Z"
                        }
                    },
                    {
                        "kind": "youtube#searchResult",
                        "etag": "RKsUzy_oJjypT4-m9CqVAhTUkdw",
                        "id": {
                            "kind": "youtube#video",
                            "videoId": "fsBKP1gZGz0"
                        },
                        "snippet": {
                            "publishedAt": "2021-09-11T07:21:11Z",
                            "channelId": "UCmm_uqEiPu_T3q2s1k2FGzg",
                            "title": "yama-a.m.3:21 lyrics 中/日/羅字幕",
                            "description": "Song：a.m.3:21 作詞：くじら 作曲：くじら Singer:yama Lyrics: 溶けた光の跡、甘い夢の中で Toketa hikari no ato, amai ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/fsBKP1gZGz0/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/fsBKP1gZGz0/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/fsBKP1gZGz0/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "杯兔Bato",
                            "liveBroadcastContent": "none",
                            "publishTime": "2021-09-11T07:21:11Z"
                        }
                    },
                    {
                        "kind": "youtube#searchResult",
                        "etag": "GLTpSJQX2BoC7GiTDS14F3qe058",
                        "id": {
                            "kind": "youtube#video",
                            "videoId": "BLqYNtiiqrs"
                        },
                        "snippet": {
                            "publishedAt": "2021-08-24T14:15:22Z",
                            "channelId": "UCA-x_p2coOIWWdDf80DQ8sA",
                            "title": "체념하지를 못하는 나 같아서🌙 : yama - a.m.3:21 [가사/발음/한글 자막/해석]",
                            "description": "한본냥 챠네루에 yama 등장!.! 새벽 감성 한본냥 키니이루 노래 잇쇼니 듣자냥!.! 노래에 쓰인 단어 공부하기     溶ける / とける ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/BLqYNtiiqrs/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/BLqYNtiiqrs/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/BLqYNtiiqrs/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "한본어 하는 고양이",
                            "liveBroadcastContent": "none",
                            "publishTime": "2021-08-24T14:15:22Z"
                        }
                    },
                    {
                        "kind": "youtube#searchResult",
                        "etag": "9wBnXrR-fdNKkPMgqepBQLjMZgk",
                        "id": {
                            "kind": "youtube#video",
                            "videoId": "IZltzA4IPJo"
                        },
                        "snippet": {
                            "publishedAt": "2020-08-11T21:37:58Z",
                            "channelId": "UCjECTR-8KJbUA9oXyP6yvpw",
                            "title": "【1時間耐久】a.m.3:21-yama（概要欄に歌詞あります）",
                            "description": "どうでもいいですが、今日スマホのカバー変えました. 本家様 https://youtu.be/1KN4DhVXw-Y yamaのTwitter ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/IZltzA4IPJo/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/IZltzA4IPJo/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/IZltzA4IPJo/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "とりにわ",
                            "liveBroadcastContent": "none",
                            "publishTime": "2020-08-11T21:37:58Z"
                        }
                    },
                    {
                        "kind": "youtube#searchResult",
                        "etag": "md7dOHnq5u9ZB5TEYWdguckZJdg",
                        "id": {
                            "kind": "youtube#video",
                            "videoId": "SMTQlUeqTts"
                        },
                        "snippet": {
                            "publishedAt": "2021-05-24T08:45:01Z",
                            "channelId": "UC9aZcYDIuOY9D5FwZtUHKqQ",
                            "title": "深夜テンションでベースを弾く高校生【 yama / a.m3:21】",
                            "description": "Instagram https://www.instagram.com/nishizuki_reon/ Twitter https://mobile.twitter.com/nishizuki_reon 原曲様 - yama / a.m3:21 ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/SMTQlUeqTts/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/SMTQlUeqTts/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/SMTQlUeqTts/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "西月麗音",
                            "liveBroadcastContent": "none",
                            "publishTime": "2021-05-24T08:45:01Z"
                        }
                    },
                    {
                        "kind": "youtube#searchResult",
                        "etag": "e2xjOrtP-t-9Ddc70KqWMoqJRjU",
                        "id": {
                            "kind": "youtube#video",
                            "videoId": "p1F3p8NRtq4"
                        },
                        "snippet": {
                            "publishedAt": "2021-07-17T20:30:05Z",
                            "channelId": "UCOu-805Ep3s2BEKxVvS5VPA",
                            "title": "|| Yama - a.m. 3:21 || Sub. Esp!",
                            "description": "Hola grishitos! ésta vez traigo una traducción de una canción que me encanta mucho! Canción: a.m. 3 : 21 Cantante: Yama ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/p1F3p8NRtq4/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/p1F3p8NRtq4/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/p1F3p8NRtq4/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "*Ryu-Ko -San!*",
                            "liveBroadcastContent": "none",
                            "publishTime": "2021-07-17T20:30:05Z"
                        }
                    },
                    {
                        "kind": "youtube#searchResult",
                        "etag": "4MKf9YkRisllb1dnfL-jIB2QwfU",
                        "id": {
                            "kind": "youtube#video",
                            "videoId": "iG_hhCus4Yo"
                        },
                        "snippet": {
                            "publishedAt": "2020-08-12T03:40:55Z",
                            "channelId": "UC289b5RSRrGsKGICKYmgrUg",
                            "title": "【作業用】yama-a.m3:21",
                            "description": "聞いた瞬間好きになりました((聞いてない まだ出たばかりでこの動画の作業用は 自分がはじめてかな？(´^∀^｀) リクエストなど ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/iG_hhCus4Yo/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/iG_hhCus4Yo/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/iG_hhCus4Yo/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "Orion _",
                            "liveBroadcastContent": "none",
                            "publishTime": "2020-08-12T03:40:55Z"
                        }
                    },
                    {
                        "kind": "youtube#searchResult",
                        "etag": "ZgCTM8xHxLUqMUUsbIJhiDOauaw",
                        "id": {
                            "kind": "youtube#video",
                            "videoId": "DC6JppqHkaM"
                        },
                        "snippet": {
                            "publishedAt": "2020-04-16T15:00:10Z",
                            "channelId": "UClbieOB_NYcY9TlIthmyw-A",
                            "title": "yama - 春を告げる (Official Video)",
                            "description": "yama 1st Digital Single『春を告げる』 ダウンロード 、 ストリーミング配信リンク https://linkco.re/6mYzQdtt yama ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/DC6JppqHkaM/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/DC6JppqHkaM/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/DC6JppqHkaM/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "yama",
                            "liveBroadcastContent": "none",
                            "publishTime": "2020-04-16T15:00:10Z"
                        }
                    },
                    {
                        "kind": "youtube#searchResult",
                        "etag": "gpkG7s3Vv-g9ObzjFy_JLRsVZ1Q",
                        "id": {
                            "kind": "youtube#video",
                            "videoId": "R0ZTPq_23aw"
                        },
                        "snippet": {
                            "publishedAt": "2021-08-15T09:00:15Z",
                            "channelId": "UC_Kp-0JwvCbsHqoYUIUjn7A",
                            "title": "a.m.3:21/yama【カラオケ】【ガイドメロなし】上級者向け本格伴奏カラオケ",
                            "description": "無料の高品質、本格伴奏のカラオケはoffice I-town!! yamaさんとクジラさんの強力タッグ！ まさに\"エモい\"この曲をどうぞ。",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/R0ZTPq_23aw/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/R0ZTPq_23aw/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/R0ZTPq_23aw/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "【無料のカラオケ音源】office I-town pre",
                            "liveBroadcastContent": "none",
                            "publishTime": "2021-08-15T09:00:15Z"
                        }
                    },
                    {
                        "kind": "youtube#searchResult",
                        "etag": "rdkHWrZOZV7gmrXVVW4_M15c_dc",
                        "id": {
                            "kind": "youtube#video",
                            "videoId": "IjS0kPxFmSw"
                        },
                        "snippet": {
                            "publishedAt": "2020-11-11T11:00:04Z",
                            "channelId": "UCyMZeQAVzNFAveAt5S44PFw",
                            "title": "a.m.3:21 - yama | YDK Apartment",
                            "description": "YDK Apartmentです   Studio,Travel,School を中心に色々な僕らを配信していきます、 高評価、チャンネル登録よろしくお願いし ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/IjS0kPxFmSw/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/IjS0kPxFmSw/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/IjS0kPxFmSw/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "YDK Apartment",
                            "liveBroadcastContent": "none",
                            "publishTime": "2020-11-11T11:00:04Z"
                        }
                    },
                    {
                        "kind": "youtube#searchResult",
                        "etag": "0y-Prwgqy2jI_Y68xNr_83WYsIM",
                        "id": {
                            "kind": "youtube#video",
                            "videoId": "Ewt5Bd8VR78"
                        },
                        "snippet": {
                            "publishedAt": "2021-08-29T10:01:22Z",
                            "channelId": "UCqboXUgTe1T90jrQnxTlMfw",
                            "title": "a.m.3:21 - From THE FIRST TAKE",
                            "description": "Provided to YouTube by Sony Music Labels Inc. a.m.3:21 - From THE FIRST TAKE · yama the meaning of life ℗ 2021 THE FIRST ...",
                            "thumbnails": {
                                "default": {
                                    "url": "https://i.ytimg.com/vi/Ewt5Bd8VR78/default.jpg",
                                    "width": 120,
                                    "height": 90
                                },
                                "medium": {
                                    "url": "https://i.ytimg.com/vi/Ewt5Bd8VR78/mqdefault.jpg",
                                    "width": 320,
                                    "height": 180
                                },
                                "high": {
                                    "url": "https://i.ytimg.com/vi/Ewt5Bd8VR78/hqdefault.jpg",
                                    "width": 480,
                                    "height": 360
                                }
                            },
                            "channelTitle": "yama - Topic",
                            "liveBroadcastContent": "none",
                            "publishTime": "2021-08-29T10:01:22Z"
                        }
                    }
                ]
            }
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
        }else{
            const res = await sendSongApi(id, vid)
            if( res != "success") return setErrorMessage(res)
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
                title="22屆知足班"
                description="歡迎來到高一知足班的大家庭，這裡充滿著歡樂以及笑容，但也可能充滿了黑暗。但其實最重要的還是我們大家一起經歷過，為高中生活留下美好為來吧！"
                icon="v1"
                thumbnail="weikai.jpg" />
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