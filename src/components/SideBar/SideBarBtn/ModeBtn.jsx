import React from 'react';
import {BsMoonFill} from "react-icons/bs";
import {BsSunFill} from "react-icons/bs";
import styles from "./SideBarBtn.module.css";
import { useDarkMode } from '../../../contexts/DarkModeContext';

export default function ModeBtn() {
    const {darkMode, toggleDarkMode} = useDarkMode();
    return (
        <button className={styles.btn} onClick={toggleDarkMode}>
            {darkMode && <BsMoonFill/>}
            {!darkMode && <BsSunFill/>}
            <span className={styles.name}>{darkMode ? "Dark Mode" : "Light Mode"}</span>
        </button>
    );
}

