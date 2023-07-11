import React, { useCallback, useContext,useRef} from 'react';
import styles from './PopularVideoGrid.module.css'
import VideoCard from '../PopularVideoCard/PopularVideoCard';
import {v4 as uuidv4} from "uuid";
import { useInfiniteQuery} from '@tanstack/react-query';
import { YoutubeApiContext } from '../../contexts/YoutubeApiContext';
import Loading from '../Loading/Loading';


export default function VideoGrid() {
    const youtube = useContext(YoutubeApiContext);
    const {
        data: videos,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery(
        ['videos'],
        ({pageParam = ""}) => youtube.searchPopular(pageParam), 
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

    const content = videos?.pages.map(page => {
        return page.items.map((video,index) => {
            if(page.items.length === index + 1) {
                return <VideoCard ref={lastElementRef} key={uuidv4()} video={video}/>
            }
            return <VideoCard key={uuidv4()} video={video}/>
        })
    });

    if(isError) return <h1>{error.message}</h1>

    return status === "loading" ? (
        <Loading isLoading={isLoading}/>    
    ) :  (
    <>
        <div className={styles.videoGrid}>
            {content}
        </div>
        {isFetchingNextPage && <Loading/>}
        {isFetching && !isFetchingNextPage && <Loading/>}
    </>
    )
}