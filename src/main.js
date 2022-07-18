import Phaser from 'phaser'

import Preloader from './scenes/Preloader'
import Game from './scenes/Game'

export default new Phaser.Game({
	type: Phaser.AUTO,
	width: 1200,
	height: 860,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: false
		}
	},
	scene: [Preloader, Game],
})
