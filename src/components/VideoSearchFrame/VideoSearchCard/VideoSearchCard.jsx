import React, { forwardRef, useContext } from 'react';
import styles from './VideoSearchCard.module.css'
import getDateDiff from '../../../common/getDateDiff';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import getViews from '../../../common/getViews';
import { YoutubeApiContext } from '../../../contexts/YoutubeApiContext';

const VideoSearchCard = ({video},ref) => {
    const youtube = useContext(YoutubeApiContext);
    const videoId = video.id;
    const {title,channelTitle,publishedAt,description,channelId} = video.snippet;
    const {url} = video.snippet.thumbnails.high;

    const {data: channel} = useQuery([{channelId}],() => youtube.searchChannel(channelId),
    {
        staleTime: 1000 * 60 * 5,
        retry: false,
        refetchOnWindowFocus: false,
    }
    );
    const channelThumbnail = channel && channel[0].snippet.thumbnails.default.url;

    const {data: detailedVideo } = useQuery([`${videoId}DetailedVideo`],() => youtube.searchByVideoId(videoId),
    {
        staleTime: 1000 * 60 * 5,
        retry: false,
        refetchOnWindowFocus: false,
    }
    );
    const viewCount = detailedVideo && detailedVideo[0].statistics.viewCount;
    const date = getDateDiff(publishedAt);
    const views = getViews(viewCount);
    const navigate = useNavigate();

    const watchVideo = () => {
        const video = detailedVideo[0];
        navigate(`/videos/watch/${videoId}`, {state: {video, channel}});
    }

    return (
        <li className={styles.videoCard} ref={ref} onClick={watchVideo}>
            <img src={url} alt ="video" className={styles.videoImg}/>
            <div className={styles.videoDetails}>
                <span className={styles.title}>{title}</span>
                <p className={styles.viewHour}>{`${views} • ${date}`}</p>
                <div className={styles.channelConatiner}>
                    <img src={channelThumbnail} alt="channelThumbnail" className={styles.channelLogo}></img>
                    <span className={styles.channelTitle}>{channelTitle}</span>
                </div>
                <p className={styles.detail}>{description}</p>
            </div>
        </li>
    );
};

export default forwardRef(VideoSearchCard);