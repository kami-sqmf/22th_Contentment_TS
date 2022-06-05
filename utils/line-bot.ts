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
  public reply(replyToken, message) {
    this.postData('https://api.line.me/v2/bot/message/reply', {
      replyToken: replyToken,
      messages: message
    });
  }
  public push(target, message) {
    this.postData('https://api.line.me/v2/bot/message/push', {
      to: target,
      messages: message
    });
  }
  private postData(url, body) {
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then((data) => data.json())
      .then((data) => (data == null ? console.log(data) : 0))
      .catch((error) => console.error(error));
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
