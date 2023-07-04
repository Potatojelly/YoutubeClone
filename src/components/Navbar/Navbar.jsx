import React, { useContext } from 'react';
import styles from './Navbar.module.css'
import SearchBar from '../SearchBar/SearchBar';
import {FaBars} from "react-icons/fa";
import {BsYoutube} from "react-icons/bs";
import { ToggleModeContext } from '../../contexts/ToggleModeContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const {click,handleToggleMode} = useContext(ToggleModeContext);
    const navigate = useNavigate();
    const goHome = () => {
        navigate("/videos");
    }
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <button className={styles.toggle} onClick={handleToggleMode}>
                    <FaBars/>
                </button>
                <div className={styles.logo} onClick={goHome} >
                    <BsYoutube style={{color: "red", fontSize: "1.8rem", marginRight: "0.2rem" }}/>
                    YouTube
                </div>
            </div>
            <SearchBar/>
            <button className={styles.loginBtn}>Login</button>
        </nav>
    );
}

