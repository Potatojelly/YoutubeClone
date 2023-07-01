import React from 'react';
import styles from './Video.module.css'
import VideoRow from '../VideoRow/VideoRow';

export default function Videos() {
    return (
        <ul className={styles.videoContainer}>
            <VideoRow/>
            <VideoRow/>
            <VideoRow/>
        </ul>
    );
}

