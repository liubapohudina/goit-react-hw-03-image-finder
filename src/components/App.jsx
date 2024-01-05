import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";

export class App extends Component {
  state = {
     search: '',
  }


  handleClickSubmit = search => {
    this.setState({search})
 } 

render() {
  return (
  <div className="App">
      <Searchbar handleClickSubmit={this.handleClickSubmit} />
      <ImageGallery search={this.state.search} />
      <ToastContainer />
  </div>
)}
}






