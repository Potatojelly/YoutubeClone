import React, { useState } from 'react';
import styles from './SearchBar.module.css'
import {FiSearch} from "react-icons/fi"
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
    const [text,setText] = useState("");
    const navigate = useNavigate();
    const handleChange = (e) => {
        setText(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setText("");
        navigate(`videos/${text}`);
    }
    return (
        <form className={styles.searchBarContainer} onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder='Search' 
                className={styles.searchBar}
                value = {text}
                onChange={handleChange}/>
            <button className={styles.searchBtn}>
                <FiSearch/>
            </button>
        </form>
    );
}

