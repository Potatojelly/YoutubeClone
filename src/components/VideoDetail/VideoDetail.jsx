import React, { useEffect, useState } from 'react';
import styles from './VideoDetail.module.css'
import Comment from '../Comment/Comment';
import SideBar from '../SideBar/SideBar';
import { useLocation} from 'react-router-dom';
import {AiOutlineLike, AiOutlineDislike} from "react-icons/ai";
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import {v4 as uuidv4} from "uuid";
import getDateDiff from '../../common/getDateDiff';
import getViews from '../../common/getViews';
import { MoonLoader } from 'react-spinners';
import VideoSideBar from '../../VideoSideBar/VideoSideBar';

export default function VideoDetail() {
    const {state: {video}} = useLocation();
    const {title,channelTitle,publishedAt,description} = video.snippet; 
    const {viewCount,likeCount,commentCount} = video.statistics;
    const [text,setText] = useState([]);
    const [shouldShowReadMoreButton,setShouldShowReadMoreButton] = useState(false);
    const [show,setShow] = useState(false);
    const date = getDateDiff(publishedAt);
    const views = getViews(viewCount);

    const [commentList,commentLoading, lastCommentRef] = useInfiniteScroll("comments");

    useEffect(()=>{
        setText(description.split('\n'));
    },[]);

    useEffect(()=>{
        setShouldShowReadMoreButton(description.split('\n').length >= 2);
    },[]);

    const handleClick = () => {
        setShow(!show);
    };
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
                                src= {`http://www.youtube.com/embed/${video.id}`}
                                frameborder="0"
                                title="youtubeVideo"
                            />
                        </div>
                        <h1>
                        {title}
                        </h1>
                        <div className={styles.detailContainer}> 
                            <div className={styles.channelContainer}>
                                <div className={styles.channelLogo}></div>
                                <div>
                                    <p className={styles.channelTitle}>{channelTitle}</p>
                                    <p className={styles.channelSubscriber}>subsribers</p>
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
                            <VideoSideBar type="response"/>
                        </div>
                        <div className={styles.comments}>
                            <div className={styles.commentsInfo}>
                                <span>comments {commentCount}</span>
                            </div>
                            {commentList && commentList.map((item,index)=> {
                                if(index === commentList.length - 1) {
                                    return <Comment key={uuidv4()} comment={item} ref={lastCommentRef}/>
                                } else {
                                    return <Comment key={uuidv4()} comment={item}/>
                                }
                            })}
                            {commentLoading && 
                            <div style={{display:"flex", justifyContent:"center"}}>
                                <MoonLoader color="rgba(255, 5, 5, 1)"/>
                            </div>}
                        </div>
            </div>
            <div className={styles.default}>
                <VideoSideBar/>
            </div>
        </div>
        </section>
    );
}

