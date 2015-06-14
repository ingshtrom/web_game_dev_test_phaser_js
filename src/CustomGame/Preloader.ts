/// <reference path="../../lib/phaser/phaser.d.ts" />

module CustomGame {
    export class Preloader extends Phaser.State {

        private _preloadBar: Phaser.Sprite;

        preload(): void {
            this._preloadBar = this.add.sprite(0, 100, 'preloaderBar');
            this.load.setPreloadSprite(this._preloadBar);
            
            this.game.load.image('sky', 'assets/sky.png');
            this.game.load.image('ground', 'assets/platform.png');
            this.game.load.image('star', 'assets/star.png');
            this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        }
        
        create(): void {
            this.game.state.start('Game');
        }
    }
}