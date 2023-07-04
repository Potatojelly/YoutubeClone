import React from 'react';
import styles from './VideoDetail.module.css'
import { useLocation, useParams } from 'react-router-dom';
import {AiOutlineLike, AiOutlineDislike} from "react-icons/ai";
import {MdSort} from "react-icons/md";
import RelatedVideoCard from '../RelatedVideoCard/RelatedVideoCard';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import {v4 as uuidv4} from "uuid";

export default function VideoDetail() {
    const {state: {video}} = useLocation();
    const [obsRef,list,load] = useInfiniteScroll("related");
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
                    comments
                </div>
            </div>
            <div className={styles.sideBar}>
                <span className={styles.sideBarTitle}>Related Videos</span>
                <ul>
                    {list && list.map((item,index)=><RelatedVideoCard key={uuidv4()} video={item}/>)}
                    {load && <li className="spinner"> Loading Spinner </li>}
                    {<div ref={obsRef}> Observer </div>}
                </ul>
            </div>
        </section>
    );
}

