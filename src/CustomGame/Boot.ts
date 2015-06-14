/// <reference path="../../lib/phaser/phaser.d.ts" />

module CustomGame {
    export class Boot extends Phaser.State {
        preload(): void {
            this.load.image('preloaderBar', 'assets/preload.png');
        }
        
        create(): void {
            this.game.state.start('Preloader');
        }
    }
}