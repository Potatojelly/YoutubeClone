import { useCallback, useEffect, useRef, useState } from 'react';


export default function useInfiniteScroll(action) {
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
        },{threshold: 0.8});
        if(node) observer.current.observe(node);
    },[loading]);

    useEffect(()=> { 
        setLoading(true);
        //fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=50&pageToken=${nextPageToken}&key=`)
        if(action === "comments") {
            fetch("../../videos/comments.json")    
            .then(response => response.json())
            .then((data) => {
                console.log("comment call!");
                const temp = data.items.filter((item,index)=> index<30 &&item);
                setList((prev)=>[...prev, ...temp]);
            })
            .finally(()=>setLoading(false));
        } else {
            fetch("../../videos/popular.json")    
            .then(response => response.json())
            .then((data) => {
                switch (action) {
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