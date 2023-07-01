import React from 'react';
import styles from './VideoRow.module.css'
import VideoCard from '../VideoCard/VideoCard';

export default function VideoRow() {
    return (
        <li className={styles.videoRow}>
            <VideoCard/>
            <VideoCard/>
            <VideoCard/>
            <VideoCard/>
            <VideoCard/>
        </li>
    );
}

