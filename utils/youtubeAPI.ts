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
    public async videoByKeyword(keyword){
        const data = await this.sendData("GET", "search", {"part": "id, snippet", "q": keyword, "type": "video", maxResults: 12})
        return data
    }
    public async channelByID(id){
        const data = await this.sendData("GET", "channels", {"part": "snippet", "id": id})
        return data
    }
    public async playlistByID(playlistId, max = 3) {
        const data = await this.sendData("GET", "playlistItems", {"part": "id,snippet", "maxResults": max, "playlistId": playlistId});
        return data;
    }
    public async playlistByChannel(channelId, max = 6) {
        const data = await this.sendData("GET", "playlists", {part: "id, snippet", channelId: channelId, maxResults: max});
        return data;
    }
    public async playlistAddSong(title, vid){
        try{
            const res = await axios({
                method: "POST",
                url: `https://script.google.com/macros/s/AKfycbwAihm6NIqTgKqlA6YnOESma5RWG_UhvRMUiuzTLJYMuIjFVvNn1oFfUWKBR5PpU4wvwA/exec?title=${title}&vid=${vid}`,
            });
            return res.data
        }
        catch (err) { 
            if(err.response){ return(err.response.data); }
        }
    }
    public async playlistDeleteSong(title, vid){
        try{
            const res = await axios({
                method: "POST",
                url: `https://script.google.com/macros/s/AKfycbybb_Ln3pMCcd1SSQbeb23EPZrEjnWv0-fVBcDPaXxPqJV4s2xgsiwj1M6BM-4KRYQ25A/exec?title=${title}&vid=${vid}&option=DELETE`,
            });
            return res.data
        }
        catch (err) { 
            if(err.response){ return(err.response.data); }
        }
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