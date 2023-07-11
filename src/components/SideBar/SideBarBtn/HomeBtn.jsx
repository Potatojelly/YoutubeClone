import React from 'react';
import styles from './SideBarBtn.module.css';
import {HiHome} from "react-icons/hi";
import { Link } from 'react-router-dom';

export default function HomeBtn() {

    return (
        <Link to="/">
            <button className={styles.btn}>
                <HiHome/>
                <span className={styles.name}>Home</span>
            </button>
        </Link>
    );
}

