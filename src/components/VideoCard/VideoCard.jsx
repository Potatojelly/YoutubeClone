import React from 'react';
import styles from './VideoCard.module.css'
import getDateDiff from '../../common/getDateDiff';
import getViews from '../../common/getViews';

export default function VideoCard({video}) {
    const {title,channelTitle,publishedAt} = video.snippet;
    const {url} = video.snippet.thumbnails.high;
    const {viewCount} = video.statistics;
    const date = getDateDiff(publishedAt);
    const views = getViews(viewCount);
    return (
        <div className={styles.videoCard}>
            <img src={url} alt="thumnail" className={styles.thumnail}/>
            <div className={styles.detail}>
                <div className={styles.logo}></div>
                <div className={styles.content}>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.channel}>{channelTitle}</p>
                    <p className={styles.viewHour}>{`${date} • ${views}`}</p>
                </div>
            </div>
        </div>
    );
};


