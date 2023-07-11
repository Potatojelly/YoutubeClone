import React, { useCallback, useContext, useRef } from 'react';
import styles from './CommentFrame.module.css'
import { YoutubeApiContext } from '../../contexts/YoutubeApiContext';
import { useInfiniteQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import Comment from './Comment/Comment';
import {v4 as uuidv4} from "uuid";

export default function CommentFrame({video}) {
    const videoId = video.id;
    const {commentCount} = video.statistics;

    const youtube = useContext(YoutubeApiContext);
    const {
        data: comments,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
    } = useInfiniteQuery(
        [`${videoId}comments`],
        ({pageParam = ""}) => youtube.searchComment(videoId,pageParam), 
        {
            getNextPageParam : (lastPage, allPages) => {
                return lastPage.pageToken ? lastPage.pageToken : undefined;
            },
            staleTime: 1000 * 60 * 5,
            retry: false,
            refetchOnWindowFocus: false,
        },
    );

    const observer= useRef();
    const lastElementRef = useCallback( (node) => {
        if(isFetching) return
        if(observer.current)  observer.current.disconnect();
        observer.current = new IntersectionObserver(async entries=>{
            if(entries[0].isIntersecting && hasNextPage) {
                console.log("Fetching!");
                console.log(node);
                fetchNextPage();
            }
        },{rootMargin:"0px 0px -160px 0px"});
        if(node) observer.current.observe(node);
    },[fetchNextPage, isFetching, hasNextPage]);

    const commentContent = comments?.pages.map((page,pageIndex) => {
        return page.items.map((comment,index) => {
            if((comments.pages.length === pageIndex + 1) && page.items.length === index + 2) {
                return <Comment key={uuidv4()} comment={comment} ref={lastElementRef}/>
            }
            return <Comment key={uuidv4()} comment={comment}/>
        })
    })

    return (
        <div className={styles.comments}>
            <div className={styles.commentsInfo}>
                <span>Comments {commentCount}</span>
            </div>
            {isError ? <p>{error.message}</p>
            : commentContent}
            {isFetchingNextPage && <Loading/>}
            {isFetching && !isFetchingNextPage && <Loading/>}
        </div>
    );
}

