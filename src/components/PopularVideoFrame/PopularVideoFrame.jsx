import React from 'react';
import styles from './PopularVideoFrame.module.css'
import VideoGrid from '../PopularVideoGrid/PopularVideoGrid';

export default function Video() {
    return (
        <div className={styles.videoSection}>
            <ul className={styles.videoContainer}>
                {<VideoGrid/>}
            </ul>
        </div>
    );
}

