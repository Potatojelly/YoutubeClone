import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import styles from './Video.module.css'
import VideoRow from '../VideoRow/VideoRow';
import {v4 as uuidv4} from "uuid";
import { ToggleModeContext } from '../../contexts/ToggleModeContext';

export default function Videos() {
    const obsRef = useRef(null);
    const [video, setVideo] = useState([]);
    const [initStatus, setinitStatus ] = useState(false);
    const [count, setCount] = useState(0);
    const [list, setList] = useState([]);	
    const [page, setPage] = useState(1); 
    const [load, setLoad] = useState(false); 
    const [end, setEnd] = useState(false); 
    const endRef = useRef(false); 
    const preventRef = useRef(true); 

    const {click,handleToggleMode} = useContext(ToggleModeContext);

    const hanldeList = () => {
        console.log(list);
        console.log(video);
    }
    useEffect(()=> { 
        console.log("IntersectionObserver Called!");
        const observer = new IntersectionObserver(obsHandler, { threshold : 0.5 });
        if(obsRef.current) observer.observe(obsRef.current);
        return () => { observer.disconnect(); }
    }, []);

    useEffect(()=>{
        console.log("Fetching Called!");
        fetch("../../videos/popular.json")
        .then((res)=>res.json())
        .then((data)=> {
            const transformedData = data.items.reduce((result, value, index, array) => {
                if (index % 5 === 0)
                    result.push(array.slice(index, index + 5));
                return result;
            },[]);
            setVideo(transformedData);
            setList(transformedData.slice(0,3));
            setCount(3);
            setinitStatus(true);
        })
    },[]);

    const obsHandler = ((entries) => { 
        const target = entries[0];
        if(!endRef.current && target.isIntersecting && preventRef.current){ 
            preventRef.current = false; 
            setPage((prev) => prev+1 ); 
        }
    });

    const getPost = useCallback(()=> { 
        console.log("called!");
        if(!initStatus) {
            preventRef.current = true;
            return; 
        }
        setLoad(true);
        if(count === video.length) { 
            endRef.current = true;
            setEnd((prev)=>!prev);
        }
        else {
            console.log(list);
            console.log(video);
            setList((prev)=> [...prev, video.slice(count,count+5)]);
            setCount((prev)=>prev+1);
            preventRef.current = true;      
        }
        if(!endRef.current) preventRef.current = true;  
        setLoad(false);
    },[page]);

    useEffect(()=> { 
        getPost();
    }, [page]);




    return (
        <ul className={`${styles.videoContainer} ${click && styles.videoContainerOn}`}>
            {list && list.map((array)=><VideoRow key={uuidv4()} videos={array}/>)}
            {load && <li className="spinner"> Loading Spinner </li>}
            {!end && <li className='' ref={obsRef}> Observer </li>}
            {end && <li>No More!</li>}
        </ul>
    );
}

