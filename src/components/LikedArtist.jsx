import React from 'react';

const LikedArtist = React.createClass({
	deleteArtist: function() {
		this.props.deleteArtist(this.props.artist);
	},

	render: function() {
		const { artist } = this.props;

		return (
			<div className='liked-artist'>
				<span className='artist'>
					{artist}
				</span>
				<button ref='deleteArtist' onClick={this.deleteArtist}>
					Delete
				</button>
			</div>
		);
	}
});

export { LikedArtist };
