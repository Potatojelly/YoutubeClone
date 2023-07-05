import React, { forwardRef} from 'react';
import styles from './VideoRow.module.css'
import VideoCard from '../VideoCard/VideoCard';

const VideoRow = ({videos},ref) => {
    return (
        <li className={styles.videoRow} ref={ref}>
            <VideoCard video={videos[0]}/>
            <VideoCard video={videos[1]}/>
            <VideoCard video={videos[2]}/>
            <VideoCard video={videos[3]}/>
            <VideoCard video={videos[4]}/>
        </li>
    );
}

export default forwardRef(VideoRow);
