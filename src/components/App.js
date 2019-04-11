import React, { Component } from "react";

import "reset-css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "./App.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import * as Constants from "../constants";
import mockData from "../mock-data.js";

import SearchControls from "./SearchControls";
import SearchResults from "./SearchResults";
import Footer from "./Footer";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchAlgorithm: Constants.SEARCH_ALGO_DEFAULT,
      queryTerm: null,
      items: mockData.response.docs
    };

    // Configure Android-styled toast
    toast.configure()

    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);
    this.handleSearchAlgorithmChange = this.handleSearchAlgorithmChange.bind(
      this
    );
  }

  handleSearchInputChange(queryTerm) {
    this.setState({ queryTerm: queryTerm });
  }

  handleSearchFormSubmit(e) {
    e.preventDefault();

    /* ================================================
      Delete the lines below for production that has a 
      backing server to communicate with the Solr server
    =================================================== */
    toast("This is a demo without a Solr server.",
      {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true
      });
    return;

    // Since this is display-only without a server that communicates with Solr, display a message

    var params = {
      "q": this.state.queryTerm,
      "fl": "id,og_title,og_url,og_description",
      "wt": "json"
    };

    if (this.state.searchAlgorithm === Constants.SEARCH_ALGO_PAGERANK) {
      params["sort"] = "pageRankFile desc";
    }

    var queryParams = Object.keys(params)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');

    fetch("http://localhost:8080/solr/theguardian/select?" + queryParams)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            items: result.response.docs
          });
        },
        (error) => {
          console.log("error fetching API");
          console.log(error);
        }
      )
  }

  handleSearchAlgorithmChange(newAlgorithm) {
    this.setState({
      searchAlgorithm: newAlgorithm
    });
  }

  render() {
    return (
      <div className="App">
        <div className="box-wrapper">
          <SearchControls
            handleSearchInputChange={this.handleSearchInputChange}
            handleSearchFormSubmit={this.handleSearchFormSubmit}
            handleSearchAlgorithmChange={this.handleSearchAlgorithmChange}
            searchAlgorithm={this.state.searchAlgorithm}
          />
          <SearchResults items={this.state.items} />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App; 