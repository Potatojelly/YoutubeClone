import React from 'react';
import styles from './SearchBar.module.css'
import {FiSearch} from "react-icons/fi"

export default function SearchBar() {
    return (
        <div className={styles.searchBarContainer}>
            <input type="text" placeholder='Search' className={styles.searchBar}/>
            <button className={styles.searchBtn}>
                <FiSearch/>
            </button>
        </div>
    );
}

