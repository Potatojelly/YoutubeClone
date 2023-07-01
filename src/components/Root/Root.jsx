import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import styles from './Root.module.css';
import ToggleModeProvider from '../../contexts/ToggleModeContext';

export default function Root() {
    return (
        <div className={styles.root}>
            <ToggleModeProvider>
                <Navbar/>
                <Outlet/>
            </ToggleModeProvider>
        </div>
    );
}

