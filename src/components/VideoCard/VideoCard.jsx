import React from 'react';
import styles from './VideoCard.module.css'
import getDateDiff from '../../common/getDateDiff';
import getViews from '../../common/getViews';
import { useNavigate } from 'react-router-dom';

export default function VideoCard({video}) {
    const {id} = video.id;
    const {title,channelTitle,publishedAt,Id} = video.snippet;
    const {url} = video.snippet.thumbnails.high;
    const {viewCount} = video.statistics;
    const date = getDateDiff(publishedAt);
    const views = getViews(viewCount);
    const navigate = useNavigate();

    const watchVideo = () => {
        navigate(`/videos/watch/${id}`, {state: {video}});
    }
    return (
        <div className={styles.videoCard} onClick={watchVideo}>
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


