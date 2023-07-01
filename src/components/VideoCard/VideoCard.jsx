import React from 'react';
import styles from './VideoCard.module.css'

export default function VideoCard() {
    return (
        <div className={styles.videoCard}>
            <div className={styles.thumnail}></div>
            <div className={styles.detail}>
                <div className={styles.logo}></div>
                <div className={styles.content}>
                    <p className={styles.title}>Title</p>
                    <p className={styles.channel}>Channel</p>
                    <p className={styles.viewHour}>views hours</p>
                </div>
    
            </div>
        </div>
    );
}

