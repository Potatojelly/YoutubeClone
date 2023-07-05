import React, { forwardRef, useEffect, useRef, useState } from 'react';
import styles from './Comment.module.css'
import {AiOutlineLike, AiOutlineDislike} from "react-icons/ai";
import getDateDiff from '../../common/getDateDiff';

const Comment = ({comment},ref) => {
    const commentRef = useRef(null);
    const {textOriginal,authorDisplayName,authorProfileImageUrl,likeCount,publishedAt} = comment.snippet.topLevelComment.snippet;
    const [commentText,setCommentText] = useState([]);
    const [shouldShowReadMoreButton,setShouldShowReadMoreButton] = useState(false);
    const [show,setShow] = useState(false);
    const date = getDateDiff(publishedAt);
    const handleClick = () => {
        setShow(!show);
    }

    useEffect(()=>{
        setCommentText(textOriginal.split('\n'));
    },[]);

    useEffect(()=>{
        setShouldShowReadMoreButton(textOriginal.split('\n').length >= 5);
    },[]);

    return (
        <div className={styles.container} ref={ref}>
            <img 
                src={authorProfileImageUrl}
                alt="userProfile" 
                className={styles.profileImg}
                style={{objectFit:"contain"}}
            />
            <div className={styles.commentContainer}>
                <span className={styles.userName}>{authorDisplayName}</span>
                <span className={styles.hour}>{date}</span>
                <div ref={commentRef}>
                    <div className={`${styles.comment} ${show && styles.readMore}`}>
                        {commentText.map((item,index)=><p key={index}>{item}</p>)}
                    </div>
                    {shouldShowReadMoreButton && 
                    <span className={styles.readMoreBtn} onClick={handleClick}>
                        {!show ? "Read more" : "Show less"}
                    </span>}
                </div>
                <div className={styles.btnContainer}>
                    <button className={styles.likeBtn}><AiOutlineLike style={{fontSize:"1.2rem"}}/> <span>{likeCount}</span></button>
                    <button className={styles.dislikeBtn}><AiOutlineDislike style={{fontSize:"1.2rem"}}/></button>
                </div>
            </div>
        </div>
    );
}

export default forwardRef(Comment);

