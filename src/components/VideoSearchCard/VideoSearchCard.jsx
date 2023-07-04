import React from 'react';
import styles from './VideoSearchCard.module.css'

export default function VideoSearchCard() {
    return (
        <li className={styles.videoCard}>
            <img src={""} alt ="" className={styles.videoImg}/>
            <div className={styles.videoDetails}>
                <span className={styles.title}>title</span>
                    <p className={styles.viewHour}>view hour</p>
                    <div className={styles.channelConatiner}>
                        <div className={styles.channelLogo}></div>
                        <span className={styles.channelTitle}>channelTitle</span>
                    </div>
                    <p className={styles.detail}>details</p>
            </div>
        </li>
    );
}

