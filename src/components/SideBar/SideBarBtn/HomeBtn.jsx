import React from 'react';
import styles from './SideBarBtn.module.css';
import {HiHome} from "react-icons/hi";

export default function HomeBtn() {
    return (
        <button className={styles.btn}>
            <HiHome/>
            <span className={styles.name}>Home</span>
        </button>
    );
}

