import React, { Component } from "react";

import "./SearchForm.scss";

class SearchForm extends Component {
	render() {
		return (
			<div className="search-form-wrapper">
				<i className="material-icons">search</i>
				<form id="search-form" onSubmit={this.props.handleSearchFormSubmit}>
					<input type="text" onChange={e => this.props.handleSearchInputChange(e.target.value)} placeholder="Search" />
				</form>
			</div>
		);
	}
}

export default SearchForm; 