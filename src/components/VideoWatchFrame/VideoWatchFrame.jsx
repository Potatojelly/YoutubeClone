import React, { useEffect, useState } from 'react';
import styles from './VideoWatchFrame.module.css'
import {AiOutlineLike, AiOutlineDislike} from "react-icons/ai";
import {format} from "timeago.js";
import changeUnit from '../../common/changeFormat';
import { addNumFormat } from '../../common/changeFormat';
import { getDate } from '../../common/changeFormat';

export default function VideoWatchFrame({video, channel}) {
    const videoId = video.id;
    const {title,channelTitle,publishedAt,description} = video.snippet; 
    const {viewCount,likeCount} = video.statistics;
    const {subscriberCount} = channel[0].statistics;
    const channelThumbnail = channel[0].snippet.thumbnails.default.url;

    const [text,setText] = useState([]);
    const [readMore,setReadMore] = useState(false);

    const date = format(publishedAt);
    const views = changeUnit(viewCount);

    useEffect(()=>{
        setText(description.split('\n'));
    },[description]);

    const handleReadMore = () => {
        setReadMore(!readMore);
    };

    const showReadMoreButton = (<span className={styles.readMoreBtn} onClick={handleReadMore}>
                                {!readMore ? "Read more" : "Show less"}
                                </span>)

    return (
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
                            <p className={styles.channelSubscriber}>{changeUnit(subscriberCount)} subscribers</p>
                        </div>
                        <button className={styles.channelSubscribeBtn}>Subscribe</button>
                    </div>
                    <div className={styles.menuContainer}>
                        <div className={styles.likeBtn}>
                            <AiOutlineLike style={{fontSize: "1.4rem", marginRight:"0.3rem"}}/>
                            {changeUnit(likeCount)}
                        </div>
                        <div className={styles.dislikeBtn}>
                            <AiOutlineDislike style={{fontSize: "1.4rem"}}/>
                        </div>
                    </div>
                </div>
                <div className={styles.descriptionContainer}>
                    {readMore ? 
                    <span className={styles.viewHour}>{`${getDate(publishedAt)} • ${addNumFormat(viewCount)} views`}</span> 
                    : <span className={styles.viewHour}>{`${date} • ${views} views`}</span>}
                    <div>
                        <div className={`${styles.description} ${readMore && styles.readMore}`}>
                            {text.map((item,index)=><p key={index}>{item}</p>)}
                        </div>
                        {showReadMoreButton}
                    </div>
                </div>
            </div>
    );
}

