import React from 'react';
import styles from './SideBarBtn.module.css';

export default function SideBarBtn({image,name}) {
    return (
        <button className={styles.btn}>
            {image}
            <span className={styles.name}>{name}</span>
        </button>
    );
}

