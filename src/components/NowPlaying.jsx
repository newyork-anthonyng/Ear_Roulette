import React from 'react';

const NowPlaying = React.createClass({
	propTypes: {
		playSong: React.PropTypes.func.isRequired,
		pauseSong: React.PropTypes.func.isRequired,
		likeSong: React.PropTypes.func.isRequired,
		artist: React.PropTypes.string.isRequired,
		title: React.PropTypes.string.isRequired,
		src: React.PropTypes.string.isRequired,
		isPlaying: React.PropTypes.bool.isRequired
	},

	handlePlayClick: function() {
		this.props.playSong();
	},

	handlePauseClick: function() {
		this.props.pauseSong();
	},

	handleLikeClick: function() {
		this.props.likeSong();
	},

	render: function() {
		const { artist, title, src, isPlaying } = this.props;
		const style = {
			backgroundImage: {src}
		};

		return (
			<div className='now-playing' style={style}>
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
				<button ref='likeSong' onClick={this.handleLikeClick}>
					Like
				</button>
			</div>
		);
	}
});

export { NowPlaying };
