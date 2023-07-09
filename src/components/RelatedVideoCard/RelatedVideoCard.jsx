import React, { forwardRef, useContext } from 'react';
import styles from './RelatedVideoCard.module.css'
import getDateDiff from '../../common/getDateDiff';
import getViews from '../../common/getViews';
import { useQuery } from '@tanstack/react-query';
import { YoutubeApiContext } from '../../contexts/YoutubeApiContext';

const RelatedVideoCard = ({videoId},ref) => {
    const youtube = useContext(YoutubeApiContext);
    const {data: video} = useQuery([`${videoId}RelatedVideo`],() => youtube.searchByVideoId(videoId),
    {
        staleTime: 1000 * 60 * 5,
        retry: false,
        refetchOnWindowFocus: false,
    }
    );
    const title = video && video[0].snippet.title;
    const channelTitle = video && video[0].snippet.channelTitle;
    const publishedAt = video && video[0].snippet.publishedAt;
    const url = video && video[0].snippet.thumbnails.high.url;
    const viewCount = video && video[0].statistics.viewCount;
    const date = getDateDiff(publishedAt);
    const views = getViews(viewCount);

    const content = video && (
        <li className={styles.videoCard} ref={ref}>
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

