import React, { forwardRef } from 'react';
import styles from './RelatedVideoCard.module.css'
import getDateDiff from '../../common/getDateDiff';
import getViews from '../../common/getViews';

const RelatedVideoCard = ({video},ref) => {
    const {title,channelTitle,publishedAt} = video.snippet;
    const {url} = video.snippet.thumbnails.high;
    const {viewCount} = video.statistics;
    const date = getDateDiff(publishedAt);
    const views = getViews(viewCount);

    return (
        <li className={styles.videoCard} ref={ref}>
            <img src={url} alt ="video" className={styles.videoImg}/>
            <div className={styles.videoDetails}>
                <span className={styles.title}>{title}</span>
                <span className={styles.channelTitle}>{channelTitle}</span>
                <span className={styles.viewHour}>{`${date} • ${views}`}</span>
            </div>
        </li>
    );
}
export default forwardRef(RelatedVideoCard);

