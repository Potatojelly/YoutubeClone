import React, { useCallback, useRef, useState } from 'react';
import styles from './VideoDetail.module.css'
import Comment from '../Comment/Comment';
import { useLocation, useParams } from 'react-router-dom';
import {AiOutlineLike, AiOutlineDislike} from "react-icons/ai";
import {MdSort} from "react-icons/md";
import RelatedVideoCard from '../RelatedVideoCard/RelatedVideoCard';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import {v4 as uuidv4} from "uuid";

export default function VideoDetail() {
    const {state: {video}} = useLocation();
    const [relatedVideoPage,setRelatedVideoPage] = useState(1);
    const [commentPage,setCommentPage] = useState(1);
    const [relatedVideolist,relatedVideoloading] = useInfiniteScroll("related",relatedVideoPage);
    const [commentList,commentloading] = useInfiniteScroll("comments",commentPage);

    const videoObserver = useRef();
    const commentObserver = useRef();

    const lastVideoRef = useCallback(node => {
        if(relatedVideoloading) return;
        if(videoObserver.current) videoObserver.current.disconnect();
        videoObserver.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting) {
                setRelatedVideoPage(prev => prev + 1);
            }
        },{threshold:0.5});
        if(node) videoObserver.current.observe(node);
    },[relatedVideoloading]); 

    const lastCommentRef = useCallback(node => {
        if(commentloading) return;
        if(commentObserver.current) commentObserver.current.disconnect();
        commentObserver.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting) {
                setCommentPage(prev => prev + 1);
            }
        },{threshold:0.5});
        if(node) commentObserver.current.observe(node);
    },[commentloading]); 

    return (
        <section className={styles.container}>
            <div className={styles.videoContainer}>
                <iframe 
                    id="player" 
                    type="text/html" 
                    width="640" 
                    height="390"
                    src= {`http://www.youtube.com/embed/${video.id}`}
                    frameborder="0"
                    title="youtubeVideo"
                />
                <h1>
                title
                </h1>
                <div className={styles.detailContainer}> 
                    <div className={styles.channelContainer}>
                        <div className={styles.channelLogo}></div>
                        <div>
                            <p className={styles.channelTitle}>channelTitle</p>
                            <p className={styles.channelSubscriber}>subsribers</p>
                        </div>
                        <button className={styles.channelSubscribeBtn}>Subscribe</button>
                    </div>
                    <div className={styles.menuContainer}>
                        <button className={styles.likeBtn}>
                            <AiOutlineLike style={{fontSize: "1.4rem", marginRight:"0.3rem"}}/>
                            like
                        </button>
                        <button className={styles.dislikeBtn}>
                            <AiOutlineDislike style={{fontSize: "1.4rem"}}/>
                        </button>
                    </div>
                </div>
                <div className={styles.descriptionContainer}>
                    <span className={styles.viewHour}>views and hours</span>
                    <p className={styles.description}>des <button className={styles.showMore}>show more</button></p>
                </div>
                <div className={styles.comments}>
                    <div className={styles.commentsInfo}>
                        <span>comments num</span>
                        <button style={{marginLeft:"0.5rem"}}><MdSort/>Sort by</button>
                    </div>
                    {commentList && commentList.map((item,index)=> {
                        if(index === commentList.length - 1) {
                            return <Comment key={uuidv4()} comment={item} ref={lastCommentRef}/>
                        } else {
                            return <Comment key={uuidv4()} comment={item}/>
                        }
                    })}
                    {commentloading && <li className="spinner"> Loading Spinner </li>}
                </div>
            </div>
            <div className={styles.sideBar}>
                <span className={styles.sideBarTitle}>Related Videos</span>
                <ul>
                    {relatedVideolist && relatedVideolist.map((item,index)=> {
                        if(index === relatedVideolist.length - 1) {
                            return <RelatedVideoCard key={uuidv4()} video={item} ref={lastVideoRef}/>
                        } else {
                            return <RelatedVideoCard key={uuidv4()} video={item}/>
                        }
                    })}
                    {relatedVideoloading && <li className="spinner"> Loading Spinner </li>}
                </ul>
            </div>
        </section>
    );
}

