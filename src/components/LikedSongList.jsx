import React from 'react';
import { LikedSong } from './LikedSong';

const LikedSongList = React.createClass({
	propTypes: {
		likedSongs: React.PropTypes.array.isRequired,
		deleteSong: React.PropTypes.func.isRequired
	},

	render: function() {
		const { likedSongs, deleteSong } = this.props;

		return (
			<div className='liked-song-list'>
				<ul>
					{likedSongs.map((likedSong, index) => (
						<li key={index}>
							<LikedSong
								{...likedSong}
								deleteSong={deleteSong}
							/>
						</li>
					))}
				</ul>
			</div>
		);
	}
});

export { LikedSongList };
