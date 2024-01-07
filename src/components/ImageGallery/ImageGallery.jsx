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
    }


      componentDidUpdate(prevProps, prevState) {
        const { search } = this.props;
        const { page } = this.state;
        const prevSearch = prevProps.search;
        const nextSearch = this.props.search;
        // console.log(prevSearch)
        // console.log(nextSearch)
        if (prevProps.search !== search || prevState.page !== page) {
             this.fetchDataAndUpdateState(search, page);
            console.log('block if || update')
            
        }
        if (prevProps.search !== search) {
            this.setState({
            query: [],
            page: 1,
            search: search,
        });
            console.log("block if update when search is different")
            console.log(this.state.query)
            console.log(this.state.page)
            console.log(this.state.search)

      }
     
    }

    fetchDataAndUpdateState = async () => {
        const { page } = this.state;
        const { search } = this.props;
        const response = await fetchData(search, page);
        try {
            
         console.log("data is updated")
             this.setState((prevState) => ({
                totalHits: response.totalHits,
                query: [...prevState.query, ...response.hits], 
            }));
            if (response.hits.length === 0) {
                toast.warn("Not found pictures!");
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
        } catch {
            toast.error("Something wrong...");
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
            const { page } = this.state;
            this.setState({
                page: page + 1,
            })
            console.log("click btn")
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
                {this.state.btnLoadMore && <Button handleOnClickBtn={this.handleClick} />}
            </div>
        );
    }
}



