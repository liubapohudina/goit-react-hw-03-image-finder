import React from 'react';
import styles from './button.module.css';
import PropTypes from "prop-types";

export function Button({handleOnClickBtn}) {
    return (
        <button onClick={handleOnClickBtn} className={styles.button} type="button">Load more</button>
    )
}

Button.propTypes = {
    handleOnClickBtn: PropTypes.func.isRequired,
}