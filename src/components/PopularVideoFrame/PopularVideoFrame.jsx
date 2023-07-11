import React from 'react';
import styles from './PopularVideoFrame.module.css'
import PopularVideoGrid from './PopularVideoGrid/PopularVideoGrid';

export default function PopularVideoFrame() {
    return (
        <div className={styles.videoSection}>
            <ul className={styles.videoContainer}>
                {<PopularVideoGrid/>}
            </ul>
        </div>
    );
}

