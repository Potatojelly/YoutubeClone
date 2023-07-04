import React from 'react';
import styles from './RelatedVideoCard.module.css'
import getDateDiff from '../../common/getDateDiff';
import getViews from '../../common/getViews';

export default function RelatedVideoCard({video}) {
    const {title,channelTitle,publishedAt} = video.snippet;
    const {url} = video.snippet.thumbnails.high;
    const {viewCount} = video.statistics;
    const date = getDateDiff(publishedAt);
    const views = getViews(viewCount);

    return (
        <li className={styles.videoCard}>
            <img src={url} alt ="video" className={styles.videoImg}/>
            <div className={styles.videoDetails}>
                <span className={styles.title}>{title}</span>
                <span className={styles.channelTitle}>{channelTitle}</span>
                <span className={styles.viewHour}>{`${date} • ${views}`}</span>
            </div>
        </li>
    );
}

