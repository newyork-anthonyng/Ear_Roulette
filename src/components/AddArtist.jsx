import React from 'react';
import { ArtistInput } from './ArtistInput';
import { LikedArtistList } from './LikedArtistList';

const AddArtist = React.createClass({
	render: function() {
		const { likedArtists, deleteArtist, addArtist } = this.props;

		return (
			<div className="add-artist">
				<ArtistInput addArtist={addArtist} />
				<LikedArtistList
					likedArtists={likedArtists}
					deleteArtist={deleteArtist}
				/>
			</div>
		);
	}
});

export { AddArtist };
