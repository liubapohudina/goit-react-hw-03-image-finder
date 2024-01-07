import styles from './imageGallery.module.css';
import { fetchData } from 'helpers/helpers';
import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { toast } from 'react-toastify';
import { Button } from '../Button/Button';


export class ImageGallery extends Component {
    state = {
        totalHits: 0,
        page: 1,
        query: [],
        btnLoadMore: false,
        search: '',
    }

    componentDidUpdate(prevProps, prevState) {
    const { page, search } = this.state;
    const prevSearch = prevProps.search;
    const nextSearch = this.props.search;

        if (prevSearch !== nextSearch) {
        this.setState({
            query: [],
            page: 1,
            search: nextSearch,
         });
        }
        if (prevState.search !== search || prevState.page !== page) {
            this.fetchDataAndUpdateState();
            return;
            }
}

    

    fetchDataAndUpdateState = async () => {
        const { page, query } = this.state;
        const  { search } = this.props;
        const response = await fetchData(search, page);
        try {
            if (response.hits.length === 0) {
                toast.warn("Not found pictures!");
                this.setState({
                    query: [],
                    page: 1,
                })
            }
                if (response.totalHits > 12) {
                this.setState({
                    btnLoadMore: true,
                })
            }
            if (response.hits.length <= 11) {
                this.setState({
                    btnLoadMore: false,
                })
            }
              this.setState({
                totalHits: response.totalHits,
                 query: [...query, ...response.hits],
             });
        
        
        } catch {
            toast.error("Something wrong...");
        }
    }


    
        handleClick = async () => {
            const { page } = this.state;
            this.setState({
                page: page + 1,
            })
    };




    render() {
        const { query } = this.state;

        const elements = query
            ? query.map(({ id, webformatURL }) => (
                <ImageGalleryItem id={id} src={webformatURL} key={id} />
            ))
            : null;

        return (
            <div className={styles.blockCards}>
                <ul className={styles.gallery}>{elements}</ul>
                {this.state.btnLoadMore && <Button handleOnClickBtn={this.handleClick} />}
            </div>
        );
    }
}




