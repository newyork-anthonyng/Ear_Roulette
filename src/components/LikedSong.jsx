import React from 'react';

const LikedSong = React.createClass({
	propTypes: {
		title: React.PropTypes.string.isRequired,
		artist: React.PropTypes.string.isRequired,
		deleteSong: React.PropTypes.func.isRequired
	},

	createLink: function(title, artist) {
		return 'youtube.com/' + title + '_' + artist;
	},

	deleteSong: function() {
		const { title, artist } = this.props;
		this.props.deleteSong(title, artist);
	},

	render: function() {
		const { title, artist } = this.props;

		return (
			<div className="liked-song">
				<span className="title">
					{title}
				</span>
				<span className="artist">
					{artist}
				</span>
				<span className="link">
					{this.createLink(title, artist)}
				</span>
				<button ref="deleteSong" onClick={this.deleteSong}>
					Delete
				</button>
			</div>
		);
	}
});

export { LikedSong };
