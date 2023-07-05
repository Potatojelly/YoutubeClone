import React, { useContext } from 'react';
import styles from './SideBar.module.css'
import SideBarBtn from '../SideBarBtn/SideBarBtn';
import {BsSunFill} from "react-icons/bs";
import {HiHome} from "react-icons/hi";
import { ToggleModeContext } from '../../contexts/ToggleModeContext';

export default function SideBar() {
    const {click,handleToggleMode} = useContext(ToggleModeContext);
    return (
        <div className={`${styles.sideBar} ${click && styles.sideBarOn}`}>
            <div style={{position:"sticky", top:"50px"}}>
            <SideBarBtn image={<HiHome/>} name="Home"/>
            <SideBarBtn image={<BsSunFill/>} name="Light Mode"/>
            </div>
        </div>
    );
}

