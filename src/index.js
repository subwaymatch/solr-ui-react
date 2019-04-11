import React, { Component } from "react";
import ReactDOM from "react-dom";

import "reset-css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "./styles.scss";
import * as Constants from "./constants";
import testData from "./test-data/query-response";

let classNames = require("classnames");

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchAlgorithm: Constants.SEARCH_ALGO_DEFAULT,
      items: testData.response.docs
    };

    this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);
    this.handleSearchAlgorithmChange = this.handleSearchAlgorithmChange.bind(
      this
    );
  }

  handleSearchFormSubmit(e) {
    e.preventDefault();
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

class SearchControls extends Component {
  render() {
    return (
      <div className="search-controls">
        <div className="row">
          <div className="col-md-7">
            <SearchForm
              handleSearchFormSubmit={this.props.handleSearchFormSubmit}
            />
          </div>

          <div className="col-md-5">
            <SearchRankAlgorithm
              handleSearchAlgorithmChange={
                this.props.handleSearchAlgorithmChange
              }
              searchAlgorithm={this.props.searchAlgorithm}
            />
          </div>
        </div>
      </div>
    );
  }
}

class SearchForm extends Component {
  render() {
    return (
      <div className="search-form-wrapper">
        <i className="material-icons">search</i>
        <form id="search-form" onSubmit={this.props.handleSearchFormSubmit}>
          <input type="text" placeholder="Search" />
        </form>
      </div>
    );
  }
}

class SearchRankAlgorithm extends Component {
  render() {
    let defaultAlgoBtnClass = classNames({
      "option-select": true,
      selected: this.props.searchAlgorithm === Constants.SEARCH_ALGO_DEFAULT
    });

    let pageRankAlgoBtnClass = classNames({
      "option-select": true,
      selected: this.props.searchAlgorithm === Constants.SEARCH_ALGO_PAGERANK
    });

    return (
      <div className="search-rank-algorithm-wrapper">
        <label className="search-algorithm-label">Search Algorithm</label>
        <div
          id="option-default"
          className={defaultAlgoBtnClass}
          onClick={e =>
            this.props.handleSearchAlgorithmChange(
              Constants.SEARCH_ALGO_DEFAULT
            )
          }
        >
          <label>Lucene</label>
          <div className="indicator-wrapper">
            <span className="circle show-on-selected" />
          </div>
        </div>
        <div
          id="option-pagerank"
          className={pageRankAlgoBtnClass}
          onClick={e =>
            this.props.handleSearchAlgorithmChange(
              Constants.SEARCH_ALGO_PAGERANK
            )
          }
        >
          <label>PageRank</label>
          <div className="indicator-wrapper">
            <span className="circle show-on-selected" />
          </div>
        </div>
      </div>
    );
  }
}

class SearchResults extends Component {
  render() {
    let items = this.props.items;

    return (
      <div id="search-results">
        {items.map((doc, idx) => {
          return (
            <SearchResultItem
              key={doc.id}
              idx={idx}
              id={doc.id}
              title={doc.og_title ? doc.og_title : "N/A"}
              desc={doc.og_description ? doc.og_description : "N/A"}
              url={doc.og_url}
            />
          );
        })}
      </div>
    );
  }
}

class SearchResultItem extends Component {
  render() {
    let { idx, id, title, desc, url } = this.props;

    return (
      <div className="search-result-item">
        <a className="box-link" href={url} title={title}>
          <div className="title-wrapper">
            <div className="row">
              <div className="col-md-2">
                <p className="index-display">
                  {(idx + 1).toString().padStart(2, 0)}
                </p>
              </div>

              <div className="col-md-10">
                <h2>{title}</h2>
                <p className="desc">{desc}</p>
              </div>
            </div>
          </div>

          <div className="id">
            <i className="material-icons">fingerprint</i>
            <span>{id}</span>
          </div>
          <div className="url">
            <i className="material-icons">link</i>
            <span>{url}</span>
          </div>
        </a>
      </div>
    );
  }
}

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="row">
          <div className="col-md-12">
            <div className="footer-logo-wrapper">
              <span>Articles indexed from</span>
              <img src="/images/Logo_The_Guardian.png" alt="The Guardian" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
