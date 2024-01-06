import React from 'react';
import styles from './button.module.css';

export function Button({handleOnClickBtn}) {
    return (
        <button onClick={handleOnClickBtn} className={styles.button} type="button">Load more</button>
    )
}