import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";

export class App extends Component {
  state = {
    search: '',
    hasError: false,
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    })
  }


  handleClickSubmit = search => {
    this.setState({search})
  } 
  

  render() {
    if (this.state.hasError) {
      return (
      toast.error("Something wrong!Please wait...")
    )
  }
  return (
  <div className="App">
      <Searchbar handleClickSubmit={this.handleClickSubmit} />
      <ImageGallery search={this.state.search} />
      <ToastContainer />
  </div>
)}
}






