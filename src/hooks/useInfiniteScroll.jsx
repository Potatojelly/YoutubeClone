import { useEffect, useState } from 'react';


export default function useInfiniteScroll(action, page) {
    const [list, setList] = useState([]);	
    const [loading, setLoading] = useState(false); 

    useEffect(()=> { 
        setLoading(true);
        //fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=50&pageToken=${nextPageToken}&key=`)
        if(action === "comments") {
            fetch("../../videos/comments.json")    
            .then(response => response.json())
            .then((data) => {
                const temp = data.items.filter((item,index)=> index<5 &&item);
                setList((prev)=>[...prev, ...temp]);
            })
            .finally(()=>setLoading(false));
        } else {
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
    },[page]);

    return [list,loading];
}