import React from 'react';
import styles from './VideoCard.module.css'

export default function VideoCard({video}) {
    const {title,channelTitle,publishedAt} = video.snippet;
    const {url} = video.snippet.thumbnails.default;
    const {viewCount} = video.statistics;
    const date = getDateDiff(publishedAt);
    const views = getViews(viewCount);
    return (
        <div className={styles.videoCard}>
            <img src={url} alt="thumnail" className={styles.thumnail}/>
            <div className={styles.detail}>
                <div className={styles.logo}></div>
                <div className={styles.content}>
                    <p className={styles.title}>{title && title}</p>
                    <p className={styles.channel}>{channelTitle}</p>
                    <p className={styles.viewHour}>{`${views} ${date}`}</p>
                </div>
    
            </div>
        </div>
    );
};

function getDateDiff(publishedAt) {
    const today = new Date();
    const publishedDate = new Date(publishedAt);
    const diff = Math.abs(publishedDate.getTime()-today.getTime());
    let result = {};
    let print;
    if (diff < (1000 * 60 * 60) ) { //min
        result = Math.ceil(diff / (1000 * 60));
        result === 1 ? print = `${result} minute ago` : print = `${result} minutes ago`
    } else if(diff < (1000 * 60 * 60 * 24)) { //hour
        result = Math.ceil(diff / (1000 * 60 * 60));
        result === 1 ? print = `${result} hour ago` : print = `${result} hours ago`
    } else if(diff < (1000 * 60 * 60 * 24 * 7)) { //days
        result = Math.ceil(diff / (1000 * 60 * 60 * 24));
        result === 1 ? print = `${result} day ago` : print = `${result} days ago`
    } else if(diff < (1000 * 60 * 60 * 24 * 7 * 4)) {//week
        result = Math.ceil(diff / (1000 * 60 * 60 * 24 * 7));
        result === 1 ? print = `${result} week ago` : print = `${result} weeks ago`
    } else if(diff <(1000 * 60 * 60 * 24 * 7 * 4 * 12)) {// month
        result = Math.ceil(diff / (1000 * 60 * 60 * 24 * 7 * 4));
        result === 1 ? print = `${result} month ago` : print = `${result} monthss ago`
    } else { //year
        result = Math.ceil(diff / (1000 * 60 * 60 * 24 * 7 * 4 * 12));
        result === 1 ? print = `${result} year ago` : print = `${result} years ago`
    }
    return print;
};

function getViews(viewCount) {
    let print;
    if(viewCount < 1000) {
        print = `${viewCount} views`
    } else if(viewCount < 10000) {
        print = `${(viewCount/1000).toFixed(1)}K views`
    } else if(viewCount < 1000000) {
        print = `${Math.floor(viewCount/1000)}K views`
    } else if(viewCount < 10000000) {
        print = `${(viewCount/1000000).toFixed(1)}M views`
    } else if(viewCount < 1000000000) {
        print = `${Math.floor(viewCount/1000000)}M views`
    } else if(viewCount < 10000000000) {
        print = `${(viewCount/10000000000).toFixed(1)}B views`
    } else if(viewCount < 1000000000000) {
        print = `${Math.floor(viewCount/1000000000)}B views`
    }

    return print;
}

