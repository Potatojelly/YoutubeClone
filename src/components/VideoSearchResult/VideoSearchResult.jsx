import React, { useCallback, useRef, useState } from 'react';
import styles from './VideoSearchResult.module.css'
import VideoSearchCard from '../VideoSearchCard/VideoSearchCard';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import {v4 as uuidv4} from "uuid";

export default function VideoSearchResult() {
    const [pageNumber,setPageNumber] = useState(1);
    const [list,loading] = useInfiniteScroll("search",pageNumber);
    const observer = useRef();
    const lastElementRef = useCallback(node=>{
        if(loading) return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting) {
                setPageNumber(prev => prev + 1);
            }
        },{threshold:0.5})
        if(node) observer.current.observe(node);
    },[loading])


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

