import React, { useEffect, useState } from 'react';
import styles from './VideoWatchFrame.module.css'
import {AiOutlineLike, AiOutlineDislike} from "react-icons/ai";
import getDateDiff from '../../common/getDateDiff';
import getViews from '../../common/getViews';

export default function VideoWatchFrame({video, channel}) {
    const videoId = video.id;
    const {title,channelTitle,publishedAt,description} = video.snippet; 
    const {viewCount,likeCount} = video.statistics;
    const {subscriberCount} = channel[0].statistics;
    const channelThumbnail = channel[0].snippet.thumbnails.default.url;

    const [text,setText] = useState([]);
    const [shouldShowReadMoreButton,setShouldShowReadMoreButton] = useState(false);
    const [readMore,setReadMore] = useState(false);

    const date = getDateDiff(publishedAt);
    const views = getViews(viewCount);

    useEffect(()=>{
        setText(description.split('\n'));
    },[description]);

    useEffect(()=>{
        setShouldShowReadMoreButton(description.split('\n').length >= 2);
    },[description]);

    const handleReadMore = () => {
        setReadMore(!readMore);
    };

    const showReadMoreButton = (shouldShowReadMoreButton && 
                                <span className={styles.readMoreBtn} onClick={handleReadMore}>
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
                            <p className={styles.channelSubscriber}>{subscriberCount} subscribers</p>
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
                        <div className={`${styles.description} ${readMore && styles.readMore}`}>
                            {text.map((item,index)=><p key={index}>{item}</p>)}
                        </div>
                        {showReadMoreButton}
                    </div>
                </div>
            </div>
    );
}

