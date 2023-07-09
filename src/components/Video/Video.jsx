import React from 'react';
import styles from './Video.module.css'
import VideoGrid from '../VideoGrid/VideoGrid';

export default function Video() {
    return (
        <div className={styles.videoSection}>
            <ul className={styles.videoContainer}>
                {<VideoGrid/>}
            </ul>
        </div>
    );
}

