import axios from "axios";

export default class FakeYoutube {
    constructor() {

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
        return axios
        .get("../../videos/popular.json")
        .then(res => {
            return {items: res.data.items, pageToken: res.data.nextPageToken};});
    }

    async #getChannel(channelId) {
        return axios
        .get("../../videos/channel.json")
        .then(res => res.data.items);
    }

    async #getComment(videoId, nextPageToken) {
        return axios
        .get("../../videos/comments.json")
        .then(res => {
            return {items: res.data.items, pageToken: res.data.nextPageToken};});
    }

    async #getRelatedVideo(relatedVideoId,nextPageToken) {
        return axios
        .get("../../videos/related.json")
        .then((res)=>({items: res.data.items.map((item)=>({...item,id:item.id.videoId})), pageToken: res.data.nextPageToken}));
    }

    async #getVideoById(videoId) {
        return axios
        .get("../../videos/video.json")
        .then(res => res.data.items)
    }

    async #getVideoByKeyword(keyword,nextPageToken) {
        return axios
        .get("../../videos/search.json")
        .then((res)=>({items: res.data.items.map((item)=>({...item,id:item.id.videoId})), pageToken: res.data.nextPageToken}));
    }

}