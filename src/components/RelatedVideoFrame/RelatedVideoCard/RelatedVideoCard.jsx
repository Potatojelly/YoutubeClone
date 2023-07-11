import React, { forwardRef, useContext } from 'react';
import styles from './RelatedVideoCard.module.css'
import {format} from "timeago.js";
import { useQuery } from '@tanstack/react-query';
import { YoutubeApiContext } from '../../../contexts/YoutubeApiContext';
import { useNavigate } from 'react-router-dom';
import changeUnit from '../../../common/changeFormat';

const RelatedVideoCard = ({videoId},ref) => {
    const youtube = useContext(YoutubeApiContext);
    const navigate = useNavigate();
    const {data: detailedVideo} = useQuery([`${videoId}RelatedVideo`],() => youtube.searchByVideoId(videoId),
    {
        staleTime: 1000 * 60 * 5,
        retry: false,
        refetchOnWindowFocus: false,
    }
    );
    const title = detailedVideo && detailedVideo[0].snippet.title;
    const channelTitle = detailedVideo && detailedVideo[0].snippet.channelTitle;
    const channelId = detailedVideo && detailedVideo[0].snippet.channelId;
    const publishedAt = detailedVideo && detailedVideo[0].snippet.publishedAt;
    const url = detailedVideo && detailedVideo[0].snippet.thumbnails.high.url;
    const viewCount = detailedVideo && detailedVideo[0].statistics.viewCount;
    const date = format(publishedAt);
    const views = changeUnit(viewCount);

    const {data: channel} = useQuery([{channelId}],() => youtube.searchChannel(channelId),
    {
        staleTime: 1000 * 60 * 5,
        retry: false,
        refetchOnWindowFocus: false,
    }
    );

    const watchVideo = () => {
        const video = detailedVideo[0];
        navigate(`/videos/watch/${videoId}`, {state: {video, channel}});
    }

    const content = detailedVideo && (
        <li className={styles.videoCard} onClick={watchVideo} ref={ref}>
            <img src={url} alt ="video" className={styles.videoImg}/>
            <div className={styles.videoDetails}>
                <span className={styles.title}>{title}</span>
                <span className={styles.channelTitle}>{channelTitle}</span>
                <span className={styles.viewHour}>{`${date} • ${views}`}</span>
            </div>
        </li>
    )

    return (
        <>
            {content}
        </>
    );
}
export default forwardRef(RelatedVideoCard);

