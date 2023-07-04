import React from 'react';
import styles from './VideoSearchResult.module.css'
import VideoSearchCard from '../VideoSearchCard/VideoSearchCard';

export default function VideoSearchResult() {
    return (
        <div className={styles.resultContainer}>
            <ul>
                <VideoSearchCard/>
                <VideoSearchCard/>
                <VideoSearchCard/>
                <VideoSearchCard/>
                <VideoSearchCard/>
            </ul>
        </div>
    );
}

