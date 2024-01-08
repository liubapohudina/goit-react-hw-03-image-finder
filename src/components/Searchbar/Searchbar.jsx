import styles from './searchbar.module.css';
import PropTypes from "prop-types";
import { CiSearch } from "react-icons/ci";
import { Component } from 'react';
import { toast } from 'react-toastify';

export class Searchbar extends Component  {
  static propTypes = {
    handleClick: PropTypes.func,
  }
  state = {
  search : '',
}
  onChange = (event) => {
    this.setState({ search : event.currentTarget.value.toLowerCase().trim()})
  }
  handleClick = (event) => {
    event.preventDefault()
    if (this.state.search.trim() === '') {
      toast.warn("Please enter different words")
      return
    }
    this.props.handleClickSubmit(this.state.search)
    this.setState({search: ''})
  } 

  render() {
    return (<header className={styles.searchbar}>
      <form onSubmit={this.handleClick} className={styles.form}>
        <button type="submit" className={styles.button}>
          <CiSearch className={styles.icon} />
          <span className={styles.buttonLabel}>Search</span>
        </button>

        <input
          onChange={this.onChange}
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
    )
  }
}