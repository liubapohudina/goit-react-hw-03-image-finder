import styles from './imagegalleryItem.module.css';
import PropTypes from "prop-types";


export function ImageGalleryItem({id, src}) {
    return (
        <li className={styles.photoCard} id={id} key={id}>
                <img loading='lazy' className={styles.photo} src={src} alt="pictur" />
            </li>
            
    )
}

ImageGalleryItem.propTypes = {
    id: PropTypes.number,
    src: PropTypes.string.isRequired,
}