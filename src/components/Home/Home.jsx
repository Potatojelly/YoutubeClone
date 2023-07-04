import React from 'react';
import SideBar from '../SideBar/SideBar';
import styles from './Home.module.css'
import Video from "../Video/Video";


export default function Home() {
    return (
        <section className={styles.home}>
            <SideBar/>
            <Video/>
        </section>
    );
}

