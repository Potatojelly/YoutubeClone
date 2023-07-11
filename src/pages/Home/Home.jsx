import React from 'react';
import SideBar from '../../components/SideBar/SideBar';
import styles from './Home.module.css'
import PopularVideoFrame from "../../components/PopularVideoFrame/PopularVideoFrame";


export default function Home() {
    return (
        <section className={styles.home}>
            <SideBar/>
            <PopularVideoFrame/>
        </section>
    );
}

