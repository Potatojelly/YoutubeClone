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

{/* {list && list.map((array,index)=> {
    if(list.length === index + 1) {
        return <VideoGrid key={uuidv4()} videos={array} ref={lastElementRef}/>
    } else {
        return <VideoGrid key={uuidv4()} videos={array}/>
    }
})} */}
