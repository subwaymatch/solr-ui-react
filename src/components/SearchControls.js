import React, { Component } from "react";
import SearchForm from "./SearchForm";
import SearchRankAlgorithm from "./SearchRankAlgorithm";

import "./SearchControls.scss";

class SearchControls extends Component {
	render() {
		return (
			<div className="search-controls">
				<div className="row">
					<div className="col-md-7">
						<SearchForm
							handleSearchInputChange={this.props.handleSearchInputChange}
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

export default SearchControls;