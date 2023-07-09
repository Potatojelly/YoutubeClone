import React, { useCallback, useContext, useRef } from 'react';
import styles from './VideoSideBar.module.css'
import RelatedVideoCard from '../components/RelatedVideoCard/RelatedVideoCard';
import {v4 as uuidv4} from "uuid";
import { useInfiniteQuery } from '@tanstack/react-query';
import { YoutubeApiContext } from '../contexts/YoutubeApiContext';
import Loading from '../components/Loading/Loading';

export default function VideoSideBar({videoId, type}) {

    const youtube = useContext(YoutubeApiContext);
    const {
        data: relatedVideos,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
    } = useInfiniteQuery(
        [`${videoId}RelatedVideos`],
        ({pageParam = ""}) => youtube.searchRelatedVideo(videoId,pageParam), 
        {
            getNextPageParam : (lastPage, allPages) => {
                return lastPage.pageToken ? lastPage.pageToken : undefined;
            },
            staleTime: 1000 * 60 * 5,
            retry: false,
            refetchOnWindowFocus: false,
        }
    );

    const observer= useRef();
    const lastElementRef = useCallback( node => {
        if(isFetching) return;
        if(observer.current)  observer.current.disconnect();
        observer.current = new IntersectionObserver(entries=>{
            if(entries[0].isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        });
        if(node) observer.current.observe(node);
    },[fetchNextPage, isFetching, hasNextPage]);

    const relatedVideoContent = relatedVideos?.pages.map(page => {
        return page.items.map((video,index) => {
            if(page.items.length === index + 1) {
                return <RelatedVideoCard key={uuidv4()} videoId={video.id} ref={lastElementRef}/>
            }
            return <RelatedVideoCard key={uuidv4()} videoId={video.id}/>
        })
    })

    return (
        <div className={`${styles.sideBar} ${type && styles.response}`}>
            <span className={styles.sideBarTitle}>Related Videos</span>
            <ul>
                {isError ? <p>{error.message}</p>
                : relatedVideoContent}
                {isFetchingNextPage && <Loading/>}
                {isFetching && !isFetchingNextPage && <Loading/>}
            </ul>
    </div>
    );
}

