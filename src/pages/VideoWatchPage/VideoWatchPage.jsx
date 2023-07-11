import React from 'react';
import styles from './VideoWatchPage.module.css'
import SideBar from '../../components/SideBar/SideBar';
import { useLocation} from 'react-router-dom';
import RelatedVideoFrame from '../../components/RelatedVideoFrame/RelatedVideoFrame';
import VideoWatchFrame from '../../components/VideoWatchFrame/VideoWatchFrame';
import CommentFrame from '../../components/CommentFrame/CommentFrame';

export default function VideoWatchPage() {
    const {state: {video, channel}} = useLocation();

    const responsiveVideoSideBar = (<div className={styles.responsiveVideoSideBar}>
                                        <RelatedVideoFrame videoId={video.id} type="response"/>
                                    </div>)

    return (
        <section className={styles.videoDetailSection}>
            <SideBar/>
            <div className={styles.container}>
                <div className={styles.gridContainer}>
                    <div className={styles.containerA}>
                        <VideoWatchFrame video={video} channel={channel}/>
                        {responsiveVideoSideBar}
                        <CommentFrame video={video}/>
                    </div>
                    <div className={styles.containerB}>
                        <div className={styles.defaultVideoSideBar}>
                            <RelatedVideoFrame videoId={video.id}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

