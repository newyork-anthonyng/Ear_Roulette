import React from 'react';
import { LikedArtist } from './LikedArtist';

const LikedArtistList = React.createClass({
	propTypes: {
		likedArtists: React.PropTypes.array.isRequired,
		deleteArtist: React.PropTypes.func.isRequired
	},

	render: function() {
		const { likedArtists, deleteArtist } = this.props;

		return (
			<div className="liked-artist-list">
				<ul>
					{likedArtists.map((likedArtist, index) => (
						<li key={index}>
							<LikedArtist
								artist={likedArtist}
								deleteArtist={deleteArtist} />
						</li>
					))}
				</ul>
			</div>
		);
	}
});

export { LikedArtistList };
