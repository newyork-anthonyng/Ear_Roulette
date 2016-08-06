import React from 'react';

const LikedSong = React.createClass({
	createLink: function(title, artist) {
		return 'youtube.com/' + title + '_' + artist;
	},

	render: function() {
		const { title, artist, deleteSong } = this.props;

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
				<button ref="deleteSong" onClick={deleteSong}>
					Delete
				</button>
			</div>
		);
	}
});

export { LikedSong };
