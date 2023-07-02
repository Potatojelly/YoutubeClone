import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import styles from './Video.module.css'
import VideoRow from '../VideoRow/VideoRow';
import {v4 as uuidv4} from "uuid";
import { ToggleModeContext } from '../../contexts/ToggleModeContext';

export default function Videos() {
    const obsRef = useRef(null);
    const [list, setList] = useState([]);	
    const [page, setPage] = useState(1); 
    const [load, setLoad] = useState(false); 
    const [start,setStart] = useState(false);

    console.log(list.length);
    let nextPageToken = '';

    const {click,handleToggleMode} = useContext(ToggleModeContext);

    useEffect(()=> { 
        const observer = new IntersectionObserver(obsHandler, { threshold : 1 });
        if(obsRef.current) observer.observe(obsRef.current);
        return () => { observer.disconnect(); }
    }, []);

    const obsHandler = ((entries) => { 
        const target = entries[0];
        if(target.isIntersecting){ 
            setPage((prev) => prev+1 ); 
        }
    });

    const getPost = useCallback(()=> { 
        setLoad(true);
        //fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=50&pageToken=${nextPageToken}&key=`)
        fetch("../../videos/popular.json")    
            .then(response => response.json())
            .then((data) => {
                const transformedData = data.items.reduce((result, value, index, array) => {
                    if (index % 5 === 0)
                        result.push(array.slice(index, index + 5));
                    return result;
                },[]);
                setList((prev)=>[...prev, ...transformedData])
                //nextPageToken = data.nextPageToken;
            })
            .finally(()=>setLoad(false));
    },[page]);

    useEffect(()=> { 
        getPost();
    }, [getPost]);


    return (
        <ul className={`${styles.videoContainer} ${click && styles.videoContainerOn}`}>
            {list && list.map((array,index)=><VideoRow key={uuidv4()} videos={array}/>)}
            {load && <li className="spinner"> Loading Spinner </li>}
            {<div ref={obsRef}> Observer </div>}
        </ul>
    );
}
