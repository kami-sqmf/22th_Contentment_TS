import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../utils/firebaseConfig';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (_req.method == 'GET') {
            const cityRef = db.collection('teachers').doc('EDBAGeQwjF5koBr8qZZu');
            const doc = await cityRef.get();
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                console.log('Document data:', doc.data());
            }
            res.status(200).send({
                method: "GET",
                data: doc.data(),
                ..._req.query
            });
            return;
        } else {
            const event = _req.body.events;
            console.log(event);
        }
        res.status(200).send({ operation: 'success' });
    } catch (err: any) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}

export default handler
