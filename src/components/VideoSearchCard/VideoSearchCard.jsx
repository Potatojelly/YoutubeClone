import React from 'react';
import styles from './VideoSearchCard.module.css'
import getDateDiff from '../../common/getDateDiff';
import getViews from '../../common/getViews';

export default function VideoSearchCard({video}) {
    const {title,channelTitle,publishedAt,description} = video.snippet;
    const {url} = video.snippet.thumbnails.high;
    const {viewCount} = video.statistics;
    const date = getDateDiff(publishedAt);
    const views = getViews(viewCount);

    return (
        <li className={styles.videoCard}>
            <img src={url} alt ="video" className={styles.videoImg}/>
            <div className={styles.videoDetails}>
                <span className={styles.title}>{title}</span>
                    <p className={styles.viewHour}>{`${views} • ${date}`}</p>
                    <div className={styles.channelConatiner}>
                        <div className={styles.channelLogo}></div>
                        <span className={styles.channelTitle}>{channelTitle}</span>
                    </div>
                    <p className={styles.detail}>{description}</p>
            </div>
        </li>
    );
}

