/// <reference path="../../lib/phaser/phaser.d.ts" />

module CustomGame {
    export class Preloader extends Phaser.State {

        private _preloadBar: Phaser.Sprite;

        preload(): void {
            this._preloadBar = this.add.sprite(0, 100, 'preloaderBar');
            this.load.setPreloadSprite(this._preloadBar);
            
            this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
            
            // level 1
            this.load.tilemap('myTilemap', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('myTileset', "assets/scifi_platformTiles_32x32.png");
        }
        
        create(): void {
            this.game.state.start('Game');
        }
    }
}