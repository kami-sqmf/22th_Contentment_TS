import { createWriteStream } from "fs";
import { getNextFriday } from "../pages/api/youtube";
import { bucket, db } from "./firebaseConfig";
import ytSearch from "./youtubeAPI";


const axios = require('axios').default;
const cheerio = require('cheerio');
const yt = new ytSearch()
const listener = new Map()

type SendReq = {
  method: "GET" | "POST" | "INSERT" | "PUT" | "UPDATE" | "DELETE",
  headers?: { Authorization: string; "Content-Type"?: string },
  url: string,
  baseURL: `https://api.line.me/v2/bot`,
  data?: any
  params?: any
}

export default class LineBot {
  public token: string;
  constructor(token: string) {
    this.token = token;
  }

  public async event(eventArray) {
    for (const event of eventArray) {
      // console.log(event)
      switch (event.type) {
        case 'message':
          return await this.messages(event);
        case 'postback':
          return await this.postback(event);
        case 'follow':
          return await this.follow(event);
        default:
          console.log(`收到的資料格式為 ${event.type}`);
          return await event;
          break;
      }
    }
  }
  private async messages(e) {
    if (listener.get(e.source.userId)) {
      const data = { data: listener.get(e.source.userId), ...e }
      if (data.data.type == "changeProfile") return this.reply(data.replyToken, await changeProfile(data, data.data.action));
    }
    if (e.message.type == 'text') {
      // Listener
      if (listener.get(e.source.userId)) {
        const data = { data: listener.get(e.source.userId), ...e }
        if (data.data.type == "members") return this.reply(data.replyToken, await members(data));
        return;
      }
      // Admin
      if (e.source.userId == "Ucdcc5532e5c8738f5d53b2d3d43cc4b9") {
        if (e.message.text == "Admin") {
          return this.reply(e.replyToken, [{
            type: "flex",
            altText: "看到了嗎？這就是管理員選單！",
            contents: Menu('管理員指令選單', [{
              type: "postback",
              label: "LiveABC 月份管理",
              action: "liveabc"
            }, {
              type: "postback",
              label: "管理老師",
              action: "type=members&action=callMenu&object=teachers"
            }, {
              type: "postback",
              label: "管理學生",
              action: "type=members&action=callMenu&object=students"
            }, {
              type: "postback",
              label: "管理懿德爸媽",
              action: "type=members&action=callMenu&object=tzuyi"
            }])
          }])
        }
      }
      // 一般
      if (e.message.text.includes("資料異動")) {
        return this.reply(e.replyToken, await changeProfile(e, "Main"))
      }
      if (e.message.text.includes("IG異動")) {
        return this.reply(e.replyToken, await changeProfile(e, "instagram"))
      }
      if (e.message.text.includes("生日異動")) {
        return this.reply(e.replyToken, await changeProfile(e, "birth"))
      }
      if (e.message.text.includes("自我介紹異動")) {
        return this.reply(e.replyToken, await changeProfile(e, "bio"))
      }
      if (e.message.text.includes("姓名異動")) {
        return this.reply(e.replyToken, await changeProfile(e, "nameCh"))
      }
      if (e.message.text.includes("座號異動")) {
        return this.reply(e.replyToken, await changeProfile(e, "index"))
      }
      if (e.message.text.includes("暱稱異動")) {
        return this.reply(e.replyToken, await changeProfile(e, "nameEn"))
      }
      if (e.message.text.includes("照片異動")) {
        return this.reply(e.replyToken, await changeProfile(e, "avatar"))
      }
      if (e.message.text.includes("歌單")) {
        const getSong = new SongList()
        await getSong.importSong(getNextFriday())
        return this.reply(e.replyToken, [{
          type: "flex",
          altText: "看到了嗎？這就是管理員選單！",
          contents: getSong.output()
        }])
      }
      if (ValidateIP(e.message.text)) {
        return this.reply(e.replyToken, [
          {
            type: 'text', // ①
            text: '偵測到 IP 網址！\n是否為電子白板，並分享至班群？',
            quickReply: {
              // ②
              items: [
                {
                  type: 'action',
                  action: {
                    type: 'postback',
                    label: '進行發送',
                    data: `type=note&action=send&url=${e.message.text}`,
                    displayText: '進行發送'
                  }
                },
                {
                  type: 'action',
                  action: {
                    type: 'postback',
                    label: '不發送',
                    data: 'type=note&action=send',
                    displayText: '取消目前操作'
                  }
                }
              ]
            }
          }
        ]);
      }
    }
    if (e.message.type == "sticker") {
      const text = e.message.keywords ? `幹嘛傳${e.message.keywords[Math.floor(Math.random() * e.message.keywords.length)]}給我？` : `這個貼圖怎麼好像你啊？`
      return this.reply(e.replyToken, [
        {
          "type": "text",
          "text": text
        }
      ])
    }

    if (e.message.type == "image") {
      // Normal
      const text = `好澀喔！竟然傳你的照片給我？`
      return this.reply(e.replyToken, [
        {
          "type": "text",
          "text": text
        }
      ])
    }
    return e;
  }
  private async postback(e) {
    const recieved = e.postback.data.split('&');
    let data = {};
    for (const e of recieved) {
      const info = e.split('=');
      data[info[0]] = info[1];
    }
    const res = { ...e, data: { ...data } };
    if (res.data.type == 'note') {
      getWhiteboardImages(`${res.data.url}&id=${res.data.id}`).then((imagesURL) => {
        let sendBody = [];
        for (let i = 0; i < imagesURL.length; i += 5) {
          let seperatedBody = [];
          for (let j = i; j < i + 5; j++) {
            imagesURL[j] ? seperatedBody.push(imagesURL[j]) : 0;
          }
          sendBody.push(seperatedBody);
        }
        for (const body of sendBody) {
          let singleBody = [];
          for (const e of body) {
            singleBody.push({
              type: 'image',
              originalContentUrl: `https://images.weserv.nl/?url=60.250.138.138:10002${e}`,
              previewImageUrl: `https://images.weserv.nl/?url=60.250.138.138:10002${e}`
            });
          }
          this.reply(res.replyToken, singleBody);
          this.push('', singleBody);
        }
      });
    }
    if (res.data.type == 'members') {
      let objCh = ""
      switch (res.data.object) {
        case "teachers":
          objCh = "老師"
          break;
        case "students":
          objCh = "學生"
          break
        case "tzuyi":
          objCh = "懿德爸媽"
          break
      }
      if (res.data.action == "callMenu") {
        return this.reply(res.replyToken, [{
          type: "flex",
          altText: "看到了嗎？這就是管理員選單！",
          contents: Menu(`${objCh}管理`, [{
            type: "postback",
            label: `新增${objCh}`,
            action: `type=members&action=add&object=${res.data.object}`
          }, {
            type: "postback",
            label: `編輯${objCh}`,
            action: `type=members&action=edit&object=${res.data.object}`
          }, {
            type: "postback",
            label: `讀取${objCh}清單`,
            action: `type=members&action=list&object=${res.data.object}`
          }])
        }])
      }
      const objectCol = db.collection(res.data.object);
      if (res.data.action == "add") {
        this.reply(res.replyToken, [
          {
            "type": "text",
            "text": `請輸入欲新增${objCh}姓名`
          }])
        // Start Conerstation
        listener.set(res.source.userId, {
          type: res.data.type,
          object: res.data.object,
          action: res.data.action,
          progress: 0,
          data: {}
        })
      }
      else if (res.data.action == "edit") {

      }
      else if (res.data.action == "list") {
        const col = await objectCol.get();
        if (res.data.object != "tzuyi") {
          col.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
          });
        }
      }
      return res;
    }
  }
  private async follow(e) {
    if (e.source.type != "user") return "Not a User";
    let message: any = [
      {
        type: 'sticker',
        packageId: '6362',
        stickerId: '11087925'
      },
      {
        "type": "text",
        "text": "😳 歡迎加入22屆知足班 Line班帳！ 😳\n這裡什麼也不能幹嘛！但你可以去 22th.kami.tw 去看看有什麼需要用到我的東西。"
      }
    ]
    const data = await this.postData("GET", `/profile/${e.source.userId}`)
    const stuRef = db.collection('students');
    const snapshot = await stuRef.where('line', '==', data.displayName).get();
    let setData = {
      ...data,
      followed: true,
    }
    if (!snapshot.empty) {
      snapshot.forEach(doc => {
        setData["profile"] = db.collection('students').doc(doc.id)
        message.push({
          "type": "text",
          "text": `根據我這個小雞雞的計算 🧮，${parseInt(doc.id) <= 10039 ? "你" : "妳"}應該是『 ${doc.data().nameCh} 』對吧？`
        })
        message.push({
          "type": "text",
          "text": `如果${parseInt(doc.id) <= 10039 ? "你" : "妳"}想要更改自己在班網的資訊請輸入『 資料異動 』或點選下方的按鈕！`,
          "quickReply": {
            "items": [
              {
                "type": "action",
                "action": {
                  "type": "message",
                  "label": "點我更改班網資料",
                  "text": "資料異動"
                }
              },
            ]
          }
        })
      });
    } else {
      message.push({
        "type": "text",
        "text": `根據我這個小雞雞的計算，您應該不是貴班的學生！如果您是的話請幫我告訴湯哥！`
      })`q`
    }
    db.collection('line').doc(data.userId).set(setData, { merge: true });
    this.reply(e.replyToken, message)
  }
  public reply(replyToken, message) {
    this.postData("POST", '/message/reply', {
      replyToken: replyToken,
      messages: message
    });
  }
  public push(target, message) {
    this.postData("POST", '/message/push', {
      to: target,
      messages: message
    });
  }
  private async postData(method: "GET" | "POST" | "INSERT" | "PUT" | "UPDATE" | "DELETE", url, body?) {
    let sendReq: SendReq = {
      method: method,
      url: url,
      baseURL: `https://api.line.me/v2/bot`,
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json"
      }
    }
    if (method == "GET") {
      sendReq = {
        ...sendReq,
        params: {
          ...body,
        }
      }
    } else {
      sendReq = {
        ...sendReq,
        data: JSON.stringify(body)
      }
    }
    try { const res = await axios(sendReq); return res.data }
    catch (err) {
      if (err.response) {
        console.log(err.response.data)
        throw err.response.data
      } else {
        console.log(err)
        throw err
      }
    }
  }
}

function ValidateIP(URL: string) {
  const IP = URL.slice(7).split(':')[0];
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      IP
    )
  ) {
    return true;
  }
  return false;
}

async function getWhiteboardImages(url: string) {
  let URL = [];
  const res = await axios.get(url, {
    withCredentials: true,
    maxRedirects: 5,
    headers: {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      Cookie: 'JSESSIONID=DA87AD8355EB6FAE9618B2B2645502F2',
      DNT: '1',
      Host: '60.250.138.138:10005',
      Pragma: 'no-cache'
    }
  });
  const $ = cheerio.load(res.data);
  $('img').each(function () {
    URL.push(this.attribs.src);
  });
  return URL;
}

const Menu = (title: string, options: Array<{
  style?: "primary" | "secondary" | "link",
  type: "postback",
  label: string,
  action: string
}>) => {
  let contents = []
  for (const option of options) {
    contents.push({
      "type": "button",
      "style": option.style ? option.style : "link",
      "height": "sm",
      "action": {
        "type": option.type,
        "label": option.label,
        "data": option.action
      }
    })
  }
  return ({
    "type": "bubble",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": title,
          "weight": "bold",
          "size": "xl"
        },
        {
          "type": "text",
          "text": "這裡感覺需要一點東西，但又不知道有什麼東西可以放在這裡，所以就打這個吧。",
          "size": "xs",
          "wrap": true
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "spacing": "sm",
      "contents": contents,
      "flex": 0
    }
  })
}

class SongList {
  private base: any = {
    "type": "bubble",
    "header": {
      "type": "box",
      "layout": "baseline",
      "contents": [
        {
          "type": "text",
          "text": "本週歌單",
          "size": "xl",
          "weight": "bold"
        },
        {
          "type": "text",
          "text": "2022/07/23",
          "align": "end"
        }
      ]
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [{
        "type": "text",
        "text": "本週還沒有人點歌ㄛ！",
        "weight": "bold"
      }]
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "button",
          "action": {
            "type": "uri",
            "label": "新增歌曲",
            "uri": "https://22th.kami.tw/songs"
          }
        }
      ]
    }
  }
  public async importSong(date: string) {
    this.base.header.contents[1].text = date
    const songRef = db.collection('songs').doc(date);
    const doc = await songRef.get();
    if (doc.exists) {
      this.base.body.contents.pop()
      let videos = []
      for (const [key, value] of Object.entries(doc.data())) {
        let resBase = {
          "type": "box",
          "margin": "sm",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "Rick Astley - Never Gonna Give You Up (Official Music Video)",
              "weight": "bold"
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "image",
                  "url": "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
                  "align": "start",
                  "flex": 1,
                  "size": "lg",
                  "aspectRatio": "16:9"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "text",
                          "text": "頻道：",
                          "weight": "bold"
                        },
                        {
                          "type": "text",
                          "text": "Rick Astley",
                          "size": "sm"
                        }
                      ]
                    },
                    {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "text",
                          "text": "點歌者：",
                          "weight": "bold"
                        },
                        {
                          "type": "text",
                          "text": "010008",
                          "size": "sm"
                        }
                      ]
                    }
                  ],
                  "flex": 1,
                  "justifyContent": "space-around"
                }
              ],
              "margin": "sm"
            }
          ],
          "action": {
            "type": "uri",
            "label": "Link to Youtube",
            "uri": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          }
        }
        let songId = value.slice(0, 2) == "O@" ? value.slice(2) : value
        videos.push(songId)
        resBase.contents[1].contents[1].contents[1].contents[1].text = key
        this.base.body.contents.push(resBase)
      }
      const ytRes = (await yt.videoByIds(videos)).items
      for (let i = 0; i < ytRes.length; i++) {
        this.base.body.contents[i].action.uri = `https://youtu.be/${ytRes[i].id}`
        this.base.body.contents[i].contents[0].text = ytRes[i].snippet.title
        this.base.body.contents[i].contents[1].contents[0].url = ytRes[i].snippet.thumbnails.medium.url
        this.base.body.contents[i].contents[1].contents[1].contents[0].contents[1].text = ytRes[i].snippet.channelTitle
      }
    }
  }
  public output() {
    return this.base
  }
}

async function members(data) {
  console.log(data.data)
  // 0 : 姓名
  if (data.data.progress == 0) {
    data.data.data["nameCh"] = data.message.text;
    data.data.progress++;
    return [{
      "type": "text",
      "text": `請輸入${data.message.text}的英文名字`
    }]
  }
  // 1 : 英文姓名
  if (data.data.progress == 1) {
    data.data.data["nameEn"] = data.message.text;
    data.data.progress++;
    return [{
      "type": "text",
      "text": `請輸入${data.message.text}的英文名字`
    }]
  }
  // 2 : 學號
  if (data.data.progress == 2) {
    data.data.data["id"] = data.message.text;
    data.data.progress++;
    return [{
      "type": "text",
      "text": `請輸入${data.message.text}的學號`
    }]
  }
  // 3 : 座號
  if (data.data.progress == 3) {
    data.data.data["index"] = data.message.text;
    data.data.progress++;
    return [{
      "type": "text",
      "text": `請輸入${data.message.text}的座號`
    }]
  }
}

function indexToId(index) {
  if (index < 19) {
    if (index < 10) {
      return "01000" + index.toString()
    } else {
      return "0100" + index.toString()
    }
  } else if (index == 19) {
    return "010039"
  } else if (index > 19) {
    return "010" + (109 + index - 20).toString()
  }
}

//: { nameCh: string;avatar: string;instagram: string;nameEn: string;isClassmate: boolean;index: number;email: string;birth: string;id: string;bio: string}
const profileFlex = (profile) => {
  return (
    {
      "type": "bubble",
      "hero": {
        "type": "image",
        "url": profile.avatar,
        "size": "full",
        "action": {
          "type": "uri",
          "uri": profile.avatar
        },
        "aspectMode": "cover"
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "box",
            "layout": "baseline",
            "contents": [
              {
                "type": "text",
                "weight": "bold",
                "size": "xl",
                "text": profile.nameCh,
                "flex": 2
              },
              {
                "type": "text",
                "color": "#aaaaaa",
                "size": "sm",
                "flex": 1,
                "text": `${profile.index}號 ${profile.nameEn}`
              }
            ]
          },
          {
            "type": "box",
            "layout": "vertical",
            "margin": "lg",
            "spacing": "sm",
            "contents": [
              {
                "type": "box",
                "layout": "baseline",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "text",
                    "text": "生日",
                    "color": "#aaaaaa",
                    "size": "sm",
                    "flex": 2
                  },
                  {
                    "type": "text",
                    "text": `${parseInt((parseInt(profile["birth"]) % 10000 / 100).toString())} 月 ${(parseInt(profile["birth"]) % 100).toString()} 號`,
                    "wrap": true,
                    "color": "#666666",
                    "size": "sm",
                    "flex": 5
                  }
                ]
              },
              {
                "type": "box",
                "layout": "baseline",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "text",
                    "text": "Instagram",
                    "color": "#aaaaaa",
                    "size": "sm",
                    "flex": 2
                  },
                  {
                    "type": "text",
                    "text": profile.instagram,
                    "wrap": true,
                    "color": "#666666",
                    "size": "sm",
                    "flex": 5,
                    "action": {
                      "type": "uri",
                      "label": "action",
                      "uri": `https://instagram.com/${profile.instagram}`
                    }
                  }
                ]
              },
              {
                "type": "box",
                "layout": "baseline",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "text",
                    "text": "自我介紹",
                    "color": "#aaaaaa",
                    "size": "sm",
                    "flex": 2
                  },
                  {
                    "type": "text",
                    "text": profile.bio ? profile.bio : "（尚未輸入）",
                    "wrap": true,
                    "color": "#666666",
                    "size": "sm",
                    "flex": 5
                  }
                ]
              }
            ]
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "button",
            "style": "link",
            "height": "sm",
            "action": {
              "type": "message",
              "label": "更正IG",
              "text": "IG異動"
            }
          },
          {
            "type": "button",
            "style": "link",
            "height": "sm",
            "action": {
              "type": "message",
              "label": "更正生日",
              "text": "生日異動"
            }
          },
          {
            "type": "button",
            "action": {
              "type": "message",
              "label": "更正自我介紹",
              "text": "自我介紹異動"
            },
            "style": "link",
            "height": "sm"
          },
          {
            "type": "button",
            "action": {
              "type": "message",
              "label": "更正暱稱",
              "text": "暱稱異動"
            },
            "style": "link",
            "height": "sm"
          },
          {
            "type": "button",
            "action": {
              "type": "message",
              "label": "更正照片",
              "text": "照片異動"
            },
            "style": "link",
            "height": "sm"
          }
        ],
        "flex": 0
      }
    }
  )
}

async function changeProfile(data, type) {
  if (type == "Main") {
    const lineRef = db.collection("line").doc(data.source.userId)
    const res = await lineRef.get()
    if (res.exists) {
      const profile = await res.data().profile.get()
      return ([{
        "type": "flex",
        "altText": `我是${parseInt(profile.data().id) <= 10039 ? "你" : "妳"}命中註定的通知`,
        "contents": profileFlex(profile.data())
      }])
    } else {
      return ([{
        type: "text",
        text: "您不是本班成員吧？"
      }])
    }
  }
  else if (type == "avatar" && data.message.type == "image") {
    try {
      const response = await axios({
        method: "GET",
        url: `https://api-data.line.me/v2/bot/message/${data.message.id}/content`,
        responseType: "stream",
        headers: {
          Authorization: `Bearer 1jFiXttWeXRsbc7xYIFvPsUVpOBSYMB93HDXvDAgLmybJq4+bNdYCyZf7SZIMxd6+96yaq1Re3WonVKQAz5MfaoGTQphHAzeOcaNObWxGCNrcJ6/RLir9TOOnUqi5JLwmrfN0k4XSAmN1qNl4MyJzAdB04t89/1O/w1cDnyilFU=`,
        }
      });
      const contentType = response.headers['content-type'];
      let extension = ""
      if (contentType == "image/jpeg") extension = "jpg"
      if (contentType == "image/gif") extension = "gif"
      if (contentType == "image/bmp") extension = "bmp"
      const w = response.data.pipe(createWriteStream(`public/temp/${data.message.id}.${extension}`));
      w.on('finish', async () => {
        const upload = await bucket.upload(`public/temp/${data.message.id}.${extension}`, { destination: `students/${data.message.id}.${extension}` })
        const link = await upload[0].getSignedUrl({
          action: 'read',
          expires: '03-09-2491'
        })
        const lineRef = db.collection("line").doc(data.source.userId)
        const res = await lineRef.get()
        const profile = await res.data().profile
        profile.set({ avatar: link[0] }, { merge: true })
      });
      listener.delete(data.source.userId)
      return [{
        "type": "text",
        "text": `已經更改您的照片`
      }]
    } catch (err) {
      return [{
        "type": "text",
        "text": `失敗了ＱＱ`
      }]
    }
  }
  else if (data.data && !(data.message.text as string).includes("異動")) {
    if (data.message.type != "text") return [{
      "type": "text",
      "text": `格式錯誤，請再輸入一次`
    }]
    if (type == "birth") {
      if (!((parseInt(data.message.text) / 10000 < 2500) && (parseInt(data.message.text) / 10000 > 1900)))
        return [{
          "type": "text",
          "text": `格式錯誤，請再輸入一次`
        }]
    }
    const lineRef = db.collection("line").doc(data.source.userId)
    const res = await lineRef.get()
    const profile = await res.data().profile
    const change = {}
    change[type] = data.message.text
    profile.set(change, { merge: true })
    listener.delete(data.source.userId)
    return [{
      "type": "text",
      "text": `變更成功！`
    }]
  }
  else {
    listener.set(data.source.userId, {
      type: "changeProfile",
      action: type
    })
    const message = [{
      type: "text",
      text: `請輸入欲更改的${data.message.text.slice(0, -2)}`
    }]
    switch (type) {
      case "avatar":
        message.pop()
        message.push({
          type: "text",
          text: `請傳送欲更改的照片 (支援 GIF)`
        })
        break;
      case "instagram":
        message.push({
          type: "text",
          text: `IG帳號名！ eg. aprilyang4605`
        })
        break
      case "birth":
        message.push({
          type: "text",
          text: `生日格式為『 西元年 月份 日 \n』eg. 20060229`
        })
        break
    }
    return message
  }
}
