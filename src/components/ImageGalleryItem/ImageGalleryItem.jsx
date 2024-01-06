import styles from './imagegalleryItem.module.css';
import PropTypes from "prop-types";
import { nanoid } from 'nanoid';


export function ImageGalleryItem({ id, src }) {
    const key = nanoid()
    return (
        <li className={styles.photoCard} id={id} key={key}>
                <img loading='lazy' className={styles.photo} src={src} alt="pictur" />
            </li>
            
    )
}

ImageGalleryItem.propTypes = {
    id: PropTypes.number,
    src: PropTypes.string.isRequired,
}