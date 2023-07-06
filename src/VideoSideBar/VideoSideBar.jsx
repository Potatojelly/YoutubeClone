import React from 'react';
import styles from './VideoSideBar.module.css'
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import RelatedVideoCard from '../components/RelatedVideoCard/RelatedVideoCard';
import { MoonLoader } from 'react-spinners';
import {v4 as uuidv4} from "uuid";

export default function VideoSideBar({type}) {
    const [relatedVideoList,relatedVideoLoading, lastVideoRef] = useInfiniteScroll("related");
    return (
        <div className={`${styles.sideBar} ${type && styles.response}`}>
            <span className={styles.sideBarTitle}>Related Videos</span>
            <ul>
                {relatedVideoList && relatedVideoList.map((item,index)=> {
                    if(index === relatedVideoList.length - 1) {
                        return <RelatedVideoCard key={uuidv4()} video={item} ref={lastVideoRef}/>
                    } else {
                        return <RelatedVideoCard key={uuidv4()} video={item}/>
                    }
                })}
                {relatedVideoLoading &&
                <div style={{display:"flex", justifyContent:"center"}}>
                    <MoonLoader color="rgba(255, 5, 5, 1)"/>
                </div>}
            </ul>
    </div>
    );
}

