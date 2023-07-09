import React, { useContext } from 'react';
import styles from './SideBar.module.css'
import { ToggleModeContext } from '../../contexts/ToggleModeContext';
import HomeBtn from '../SideBarBtn/HomeBtn';
import ModeBtn from '../SideBarBtn/ModeBtn';

export default function SideBar() {
    const {click} = useContext(ToggleModeContext);

    return (
        <div className={`${styles.sideBar} ${click && styles.sideBarOn}`}>
            <div className={styles.btnContainer}>
                <HomeBtn/>
                <ModeBtn/>
            </div>
        </div>
    );
}

