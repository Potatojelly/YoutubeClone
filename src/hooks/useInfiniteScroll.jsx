import { useCallback, useEffect, useRef, useState } from 'react';


export default function useInfiniteScroll(action) {
    const obsRef = useRef(null);
    const [list, setList] = useState([]);	
    const [page, setPage] = useState(1); 
    const [load, setLoad] = useState(false); 


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
                switch (action) {
                    case "main" :{
                        const transformedData = data.items.reduce((result, value, index, array) => {
                            if (index % 5 === 0)
                                result.push(array.slice(index, index + 5));
                            return result;
                        },[]);
                        setList((prev)=>[...prev, ...transformedData]);
                        //nextPageToken = data.nextPageToken;
                        break;
                    }
                    case "search": {
                        const temp = data.items.filter((item,index)=> index<5 &&item);
                        setList((prev)=>[...prev, ...temp]);
                        //nextPageToken = data.nextPageToken;
                        break;
                    }
                    default: {
            
                    }
                }
            })
            .finally(()=>setLoad(false));
    },[page]);

    useEffect(()=> { 
        getPost();
    }, [getPost]);

    return [obsRef,list,load];
}