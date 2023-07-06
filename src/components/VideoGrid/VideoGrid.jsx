import React, { forwardRef} from 'react';
import styles from './VideoGrid.module.css'
import VideoCard from '../VideoCard/VideoCard';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import {v4 as uuidv4} from "uuid";
import { MoonLoader } from 'react-spinners';

export default function VideoGrid({videos}) {
    const [list,loading,lastElementRef] = useInfiniteScroll("main");
    return (
        <>
            <div className={styles.videoGrid}>
                {list && list.map((item,index)=> {
                        if(list.length === index + 1) {
                            return <VideoCard key={uuidv4()} video={item} ref={lastElementRef}/>
                        } else {
                            return <VideoCard key={uuidv4()} video={item}/>
                        }
                    })}
            </div>
            {loading &&
                <div style={{display:"flex", justifyContent:"center"}}>
                    <MoonLoader color="rgba(255, 5, 5, 1)"/>
                </div>}
        </>
    );
}