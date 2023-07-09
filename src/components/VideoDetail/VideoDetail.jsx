import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import styles from './VideoDetail.module.css'
import Comment from '../Comment/Comment';
import SideBar from '../SideBar/SideBar';
import { useLocation} from 'react-router-dom';
import {AiOutlineLike, AiOutlineDislike} from "react-icons/ai";
import {v4 as uuidv4} from "uuid";
import getDateDiff from '../../common/getDateDiff';
import getViews from '../../common/getViews';
import VideoSideBar from '../../VideoSideBar/VideoSideBar';
import { YoutubeApiContext } from '../../contexts/YoutubeApiContext';
import { useInfiniteQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';

export default function VideoDetail() {
    const {state: {video, channel}} = useLocation();
    const {title,channelTitle,publishedAt,description} = video.snippet; 
    const {viewCount,likeCount,commentCount} = video.statistics;
    const {subscriberCount} = channel[0].statistics.subscriberCount;
    const channelThumbnail = channel[0].snippet.thumbnails.default.url;
    const videoId = video.id;

    const [text,setText] = useState([]);
    const [shouldShowReadMoreButton,setShouldShowReadMoreButton] = useState(false);
    const [show,setShow] = useState(false);
    const date = getDateDiff(publishedAt);
    const views = getViews(viewCount);

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

    useEffect(()=>{
        setText(description.split('\n'));
    },[description]);

    useEffect(()=>{
        setShouldShowReadMoreButton(description.split('\n').length >= 2);
    },[description]);

    const handleClick = () => {
        setShow(!show);
    };

    const commentContent = comments?.pages.map(page => {
        return page.items.map((comment,index) => {
            if(page.items.length === index + 1) {
                return <Comment key={uuidv4()} comment={comment} ref={lastElementRef}/>
            }
            return <Comment key={uuidv4()} comment={comment}/>
        })
    })
    return (
        <section className={styles.videoDetailSection}>
            <SideBar/>
            <div className={styles.container}>
                    <div className={styles.videoContainer}>
                        <div className={styles.iframeContainer}>
                            <iframe 
                                id="player" 
                                type="text/html" 
                                width="100%" 
                                height="390"
                                src= {`http://www.youtube.com/embed/${videoId}`}
                                border="0"
                                title="youtubeVideo"
                            />
                        </div>
                        <h1>
                        {title}
                        </h1>
                        <div className={styles.detailContainer}> 
                            <div className={styles.channelContainer}>
                                <img src={channelThumbnail} alt={"channelThumbnail"} className={styles.channelLogo}></img>
                                <div>
                                    <p className={styles.channelTitle}>{channelTitle}</p>
                                    <p className={styles.channelSubscriber}>{subscriberCount}</p>
                                </div>
                                <button className={styles.channelSubscribeBtn}>Subscribe</button>
                            </div>
                            <div className={styles.menuContainer}>
                                <div className={styles.likeBtn}>
                                    <AiOutlineLike style={{fontSize: "1.4rem", marginRight:"0.3rem"}}/>
                                    {likeCount}
                                </div>
                                <div className={styles.dislikeBtn}>
                                    <AiOutlineDislike style={{fontSize: "1.4rem"}}/>
                                </div>
                            </div>
                        </div>
                        <div className={styles.descriptionContainer}>
                            <span className={styles.viewHour}>{`${date} • ${views}`}</span>
                            <div>
                                <div className={`${styles.description} ${show && styles.readMore}`}>
                                    {text.map((item,index)=><p key={index}>{item}</p>)}
                                </div>
                                {shouldShowReadMoreButton && 
                                <span className={styles.readMoreBtn} onClick={handleClick}>
                                    {!show ? "Read more" : "Show less"}
                                </span>}
                            </div>
                        </div>
                        <div className={styles.response}>
                            <VideoSideBar videoId={videoId} type="response"/>
                        </div>
                        <div className={styles.comments}>
                            <div className={styles.commentsInfo}>
                                <span>comments {commentCount}</span>
                            </div>
                            {isError ? <p>{error.message}</p>
                            : commentContent}
                            {isFetchingNextPage && <Loading/>}
                            {isFetching && !isFetchingNextPage && <Loading/>}
                        </div>
            </div>
            <div className={styles.default}>
                <VideoSideBar videoId={videoId}/>
            </div>
        </div>
        </section>
    );
}

