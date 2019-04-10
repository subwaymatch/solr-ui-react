import React, { Component } from "react";
import ReactDOM from "react-dom";

import "reset-css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "./styles.scss";
import testData from "./test-data/query-response";

function App() {
  return (
    <div className="App">
      <div className="box-wrapper">
        <SearchControls />
        <SearchResults />
      </div>
    </div>
  );
}

class SearchControls extends Component {
  render() {
    return (
      <div className="search-controls">
        <form id="search-form">
          <input type="text" placeholder="Query here" />
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}

class SearchResults extends Component {
  render() {
    let docs = testData.response.docs;

    return (
      <div id="search-results">
        {docs.map((doc, idx) => {
          return (
            <SearchResultItem
              key={doc.id}
              idx={idx}
              id={doc.id}
              title={doc.og_title}
              desc={doc.og_description}
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
        <a href={url} title={title}>
          <div className="title-wrapper">
            <div className="row">
              <div className="col-md-2">
                <p className="index-display">{idx + 1}</p>
              </div>
              <div className="col-md-10">
                <h2>{title}</h2>
                <p className="desc">{desc}</p>
              </div>
            </div>
          </div>

          <p className="id">
            <i class="material-icons">fingerprint</i>
            <span>{id}</span>
          </p>
          <p className="url">
            <i class="material-icons">link</i>
            <span>{url}</span>
          </p>
        </a>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
