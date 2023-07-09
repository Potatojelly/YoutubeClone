import React, { forwardRef, useContext } from 'react';
import styles from './VideoCard.module.css'
import getDateDiff from '../../common/getDateDiff';
import getViews from '../../common/getViews';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { YoutubeApiContext } from '../../contexts/YoutubeApiContext';


const VideoCard = ({video},ref) => {
    const {id} = video.id;
    const {title,channelTitle,publishedAt,channelId} = video.snippet;
    const {url} = video.snippet.thumbnails.high;
    const {viewCount} = video.statistics;
    const date = getDateDiff(publishedAt);
    const views = getViews(viewCount);
    const youtube = useContext(YoutubeApiContext);
    const navigate = useNavigate();

    const {data: channel} = useQuery([channelId],() => youtube.searchChannel(channelId),
    {
        staleTime: 1000 * 60 * 5,
        retry: false,
        refetchOnWindowFocus: false,
    }
    );
    const channelThumbnail = channel && channel[0].snippet.thumbnails.default.url;

    const watchVideo = () => {
        navigate(`/videos/watch/${id}`, {state: {video, channel}});
    }

    return (
        <div className={styles.videoCard} onClick={watchVideo} ref={ref && ref}>
            <img src={url} alt="thumnail" className={styles.thumnail}/>
            <div className={styles.detail}>
                <img src={channelThumbnail} alt="channelLogo" className={styles.logo}></img>
                <div className={styles.content}>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.channel}>{channelTitle}</p>
                    <p className={styles.viewHour}>{`${date} • ${views}`}</p>
                </div>
            </div>
        </div>
    );
};

export default forwardRef(VideoCard);


