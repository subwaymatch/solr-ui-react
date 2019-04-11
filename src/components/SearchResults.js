import React, { Component } from "react";
import SearchResultItem from "./SearchResultItem";

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

export default SearchResults; 