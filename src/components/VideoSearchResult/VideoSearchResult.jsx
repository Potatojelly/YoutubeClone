import React from 'react';
import VideoSearchCard from '../VideoSearchCard/VideoSearchCard';
import styles from './VideoSearchResult.module.css'
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import {v4 as uuidv4} from "uuid";
import { MoonLoader } from 'react-spinners';

export default function VideoSearchResult() {
    const [list,loading,lastElementRef] = useInfiniteScroll("search");

    return (
        <div className={styles.container}>
            <ul className={styles.videoCards}>
                {list && list.map((item,index)=> {
                    if(index === list.length - 1) {
                        return <VideoSearchCard  key={uuidv4()} video={item} ref={lastElementRef}/>
                    } else {
                        return <VideoSearchCard  key={uuidv4()} video={item}/>
                    }
                })}
            {loading &&
            <div style={{display:"flex", justifyContent:"center"}}>
                <MoonLoader color="rgba(255, 5, 5, 1)"/>
            </div>}
            </ul>
        </div>
    );
}

