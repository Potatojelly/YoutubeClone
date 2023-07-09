import axios from "axios";

export default class Youtube {
    constructor() {
        this.httpClinet = axios.create({
            baseURL: "https://youtube.googleapis.com/youtube/v3",
            params: {key:process.env.REACT_APP_YOUTUBE_API_KEY},
        });
    } 

    async searchPopular(nextPageToken) {
        return this.#getPopular(nextPageToken);
    }

    async searchChannel(channelId) {
        return this.#getChannel(channelId);
    }

    async searchComment(videoId,nextPageToken) {
        return this.#getComment(videoId,nextPageToken);
    }

    async searchRelatedVideo(relatedVideoId,nextPageToken) {
        return this.#getRelatedVideo(relatedVideoId,nextPageToken);
    }

    async searchByVideoId(videoId) {
        return this.#getVideoById(videoId);
    }

    async searchByKeyword(keyword,nextPageToken) {
        return this.#getVideoByKeyword(keyword,nextPageToken);
    }

    async #getPopular(nextPageToken) {
        return this.httpClinet
        .get("videos", {params: {
            part: "snippet,statistics",
            maxResults: 20,
            chart: "mostPopular",
            pageToken: nextPageToken,
        }})
        .then(res => {
            return {items: res.data.items, pageToken: res.data.nextPageToken};});
    }

    async #getChannel(channelId) {
        return this.httpClinet
        .get("channels",{params: {
            part: "snippet,statistics",
            id: channelId,
        }})
        .then(res => res.data.items);
    }

    async #getComment(videoId, nextPageToken) {
        return this.httpClinet
        .get("commentThreads",{params: {
            part: "snippet,replies",
            maxResults: 10,
            videoId: videoId,
            pageToken: nextPageToken,
        }})
        .then(res => {
            return {items: res.data.items, pageToken: res.data.nextPageToken};});
    }

    async #getRelatedVideo(relatedVideoId,nextPageToken) {
        return this.httpClinet
        .get("search",{params: {
            part: "snippet",
            relatedToVideoId: relatedVideoId,
            maxResults: 7,
            type: "video",
            pageToken: nextPageToken,
        }})
        .then((res)=>({items: res.data.items.map((item)=>({...item,id:item.id.videoId})), pageToken: res.data.nextPageToken}));
    }

    async #getVideoById(videoId) {
        
        return this.httpClinet
        .get("videos",{params: {
            part: "snippet,statistics",
            id: videoId,
        }})
        .then(res => res.data.items)
    }

    async #getVideoByKeyword(keyword,nextPageToken) {
        console.log("called!");
        return this.httpClinet
        .get("search",{params: {
            part: "snippet",
            maxResults: 7,
            q: keyword,
            pageToken: nextPageToken,
        }})
        .then((res)=>({items: res.data.items.map((item)=>({...item,id:item.id.videoId})), pageToken: res.data.nextPageToken}));
    }

}