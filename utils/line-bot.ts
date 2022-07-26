import { db } from "./firebaseConfig";

const axios = require('axios').default;
const cheerio = require('cheerio');

export default class LineBot {
  token: string;

  constructor(token: string) {
    this.token = token;
  }

  public event(eventArray) {
    for (const event of eventArray) {
      // console.log(event)
      switch (event.type) {
        case 'message':
          return this.messages(event);
        case 'postback':
          return this.postback(event);
        case 'follow':
          return this.follow(event);
        default:
          console.log(`收到的資料格式為 ${event.type}`);
          break;
      }
    }
  }
  private messages(e) {
    if (e.message.type == 'text') {
      if (ValidateIP(e.message.text)) {
        this.reply(e.replyToken, [
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
    if(e.message.type == "sticker"){
      this.reply(e.replyToken, [
        {
          "type": "text",
          "text": `幹嘛傳${e.message.keywords[Math.floor(Math.random() * e.message.keywords.length)]}給我？`
        }
      ])
    }
    return e;
  }
  private postback(e) {
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
    return res;
  }
  private async follow(e) {
    if (e.source.type != "user") return "Not a User";
    const data = await this.postData("GET", `https://api.line.me/v2/bot/profile/${e.source.userId}`)
    db.collection('line').doc(data.userId).set({
      id: data.userId,
      name: data.displayName,
      icon: data.pictureUrl,
      followed: true
    }, { merge: true });
    this.reply(e.replyToken, [
      {
        type: 'sticker',
        packageId: '6362',
        stickerId: '11087925'
      },
      {
        "type": "text",
        "text": "😳 歡迎加入22屆知足班 Line班帳！ 😳\n這裡什麼也不能幹嘛！但你可以去 22th.kami.tw 去看看有什麼需要用到我的東西。"
      }
    ])
  }
  public reply(replyToken, message) {
    this.postData("POST", 'https://api.line.me/v2/bot/message/reply', {
      replyToken: replyToken,
      messages: message
    });
  }
  public push(target, message) {
    this.postData("POST", 'https://api.line.me/v2/bot/message/push', {
      to: target,
      messages: message
    });
  }
  private async postData(method: "GET" | "POST" | "INSERT" | "PUT" | "UPDATE" | "DELETE", url, body?) {
    try {
      let data = {
        method: method,
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      }
      body ? data["body"] = JSON.stringify(body) : 0
      const res = await fetch(url, data)
      const resJson = await res.json()
      return resJson
    } catch (err) {
      console.log(err)
      return err
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
