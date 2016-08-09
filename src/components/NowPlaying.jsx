import React from 'react';

const NowPlaying = React.createClass({
	propTypes: {
		playSong: React.PropTypes.func.isRequired,
		pauseSong: React.PropTypes.func.isRequired,
		likeSong: React.PropTypes.func.isRequired,
		unlikeSong: React.PropTypes.func.isRequired,
		artist: React.PropTypes.string.isRequired,
		title: React.PropTypes.string.isRequired,
		image: React.PropTypes.string.isRequired,
		preview: React.PropTypes.string.isRequired,
		isPlaying: React.PropTypes.bool.isRequired,
		isLiked: React.PropTypes.bool.isRequired
	},

	handlePlayClick: function() {
		this.props.playSong();
	},

	handlePauseClick: function() {
		this.props.pauseSong();
	},

	handleLikeClick: function() {
		const song = {
			title: this.props.title,
			artist: this.props.artist
		};
		this.props.likeSong(song);
	},

	handleUnlikeClick: function() {
		const song = {
			title: this.props.title,
			artist: this.props.artist
		};
		this.props.unlikeSong(song);
	},

	render: function() {
		const { artist, title, image, isPlaying, isLiked } = this.props;

		return (
			<div className='now-playing'>
				<img src={image} alt={title + ': ' + artist}/>
				<span className='title'>
					{title}
				</span>
				<span className='artist'>
					{artist}
				</span>
				{isPlaying ?
					<button ref='pauseSong' onClick={this.handlePauseClick}>
						Pause
					</button>:
					<button ref='playSong' onClick={this.handlePlayClick}>
						Play
					</button>
				}
				{isLiked ?
				<button ref='unlikeSong' onClick={this.handleUnlikeClick}>
					Unlike
				</button>:
				<button ref='likeSong' onClick={this.handleLikeClick}>
					Like
				</button>
				}
			</div>
		);
	}
});

export { NowPlaying };
