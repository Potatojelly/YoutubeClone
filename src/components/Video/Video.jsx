import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import styles from './Video.module.css'
import VideoRow from '../VideoRow/VideoRow';
import {v4 as uuidv4} from "uuid";
import { ToggleModeContext } from '../../contexts/ToggleModeContext';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

export default function Video() {
    const [list,loading,lastElementRef] = useInfiniteScroll("main");
    const {click,handleToggleMode} = useContext(ToggleModeContext);

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
