import styles from './imagegalleryItem.module.css';
import PropTypes from "prop-types";
import { nanoid } from 'nanoid';


export function ImageGalleryItem({ id, src, alt, handleClick }) {
    const pathToImage = src.original;
    const key = nanoid()
    return (
        <li className={styles.photoCard} key={key} onClick={() => handleClick(id)}>
                <img  id={id} loading='lazy' className={styles.photo} src={pathToImage} alt={alt} />
            </li>
            
    )
}

ImageGalleryItem.propTypes = {
    id: PropTypes.number,
    src: PropTypes.object.isRequired,
    alt: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
}