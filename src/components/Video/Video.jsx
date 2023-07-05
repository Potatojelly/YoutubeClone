import React from 'react';
import styles from './Video.module.css'
import VideoRow from '../VideoRow/VideoRow';
import {v4 as uuidv4} from "uuid";
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { MoonLoader } from 'react-spinners';


export default function Video() {
    const [list,loading,lastElementRef] = useInfiniteScroll("main");

    return (
        <ul className={styles.videoContainer}>
            {list && list.map((array,index)=> {
                if(list.length === index + 1) {
                    return <VideoRow key={uuidv4()} videos={array} ref={lastElementRef}/>
                } else {
                    return <VideoRow key={uuidv4()} videos={array}/>
                }
            })}
            {loading &&
            <div style={{display:"flex", justifyContent:"center"}}>
                <MoonLoader color="rgba(255, 5, 5, 1)"/>
            </div>}
        </ul>
    );
}


