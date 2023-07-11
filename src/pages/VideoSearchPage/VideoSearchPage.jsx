import React from 'react';
import styles from './VideoSearchPage.module.css'
import { useParams } from 'react-router-dom';
import VideoSearchFrame from "../../components/VideoSearchFrame/VideoSearchFrame";
import SideBar from '../../components/SideBar/SideBar';

export default function VideoSearchPage() {
    const params = useParams();
    return (
        <section className={styles.home}>
            <SideBar/>
            <VideoSearchFrame keyword={params.keyword}/>
        </section>
    );
}

