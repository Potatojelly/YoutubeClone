import React from 'react';
import styles from './Navbar.module.css'
import SearchBar from '../SearchBar/SearchBar';
import {FaBars} from "react-icons/fa";
import {BsYoutube} from "react-icons/bs";
export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <button className={styles.toggle}>
                    <FaBars/>
                </button>
                <div className={styles.logo} >
                    <BsYoutube style={{color: "red", fontSize: "1.8rem", marginRight: "0.2rem" }}/>
                    YouTube
                </div>
            </div>
            <SearchBar/>
            <button className={styles.loginBtn}>Login</button>
        </nav>
    );
}

