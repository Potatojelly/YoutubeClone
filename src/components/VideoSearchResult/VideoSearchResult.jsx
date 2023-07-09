import React, { useCallback, useContext, useRef } from 'react';
import VideoSearchCard from '../VideoSearchCard/VideoSearchCard';
import styles from './VideoSearchResult.module.css'
import {v4 as uuidv4} from "uuid";
import Loading from '../Loading/Loading';
import { YoutubeApiContext } from '../../contexts/YoutubeApiContext';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function VideoSearchResult({keyword}) {
    const youtube = useContext(YoutubeApiContext);
    const {
        data: videos,
        status,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
    } = useInfiniteQuery(
        [keyword],
        ({pageParam = ""}) => youtube.searchByKeyword(keyword,pageParam), 
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

    const videoContent = videos && videos.pages.map((page)=>{
        return page.items.map((video,index)=>{
            if(page.items.length === index + 1) {
                return  <VideoSearchCard  key={uuidv4()} video={video} ref={lastElementRef}/>
            }
            return <VideoSearchCard  key={uuidv4()} video={video}/>
        })
    })

    if(isError) return <h1>{error.message}</h1>
    
    return status === "loading" ? (
        <Loading isLoading={isLoading}/>    
    ) :  (
        <div className={styles.container}>
            <ul className={styles.videoCards}>
            {videoContent}
            {isFetchingNextPage && <Loading/>}
            {isFetching && !isFetchingNextPage && <Loading/>}
            </ul>
        </div>
    );
}

