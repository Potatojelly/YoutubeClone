import React, { useEffect, useRef, useState } from 'react';
import styles from './Comment.module.css'
import {AiOutlineLike, AiOutlineDislike} from "react-icons/ai";

export default function Comment({comment}) {
    const commentRef = useRef(null);
    const {textOriginal} = comment.snippet.topLevelComment.snippet;
    console.log(textOriginal);
    const [show,setShow] = useState(false);
    const handleClick = () => {
        setShow(!show);
    }
    const shouldShowReadMoreButton = textOriginal.split('\n').length >= 5;
    return (
        <div className={styles.container}>
            <div className={styles.profileImg}></div>
            <div className={styles.commentContainer}>
                <span className={styles.userName}>username</span>
                <span className={styles.hour}>hour</span>
                <p ref={commentRef} className={`${styles.comment} ${show && styles.readMore}`}>
                    {textOriginal}
                    {shouldShowReadMoreButton && 
                        <button className={styles.readMoreBtn} onClick={handleClick}>
                            Read more
                        </button>}
                </p>
                <div className={styles.btnContainer}>
                    <button className={styles.likeBtn}><AiOutlineLike style={{fontSize:"1.2rem"}}/> <span>nums</span></button>
                    <button className={styles.dislikeBtn}><AiOutlineDislike style={{fontSize:"1.2rem"}}/></button>
                </div>
            </div>
        </div>
    );
}

