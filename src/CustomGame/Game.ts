/// <reference path="../../lib/phaser/phaser.d.ts" />

module CustomGame {
    export class Game extends Phaser.State {

        private _player: Phaser.Sprite;
        private _cursors: Phaser.CursorKeys;
        private _map: Phaser.Tilemap;
        private _backgroundLayer: Phaser.TilemapLayer;
        private _blockLayer: Phaser.TilemapLayer;

        init(): void {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this._cursors = this.game.input.keyboard.createCursorKeys();
        }

        create(): void {
            this._map = this.add.tilemap('myTilemap');
            this._map.addTilesetImage('scifi_platformTiles_32x32', 'myTileset');
            this._map.setCollision(579, true, 'blocklayer');
            this._backgroundLayer = this._map.createLayer('background');
            this._blockLayer = this._map.createLayer('blocklayer');
            
            this._player = this.game.add.sprite(64, 150, 'dude');
            this.game.physics.arcade.enable(this._player);
            this._player.body.collideWorldBounds = true;
        }

        update(): void {
            this.game.physics.arcade.collide(this._player, this._blockLayer);
            
            this._player.animations.frame = 4;

            this._player.body.velocity.x = 0;
            this._player.body.velocity.y = 0;

            if (this._cursors.left.isDown) {
                this._player.body.velocity.x -= 300;
            } 
            if (this._cursors.right.isDown) {
                this._player.body.velocity.x += 300;
            } 
            if (this._cursors.down.isDown) {
                this._player.body.velocity.y += 300;
            } 
            if (this._cursors.up.isDown) {
                this._player.body.velocity.y -= 300;
            }
        }
    }
}