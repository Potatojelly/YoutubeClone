import React, { useContext } from 'react';
import styles from './Header.module.css'
import SearchBar from './SearchBar/SearchBar';
import {FaBars} from "react-icons/fa";
import {BsYoutube} from "react-icons/bs";
import {ToggleModeContext } from '../../contexts/ToggleModeContext';
import {Link} from 'react-router-dom';

export default function Header() {
    const {handleToggleMode} = useContext(ToggleModeContext);

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <button className={styles.toggle} onClick={handleToggleMode}>
                    <FaBars/>
                </button>
                <Link to="/" style={{textDecoration:"none"}}>
                    <div className={styles.logo}>
                        <BsYoutube style={{color: "red", fontSize: "1.8rem", marginRight: "0.2rem" }}/>
                        YoonTube
                    </div>
                </Link>
            </div>
            <SearchBar/>
        </nav>
    );
}

