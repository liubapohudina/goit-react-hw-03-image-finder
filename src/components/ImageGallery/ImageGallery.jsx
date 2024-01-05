
import styles from './imageGallery.module.css';
import { fetchData } from 'helpers/helpers';
import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { toast } from 'react-toastify';


export class ImageGallery extends Component {
    state = {
        page: 1,
        query: null,
    }




    async componentDidUpdate(prevProps, prevState) {
        const search = this.props.search
        if (prevProps.search !== search) {
            try {
                const response = await fetchData(search);
                this.setState({
                    query: response.hits,
                })
            }
            catch {
                toast.error("Something wrong...")
            }
        }
    }
    
      render() {
        const { query } = this.state; 
        const elements = query
            ? query.map(({ id, webformatURL }) => (
                  <ImageGalleryItem id={id} src={webformatURL} key={id} />
              ))
            : null;

        return <ul className={styles.gallery}>{elements}</ul>;
    }
}

