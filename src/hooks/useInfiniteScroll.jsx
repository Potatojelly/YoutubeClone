import { useCallback, useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { search } from '../api/youtube';


export default function useInfiniteScroll(keyword) {
    const [list, setList] = useState([]);	
    const [loading, setLoading] = useState(false); 
    const [pageNumber, setPageNumber] = useState(1);
    
    const observer= useRef();
    const lastElementRef = useCallback(node=> {
        if(loading) return;
        if(observer.current)  observer.current.disconnect();
        observer.current = new IntersectionObserver(entries=>{
            if(entries[0].isIntersecting) {
                setPageNumber(prev => prev + 1)
            }
        },{threshold: 1});
        if(node) observer.current.observe(node);
    },[loading]);

    useEffect(()=> { 
        setLoading(true);
        if(keyword === "comments") {
            fetch("../../videos/comments.json")    
            .then(response => response.json())
            .then((data) => {
                console.log("comment call!");
                const temp = data.items.filter((item,index)=> index<5 &&item);
                setList((prev)=>[...prev, ...temp]);
            })
            .finally(()=>setLoading(false));
        } else {
            fetch("../../videos/popular.json")    
            .then(response => response.json())
            .then((data) => {
                switch (keyword) {
                    case "main" :{
                        // const transformedData = data.items.reduce((result, value, index, array) => {
                        //     if ((index !== 45) && index % 15 === 0)
                        //         result.push(array.slice(index, index + 15));
                        //     return result;
                        // },[]);
                        // setList((prev)=>[...prev, ...transformedData]);
                        // //nextPageToken = data.nextPageToken;
                        // break;
                        console.log(pageNumber);
                        const temp = data.items.filter((item,index)=> index<30 &&item);
                        setList((prev)=>[...prev, ...temp]);
                        //nextPageToken = data.nextPageToken;
                        break;
                    }
                    case "search": {
                        const temp = data.items.filter((item,index)=> index<5 &&item);
                        setList((prev)=>[...prev, ...temp]);
                        //nextPageToken = data.nextPageToken;
                        break;
                    }
                    case "related": {
                        const temp = data.items.filter((item,index)=> index<5 &&item);
                        setList((prev)=>[...prev, ...temp]);
                        //nextPageToken = data.nextPageToken;
                        break;
                    }
                    default: {
            
                    }
                }
            })
            .finally(()=>setLoading(false));
        }
    },[pageNumber]);

    return [list,loading,lastElementRef];
}