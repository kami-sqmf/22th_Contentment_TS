const axios = require('axios').default;

type SendReq = {
    method: "GET"|"POST"|"INSERT"|"PUT"|"UPDATE"|"DELETE",
    headers?: {Authorization: string},
    url: string,
    baseURL: `https://www.googleapis.com/youtube/v3`,
    body?: any
    params?: any
}

export default class ytSearch {
    private token: string = "AIzaSyCeoq7Q2biFTZofWwvnAtXcezTHXhc3gXk";
    public async playlistByID(playlistId, max = 3) {
        const data = await this.sendData("GET", "playlistItems", {"part": "id,snippet", "maxResults": max, "playlistId": playlistId});
        return data;
    }
    public async playlistByChannel(channelId, max = 6) {
        const data = await this.sendData("GET", "playlists", {part: "id, snippet", channelId: channelId, maxResults: max});
        return data;
    }
    private async sendData(method: "GET"|"POST"|"INSERT"|"PUT"|"UPDATE"|"DELETE", url, body) {
        let sendReq: SendReq = {
            method: method,
            url: url,
            baseURL: `https://www.googleapis.com/youtube/v3`,
        }
        if(method = "GET"){
            sendReq = {
                ...sendReq,
                params: {
                    ...body,
                    key: this.token
                }
            }
        }else{
            sendReq = {
                ...sendReq,
                body: body
            }
        }
        try{ const res = await axios(sendReq); return res.data}
        catch (err) { if(err.response){ return(err.response.data); }
        }
    }
}