import React from 'react';
import styles from './VideoRow.module.css'
import VideoCard from '../VideoCard/VideoCard';

export default function VideoRow({videos}) {
    console.log(videos);
    return (
        <li className={styles.videoRow}>
            <VideoCard video={videos[0]}/>
            <VideoCard video={videos[1]}/>
            <VideoCard video={videos[2]}/>
            <VideoCard video={videos[3]}/>
            <VideoCard video={videos[4]}/>
        </li>
    );
}

