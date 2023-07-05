import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import styles from './Video.module.css'
import VideoRow from '../VideoRow/VideoRow';
import {v4 as uuidv4} from "uuid";
import { ToggleModeContext } from '../../contexts/ToggleModeContext';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

export default function Video() {
    const [pageNumber, setPageNumber] = useState(1);
    const [list,loading] = useInfiniteScroll("main",pageNumber);
    const observer= useRef();
    const {click,handleToggleMode} = useContext(ToggleModeContext);

    const lastElementRef = useCallback(node=> {
        if(loading) return;
        if(observer.current)  observer.current.disconnect();
        observer.current = new IntersectionObserver(entries=>{
            if(entries[0].isIntersecting) {
                setPageNumber(prev => prev + 1)
            }
        },{threshold: 0.5});
        if(node) observer.current.observe(node);
    },[loading]);

    return (
        <ul className={`${styles.videoContainer} ${click && styles.videoContainerOn}`}>
            {list && list.map((array,index)=> {
                if(list.length === index + 1) {
                    return <VideoRow key={uuidv4()} videos={array} ref={lastElementRef}/>
                } else {
                    return <VideoRow key={uuidv4()} videos={array}/>
                }
            })}
            {loading && <li className="spinner"> Loading Spinner </li>}
        </ul>
    );
}
