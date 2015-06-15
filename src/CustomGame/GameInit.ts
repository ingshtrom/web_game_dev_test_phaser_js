/// <reference path="../../lib/phaser/phaser.d.ts" />
/// <reference path="Game.ts" />
/// <reference path="Boot.ts" />
/// <reference path="Preloader.ts" />

module CustomGame {
    export class GameInit {

        constructor() {
            var game: Phaser.Game  = new Phaser.Game(640, 640, Phaser.AUTO, '', {});

            game.state.add('Boot', Boot);
            game.state.add('Preloader', Preloader);
            game.state.add('Game', Game);

            game.state.start('Boot');
        }
    }
}