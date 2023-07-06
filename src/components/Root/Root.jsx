import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import styles from './Root.module.css';
import ToggleModeProvider from '../../contexts/ToggleModeContext';
import { DarkModeProvider } from '../../contexts/DarkModeContext';


export default function Root() {
    return (
        <div className={styles.root}>
            <DarkModeProvider>
            <ToggleModeProvider>
                <Navbar/>
                <Outlet/>
            </ToggleModeProvider>
            </DarkModeProvider>
        </div>
    );
}

