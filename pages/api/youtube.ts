import { NextApiRequest, NextApiResponse } from 'next'
import ytSearch from '../../utils/youtubeAPI';
import { db } from '../../utils/firebaseConfig';
const yt = new ytSearch()

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    try {
        let data: any = {}
        if (_req.method == 'GET') {
            const goal = _req.query.search;
            const other = _req.query;
            if (typeof (goal) != 'string') throw ({ message: "Not A Vaild Input" });
            if (goal.length > 256) throw ({ message: "Argument Too Long" });
            switch (goal.toLocaleLowerCase()) {
                case "liveabc":
                    data = await yt.playlistByChannel("UCep5rwaFo0yz2OvqG6VaRkA");
                    if (typeof (other.month) != 'string') throw ({ message: "Not A Vaild Input" });
                    if (parseInt(other.month) < 12 && parseInt(other.month) > 0) {
                        for (let item of data.items) {
                            const title: string = item.snippet.title
                            if (title.includes(`${other.month}月號`)) {
                                return res.redirect(`https://www.youtube.com/playlist?list=${item.id}`)
                            }
                        }
                        throw ({ message: "LiveABC Can only be recent 6 month" })
                    } else throw ({ message: "LiveABC Needs a Parament for 'month' and have to be 1 - 12" })
                    break;
                case "daai":
                    data = await yt.playlistByID("PLYfJOvcvKb2RKoGBujTZmPfRxbVdmFJtf");
                    return res.redirect(`https://youtu.be/${data.items[0].snippet.resourceId.videoId}`)
                default:
                    break;
            }
        } else if (_req.method == 'POST') {
            if (_req.headers.authorization != "I know this is easy, but don't Hack this!") return res.status(403).send({ operation: 'error', data: "Premission Deniend" });
            const req = JSON.parse(_req.body);
            const date = getNextFriday()
            const songRef = db.collection('songs').doc(date);
            const doc = await songRef.get();
            let updateData = {}
            updateData[req.id] = req.vid
            if (!doc.exists) {
                await db.collection('songs').doc(date).set(updateData);
            } else {
                const data = doc.data()
                const before = data[req.id]
                if (before) {
                    if (before.slice(0, 2) != "O@") {
                        updateData[req.id] = `O@${req.vid}`
                        db.collection('songs').doc(date).set(updateData, { merge: true });
                        return res.status(200).send({ operation: 'alert', data: 0 });
                    }
                    console.log(await yt.playlistDeleteSong(date, before.slice(2)))
                }
            }
            await db.collection('songs').doc(date).set(updateData, { merge: true });
            await yt.playlistAddSong(date, req.vid)
            return res.status(200).send({ operation: 'success', data: "success" });
        } else {
            const event = _req.body.events;
            console.log(event);
        }
        res.status(200).send({ operation: 'success', data: data });
    } catch (err: any) {
        res.status(500).json({ statusCode: 500, operation: 'error', message: err.message })
    }
}

function getNextFriday() {
    const Now = new Date()
    let addDays = 0
    switch (Now.getDay()) {
        case 6:
            addDays = 6
            break
        case 0:
            addDays = 5
            break
        default:
            addDays = 5 - Now.getDay()
            break
    }
    const Friday = new Date();
    Friday.setDate(Now.getDate() + addDays);
    return `${Friday.getFullYear()}${String(Friday.getMonth() + 1).padStart(2, '0')}${String(Friday.getDate()).padStart(2, '0')}`
}

export default handler
