import styles from './modal.module.css';
import PropTypes from "prop-types";
import React, { Component } from 'react';


export class Modal extends Component {
    static propTypes = {
        src: PropTypes.object,
        alt: PropTypes.string,
        closeModal: PropTypes.func.isRequired,
    }
    state = {
        isOpen: true,
    }

    
      componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    }
    

    handleClickElement = (event) => {
      const currentClickItem = event.target.nodeName;
        if (currentClickItem  === "DIV") {
            this.props.closeModal();
        }
    }
      handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      this.props.closeModal();
    }
  };



    render() {
        const { src, alt } = this.props.arrayItem;
        const { large } = src;
         return (
            <div className={styles.overlay} onClick={this.handleClickElement}>
                <div className={styles.modal}>
                    modal
                    <img src={large} alt={alt} />
                </div>
            </div>
        )
    }
}
