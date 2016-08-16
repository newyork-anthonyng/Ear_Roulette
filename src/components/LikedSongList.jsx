import React from 'react';
import { LikedSong } from './LikedSong';

const LikedSongList = React.createClass({
	propTypes: {
		likedSongs: React.PropTypes.array.isRequired,
		deleteSong: React.PropTypes.func.isRequired
	},

	getInitialState: function() {
		return {
			isShowing: false
		};
	},

	handleClick: function() {
		this.setState({
			isShowing: !this.state.isShowing
		});
	},

	render: function() {
		const { likedSongs, deleteSong } = this.props;

		return (
			<div>
				<button
					className='show-liked-songs'
					onClick={this.handleClick}
				>
					Liked Songs
				</button>
				{this.state.isShowing ?
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
				: null}
			</div>
		);
	}
});

export { LikedSongList };
