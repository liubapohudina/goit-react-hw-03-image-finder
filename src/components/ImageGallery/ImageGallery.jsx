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
    }

    async fetchDataAndUpdateState(search, page) {
        try {
            const response = await fetchData(search, page);

            this.setState((prevState) => ({
                totalHits: response.totalHits,
                query: [...prevState.query, ...response.hits], 
            }));

            if (response.hits.length === 0) {
                toast.warn("Not found pictures!");
            }
        } catch {
            toast.error("Something wrong...");
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        const { search } = this.props;
        const { page } = this.state;
        if (prevProps.search !== search || prevState.page !== page) {
            await this.fetchDataAndUpdateState(search, page);
        }
    }


//    async handleClick(event) {
//     const isBtn = event.target.closest('button');
//     if (isBtn) {
//         this.setState((prevState) => ({
//             page: prevState.page + 1,
//         }), async () => {
//             const { search } = this.props;
//             const { page } = this.state;
//             console.log(search, page);
//             await this.fetchDataAndUpdateState(search, page);
//         });
//     }
    // }
    
        handleClick = async () => {
        const { search } = this.props;
            const { page } = this.state;
            this.setState({
                page: page + 1,
            })
        console.log(search, page);
        //await this.fetchDataAndUpdateState(search, page);
    };


    // async handleClick (event)  {
    //     const isBtn = event.target.closest('button');
    //     if (isBtn) {
    //         this.setState((prevState) => ({
    //             page: prevState.page + 1,
    //         }))
    //         const { search } = this.props;
    //         const { page } = this.state;
    //         console.log(search,page)
    //         await this.fetchDataAndUpdateState(search, page);
    //     }
    // };


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
                {this.state.totalHits > 12 ? <Button handleOnClickBtn={this.handleClick} /> : null}
            </div>
        );
    }
}
