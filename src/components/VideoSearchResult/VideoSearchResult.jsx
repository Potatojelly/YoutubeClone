import React from 'react';
import styles from './VideoSearchResult.module.css'
import VideoSearchCard from '../VideoSearchCard/VideoSearchCard';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import {v4 as uuidv4} from "uuid";

export default function VideoSearchResult() {
    const [obsRef,list,load] = useInfiniteScroll("search");


    return (
        <div className={styles.resultContainer}>
            <ul>
                {list && list.map((item,index)=><VideoSearchCard key={uuidv4()} video={item}/>)}
                {load && <li className="spinner"> Loading Spinner </li>}
                {<div ref={obsRef}> Observer </div>}
            </ul>
        </div>
    );
}

