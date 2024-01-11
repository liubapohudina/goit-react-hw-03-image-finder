import styles from './imageGallery.module.css';
import PropTypes from "prop-types";
import { fetchData, setLocalStorage } from 'helpers/helpers';
import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { toast } from 'react-toastify';
import { Button } from '../Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';


export class ImageGallery extends Component {
    static propTypes = {
        search: PropTypes.string.isRequired,
    }
    state = {
        totalHits: 0,
        page: 1,
        query: [],
        btnLoadMore: false,
        search: '',
        isLoading: false,
        isModal: false, 
        modalItem: [],
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
        const { search } = this.props;
        this.setState({
            isLoading: true,
        })
        const data = await fetchData(search, page);
        //console.log(data)
        try {
            if (data.photos.length === 0) {
                toast.warn("Not found pictures!");
                this.setState({
                    query: [],
                    page: 1,
                })
            }
                if (data.total_results > 12) {
                this.setState({
                    btnLoadMore: true,
                })
            }
            if (data.photos.length <= 11) {
                this.setState({
                    btnLoadMore: false,
                })
            }
                this.setState({
                totalHits: data.total_results,
                query: [...query, ...data.photos],
         }, () => {
                setLocalStorage('query', (this.state.query))
       });

        
        } catch {
            toast.error("Something wrong...");
        } finally {
            this.setState({
                isLoading: false,
            })
        }
    }


    
    handleClickLoadMore = async () => {
            const { page } = this.state;
            this.setState({
                page: page + 1,
            })
    };
    handleClickGalleryItem = (id) => {
        // console.log(event.target.nodeName)
        const { query } = this.state;
        // const currentItem = event.target.id;
        const currentItemInfo = query.find(item => item.id === id)
        if (currentItemInfo) {
            this.setState({
                modalItem: currentItemInfo,
                isModal: true,
            })
        }
    }
   
    





    render() {
        const { query, isLoading, btnLoadMore, isModal } = this.state;
    
        const elements = query
            ? query.map(({ id, src, alt }) => (
                <ImageGalleryItem id={id} src={src} key={id} alt={alt} handleClick={this.handleClickGalleryItem}/>
            ))
            : null;

        return (
            <div className={styles.blockCards}>
                <ul className={styles.gallery}>{elements}</ul>
                {isLoading ? <Loader /> : btnLoadMore &&  <Button handleOnClickBtn={this.handleClickLoadMore} />}
                {isModal && <Modal arrayItem={this.state.modalItem} closeModal={() => this.setState({ isModal: false })}/>}
            </div>
        );
    }
}


