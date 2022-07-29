import { NextApiRequest, NextApiResponse } from 'next'
import LineBot from '../../../utils/line-bot';

const bot = new LineBot(
  '1jFiXttWeXRsbc7xYIFvPsUVpOBSYMB93HDXvDAgLmybJq4+bNdYCyZf7SZIMxd6+96yaq1Re3WonVKQAz5MfaoGTQphHAzeOcaNObWxGCNrcJ6/RLir9TOOnUqi5JLwmrfN0k4XSAmN1qNl4MyJzAdB04t89/1O/w1cDnyilFU='
);

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (_req.method !== 'POST') {
      res.status(404).send({ message: '請使用Line傳送資料' });
      return;
    } else {
      const event = _req.body.events;
      console.log(event);
      bot.event(event).then(()=>{
        res.status(200).send({ operation: 'success' })
      })  
    }
  } catch (err: any) {
    console.log(err)
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
