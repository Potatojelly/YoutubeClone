import React from 'react';
import styles from './VideoSearchPage.module.css'
import { useParams } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import VideoSearchResult from '../VideoSearchResult/VideoSearchResult';

export default function VideoSearch() {
    const params = useParams();
    console.log(params);
    return (
        <section className={styles.home}>
            <SideBar/>
            <VideoSearchResult/>
        </section>
    );
}

