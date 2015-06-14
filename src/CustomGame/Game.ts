/// <reference path="../../lib/phaser/phaser.d.ts" />

module CustomGame {
    export class Game extends Phaser.State {

        private _platforms: Phaser.Group;
        private _player: Phaser.Sprite;
        private _cursors: Phaser.CursorKeys;
        private _stars: Phaser.Group;
        
        private _score: number = 0;
        private _scoreText: Phaser.Text;

        init(): void {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this._cursors = this.game.input.keyboard.createCursorKeys();
        }

        create(): void {
            var ledge, ground;

            //  A simple background for our game
            this.game.add.sprite(0, 0, 'sky');

            //  The platforms group contains the ground and the 2 ledges we can jump on
            this._platforms = this.game.add.group();

            //  We will enable physics for any object that is created in this group
            this._platforms.enableBody = true;

            // Here we create the ground.
            ground = this._platforms.create(0, this.game.world.height - 64, 'ground');

            //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
            ground.scale.setTo(2, 2);

            //  This stops it from falling away when you jump on it
            ground.body.immovable = true;

            //  Now let's create two ledges
            ledge = this._platforms.create(400, 400, 'ground');
            ledge.body.immovable = true;

            // re-use the ledge var
            ledge = this._platforms.create(-150, 250, 'ground');
            ledge.body.immovable = true;
            
            //////////////////////////
            
            this._stars = this.game.add.group();
            this._stars.enableBody = true;
        
            //  Here we'll create 12 of them evenly spaced apart
            for (var i = 0; i < 12; i++)
            {
                //  Create a star inside of the 'stars' group
                var star = this._stars.create(i * 70, 0, 'star');
        
                //  Let gravity do its thing
                star.body.gravity.y = 300;
        
                //  This just gives each star a slightly random bounce value
                star.body.bounce.y = 0.7 + Math.random() * 0.2;
            }
            
            /////////////////////////
            
            // The player and its settings
            this._player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');
            
            //  We need to enable physics on the player
            this.game.physics.arcade.enable(this._player);
            
            //  Player physics properties. Give the little guy a slight bounce.
            this._player.body.bounce.y = 0.2;
            this._player.body.gravity.y = 300;
            this._player.body.collideWorldBounds = true;
            
            //  Our two animations, walking left and right.
            this._player.animations.add('left', [0, 1, 2, 3], 10, true);
            this._player.animations.add('right', [5, 6, 7, 8], 10, true);
            
            this._scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        }
        
        update(): void {
            this.game.physics.arcade.collide(this._player, this._platforms);
            this.game.physics.arcade.collide(this._stars, this._platforms);
            
            //  Reset the players velocity (movement)
            this._player.body.velocity.x = 0;
        
            if (this._cursors.left.isDown) {
                //  Move to the left
                this._player.body.velocity.x = -150;
        
                this._player.animations.play('left');
            } else if (this._cursors.right.isDown) {
                //  Move to the right
                this._player.body.velocity.x = 150;
        
                this._player.animations.play('right');
            } else {
                //  Stand still
                this._player.animations.stop();
        
                this._player.frame = 4;
            }
        
            //  Allow the player to jump if they are touching the ground.
            if (this._cursors.up.isDown && this._player.body.touching.down) {
                this._player.body.velocity.y = -350;
            }
            
            this.game.physics.arcade.overlap(this._player, this._stars, this.collectStar, null, this);
        }
        
        collectStar(player: Phaser.Sprite, star: Phaser.Sprite): void {
            star.kill();
            
            this._score += 10;
            this._scoreText.text = 'Score: ' + this._score;
        }
    }
}