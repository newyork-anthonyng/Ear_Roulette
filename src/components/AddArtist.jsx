import React from 'react';
import { ArtistInput } from './ArtistInput';
import { LikedArtistList } from './LikedArtistList';

const AddArtist = React.createClass({
	propTypes: {
		likedArtists: React.PropTypes.array.isRequired,
		deleteArtist: React.PropTypes.func.isRequired,
		addArtist: React.PropTypes.func.isRequired
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
		const { likedArtists, deleteArtist, addArtist } = this.props;

		return (
			<div>
				<button
					className='show-liked-artists'
					onClick={this.handleClick}
				>
					Liked Artists
				</button>
				{this.state.isShowing ?
					<div className="add-artist">
						<ArtistInput addArtist={addArtist} />
						<LikedArtistList
							likedArtists={likedArtists}
							deleteArtist={deleteArtist}
						/>
					</div>
				: null}
			</div>
		);
	}
});

export { AddArtist };
