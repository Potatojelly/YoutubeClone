import React from 'react';
import styles from './VideoSearchResult.module.css'
import VideoSearchCard from '../VideoSearchCard/VideoSearchCard';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import {v4 as uuidv4} from "uuid";

export default function VideoSearchResult() {
    const [list,loading,lastElementRef] = useInfiniteScroll("search");

    return (
        <div className={styles.resultContainer}>
            <ul>
                {list && list.map((item,index)=> {
                    if(index === list.length - 1) {
                        return <VideoSearchCard  key={uuidv4()} video={item} ref={lastElementRef}/>
                    } else {
                        return <VideoSearchCard  key={uuidv4()} video={item}/>
                    }
                })}
                {loading && <li className="spinner"> Loading Spinner </li>}
            </ul>
        </div>
    );
}

