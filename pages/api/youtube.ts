import { NextApiRequest, NextApiResponse } from 'next'
import ytSearch from '../../utils/youtubeAPI';
const yt = new ytSearch()

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    try {
        let data: any = {}
        if (_req.method == 'GET') {
            const goal = _req.query.search;
            const other = _req.query;
            if(typeof(goal) != 'string') throw({message: "Not A Vaild Input"});
            if(goal.length > 256) throw({message: "Argument Too Long"});
            switch(goal.toLocaleLowerCase()){
                case "liveabc":
                    data = await yt.playlistByChannel("UCep5rwaFo0yz2OvqG6VaRkA");
                    if(typeof(other.month) != 'string') throw({message: "Not A Vaild Input"});
                    if(parseInt(other.month) < 12 && parseInt(other.month) > 0){
                        for(let item of data.items){
                            const title: string = item.snippet.title
                            if(title.includes(`${other.month}月號`)){
                                return res.redirect(`https://www.youtube.com/playlist?list=${item.id}`)
                            }
                        }
                        throw({message: "LiveABC Can only be recent 6 month"})
                    }else throw({message: "LiveABC Needs a Parament for 'month' and have to be 1 - 12"})
                    break;
                case "daai":
                    data = await yt.playlistByID("PLYfJOvcvKb2RKoGBujTZmPfRxbVdmFJtf");
                    return res.redirect(`https://youtu.be/${data.items[0].snippet.resourceId.videoId}`)
                default:
                    break;
            }
        } else {
            const event = _req.body.events;
            console.log(event);
        }
        res.status(200).send({ operation: 'success', data: data });
    } catch (err: any) {
        res.status(500).json({ statusCode: 500, operation: 'error', message: err.message })
    }
}

export default handler
