import React from 'react';

const ArtistInput = React.createClass({
	propTypes: {
		addArtist: React.PropTypes.func.isRequired
	},

	getInitialState: function() {
		return {
			artist: ''
		};
	},

	handleChange: function(e) {
		this.setState({
			artist: e.target.value
		});
	},

	handleAddClick: function() {
		this.props.addArtist(this.state.artist);
		this.setState({
			artist: ''
		});
	},

	render: function() {
		return (
			<div className="artist-input">
				<input
					type="text"
					value={this.state.artist}
					onChange={this.handleChange}
				/>
				<button ref="addArtist" onClick={this.handleAddClick}>
					Add Artist
				</button>
			</div>
		);
	}
});

export { ArtistInput };
