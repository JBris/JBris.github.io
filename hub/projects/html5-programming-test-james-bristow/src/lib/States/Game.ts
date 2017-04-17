import { Breakout } from '../../Breakout';

import { Ball } from '../Objects/Ball/Ball';
import { BallParameters } from '../Objects/Ball/BallParameters';

import { MediumMovement } from '../Objects/MovableBehaviour/MediumMovement';
import { FastMovement } from '../Objects/MovableBehaviour/FastMovement';
import { SlowMovement } from '../Objects/MovableBehaviour/SlowMovement';

import { BreakoutButton } from '../Objects/Button/BreakoutButton';
import { ButtonParameters } from '../Objects/Button/ButtonParameters';


export class Game extends Phaser.State {

    /*=============================
    **Fields**
    =============================*/
    //Game
    private _game: Breakout;
    private _background: Phaser.Image;
    private _music: Phaser.Sound;
    private _currentlyPlaying: boolean;
    private _ballTouchedPaddle : boolean;

    //Numbers
    private _paddlePositionX: number;
    private _paddlePositionY: number;
    private _ballPositionX: number;
    private _ballPositionY: number;
    private _multiplierTextWidth: number;
    private _multiplierTextHeight: number;
    private _levelNumber: number;
    private _firingTimer = 0;

    //Buttons
    private _playButton: BreakoutButton;
    private _pauseButton: BreakoutButton;
    private _restartButton: BreakoutButton;

    //Objects
    private _ball: Ball;
    private _paddle: Phaser.Sprite;
    private _brickInfo: Object;
    private _brick: Phaser.Sprite;
    private _boss: Phaser.Sprite;
    private _livesIcon: Ball;
    private _bricks: Phaser.Group;
    private _brickMovement: Phaser.Tween;
    private _projectiles: Phaser.Group;
    private _projectile: Phaser.Sprite;
    private _drops: Phaser.Group;
    private _playerBullets: Phaser.Group;

    //Text
    private _levelNumberText: Phaser.Text;
    private _scoreText: Phaser.Text;
    private _livesText: Phaser.Text;
    private _multiplierText: Phaser.Text;
    private _commentText: Phaser.Text;
    private _bossText: Phaser.Text;

    /*=============================
    **Constructors
    =============================*/

    constructor(game: Breakout) {
        super();
        this._game = game;
    }

    /*=============================
    **Properties**
    =============================*/

    /*=============================
    **Methods**
    =============================*/

    //===============================================================================================================//
    // Preload, create, and update
    //===============================================================================================================//

    preload(): void {

        this._currentlyPlaying = false;
        this._ballTouchedPaddle = true;
        this._levelNumber = this._game.BreakoutWorld.stageManager.CurrentStage;

        this._background = this.game.add.image(0, 0, this._game.BreakoutWorld.stageManager.BackgroundList[this._levelNumber]);
        this._game.BreakoutWorld.scalingManager.scaleBreakoutBackground(this._background);

        this.game.camera.resetFX();
        this.camera.onFadeComplete.forget();
        this.scale.onOrientationChange.add(this._game.BreakoutWorld.scalingManager.scaleGameScreen, this);
        this.scale.onOrientationChange.add(this._game.BreakoutWorld.scalingManager.scaleBreakoutBackground, this);

        this._paddlePositionX = this.game.world.centerX;
        this._paddlePositionY = this.game.world.height - this.game.world.height * 0.1;
        this._ballPositionX = this.game.world.centerX;
        //can't set ball position y just yet

        this.loadButtons();
        this.loadText();
        this.loadSprites();
    }

    create(): void {

        //music
        this._music = this.add.audio(this._game.BreakoutWorld.stageManager.MusicList[this._levelNumber], 1, true, true);
        this._music.play();

        this.game.time.events.add(1000, this._game.BreakoutWorld.styleManager.fadeText, this, this._levelNumberText);
        this.game.time.events.add(1000, this.displayPlayButton, this);

    }

    update(): void {
        
        this.game.physics.arcade.collide(this._ball, this._paddle, this.ballCollidePaddle,null, this);
        this.game.physics.arcade.collide(this._ball, this._bricks, this.ballCollideBrick, null, this);
        this.game.physics.arcade.collide(this._ball, this._boss, this.ballCollideBoss, null, this);
        this.game.physics.arcade.collide(this._paddle, this._projectiles, this.projectileCollidesPaddle, null, this);
        this.game.physics.arcade.collide(this._paddle, this._drops, this.paddleGetsDrop, null, this);


        if (this._currentlyPlaying) {
            this._paddle.x = this.game.input.x || this.game.world.width * 0.5;

            if (this.game.time.now > this._firingTimer) {
                this.enemyFires();
            }

        }

    }


    //===============================================================================================================//
    //Start game
    //===============================================================================================================//

    displayPlayButton(): void {
        //start
        this._playButton = this._game.AddElement.buttonFactory.createProduct("play", new ButtonParameters(this.game,
            this.game.world.centerX, this.game.world.centerY, 'play-button', this.startGame, this, 1, 0, 1, 0));
        this._game.BreakoutWorld.scalingManager.scaleGameElements(this.game, [this._playButton], 0, 0);
        this._game.BreakoutWorld.scalingManager.scaleGameElementsOverTime(this.game, [this._playButton], 0.15, 0.15, 500, false);
        this._playButton.anchor.set(0.5, 0.5);
    }

    startGame(): void {
        this._game.BreakoutWorld.scalingManager.scaleGameElementsOverTime(this.game, [this._playButton], 0, 0, 500, true);
        this._ball.MovementType.move();
        this.game.physics.arcade.checkCollision.down = false;
        this._ball.events.onOutOfBounds.add(this.ballLeaveScreen, this);
        this.beginPlaying();
        this._playButton.destroy();
    }

    beginPlaying() : void
    { this._currentlyPlaying = true; }

    //===============================================================================================================//
    //Lose game
    //===============================================================================================================//

    ballLeaveScreen(): void {
        this._currentlyPlaying = false;

        //lives
        this._game.PlayerList.MyPlayerList[0].lives -= 1;
        this._livesText.setText(String(this._game.PlayerList.MyPlayerList[0].lives) + " X", null);

        //visuals
        this._game.BreakoutWorld.styleManager.damageFlash(2000);
        this._livesIcon.animations.play('hurt');

        //movement
        this._ball.MovementType.move(0, 0);
        this._ball.reset(this._ballPositionX, this._ballPositionY);
        this._paddle.reset(this._paddlePositionX, this._paddlePositionY);

        if (this._game.PlayerList.MyPlayerList[0].lives > 0) {
            this.displayPlayButton();
        } else {
            this.setUpGameOver();
        }
    }

    setUpGameOver(): void {
        this._music.destroy();
        this.camera.resetFX();
        this.camera.fade(0x000000, 2000);

        let laugh: Phaser.Sound = this.sound.add('evil-laugh-short', 1, false);
        laugh.onStop.addOnce(this.launchMainMenu, this);
        laugh.play();
    }

    launchMainMenu(): void {
        this.game.state.start("MainMenu", true, false, this._game);
    }

    //===============================================================================================================//
    //Game loop
    //===============================================================================================================//

    prepareRelaunchGame(): void {
        this.game.physics.arcade.checkCollision.down = true;
        this._ball.body.velocity.set(0, 0);
        this._ball.body.moves = false;
        this._ball.body.disable;
        this._music.fadeOut(4000);
        this.camera.fade(0x000000, 1000);
        this.camera.onFadeComplete.addOnce(this.relaunchGame, this);
    }

    relaunchGame(): void {
        this._background.destroy();
        this._music.destroy();

        this._game.PlayerList.MyPlayerList[0].level += 1;
        this._game.BreakoutWorld.stageManager.CurrentStage += 1;

        if (this._game.BreakoutWorld.stageManager.CurrentStage > this._game.BreakoutConfig.NumberOfStages) {
            this._game.BreakoutWorld.stageManager.CurrentStage = 1;
            this.game.state.start("FinalBoss", true, false, this._game);
        }
        else this.game.state.start("Game", true, false, this._game); 
    }

   //===============================================================================================================//
   //Enemy behaviour
   //===============================================================================================================//

   //===============================================================================================================//
   //Collisions
   //===============================================================================================================//

    ballCollidePaddle(): void {
        if ("vibrate" in window.navigator) { window.navigator.vibrate([100]); }
        this._game.BreakoutWorld.scoreCalculator.ScoreMultiplier = 1;
        this._multiplierText.setText("X " + String(this._game.BreakoutWorld.scoreCalculator.ScoreMultiplier));
        this._ballTouchedPaddle = true;
        if (this._currentlyPlaying) this._ball.collide("paddle", 0, this._paddle.x);
    }


    ballCollideBrick(ball: Ball, brick: Phaser.Sprite): void // TODO: Add collidable
    {
        brick.physicsEnabled = false;
        if ("vibrate" in window.navigator) window.navigator.vibrate([100]); 
        ball.collide("brick");

        this.updateScore(10);
        this._ballTouchedPaddle = false;

        let rndNum: number = this.game.rnd.integerInRange(0, 3);
        if (rndNum === 1) {
            let drop: Phaser.Sprite = this._drops.getFirstExists(false);
            drop.body.setSize(drop.body.width * 0.35, drop.body.height * 0.35);
            this._game.BreakoutWorld.scalingManager.scaleGameElements(this.game, [drop], 0.07, 0.07);
            drop.reset(brick.body.x, brick.body.y);
            drop.visible = true;
            this.game.physics.enable(drop, Phaser.Physics.ARCADE);
            drop.body.gravity.y = 100;

        }
        brick.kill();

        if (this._bricks.countLiving() <= 0) {
            this.introduceBoss();
        }
    }

    ballCollideBoss(ball: Ball, boss: Phaser.Sprite): void {
        boss.physicsEnabled = false;
        if ("vibrate" in window.navigator) { window.navigator.vibrate([100]); }
        ball.collide("boss");
        boss.kill();
        this.prepareRelaunchGame();        
    }

    projectileCollidesPaddle(paddle : Phaser.Sprite, bullet: Phaser.Sprite) : void
    {
        bullet.kill();
        this._currentlyPlaying = false;
        this.game.time.events.add(Phaser.Timer.SECOND * 0.8, this.beginPlaying, this);
    }

    paddleGetsDrop(paddle: Phaser.Sprite, drop: Phaser.Sprite): void
    {
        drop.kill();
        this.game.time.events.repeat(Phaser.Timer.SECOND * 0.35, 3,this.playerFireBullet, this);
    }




   //===============================================================================================================//
   //Group behaviour
   //===============================================================================================================//

    loadBricks() : void
    {

        this._bricks = this.game.add.group();
        this._bricks.enableBody = true;
        this._bricks.physicsBodyType = Phaser.Physics.ARCADE;

        let yPosition: number = 0 + this.game.world.height * 0.1;

        for (let rows: number = 0; rows < 4; rows++) {
            let xPosition: number = 0 + this.game.world.width * 0.05;
            for (let columns: number = 0; columns < 8; columns++) {
                this._brick = this._bricks.create(xPosition, yPosition, 'blue-brick');
                this._brick.body.bounce.set(1);
                this._brick.body.immovable = true;
                this._brick.body.setSize(this._brick.body.width * 0.4, this._brick.body.height * 0.4);
                this._game.BreakoutWorld.scalingManager.scaleGameElements(this.game, [this._brick],0.08,0.08);
                let float = this._brick.animations.add('float', [0, 1, 0, 1, 0, 1, 0, 1], 2,true);
                float.play();
                xPosition = this._brick.x + this.game.world.width * 0.1;
            }
            yPosition = this._brick.y + this.game.world.height * 0.1;
        }

        this._brickMovement = this.game.add.tween(this._bricks).to({ x: this.game.width * 0.15 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000,true).start();
    }

    loadProjectiles(): void
    {
        // The enemy's bullets
        this._projectiles = this.game.add.group();
        this._projectiles.enableBody = true;
        this._projectiles.physicsBodyType = Phaser.Physics.ARCADE;
        this._projectiles.createMultiple(30, 'bullet-enemy', 0);
        this._projectiles.visible = true;
        this._projectiles.setAll('anchor.x', 0.5);
        this._projectiles.setAll('anchor.y', 1);
        this._projectiles.setAll('outOfBoundsKill', true);
        this._projectiles.setAll('checkWorldBounds', true);
    }

    loadDrops() : void {
        // Player drops
        this._drops = this.game.add.group();
        this._drops.enableBody = true;
        this._drops.physicsBodyType = Phaser.Physics.ARCADE;
        this._drops.createMultiple(30, 'ammo-box', 0);
        this._drops.visible = true;
        this._drops.setAll('anchor.x', 0.5);
        this._drops.setAll('anchor.y', 1);
        this._drops.setAll('outOfBoundsKill', true);
        this._drops.setAll('checkWorldBounds', true);
    }

    loadPlayerBullets(): void
    {
        this._playerBullets = this.game.add.group();
        this._playerBullets.enableBody = true;
        this._playerBullets.physicsBodyType = Phaser.Physics.ARCADE;
        this._playerBullets.createMultiple(30, 'bullet-player', 0);
        this._playerBullets.visible = true;
        this._playerBullets.setAll('anchor.x', 0.5);
        this._playerBullets.setAll('anchor.y', 1);
        this._playerBullets.setAll('outOfBoundsKill', true);
        this._playerBullets.setAll('checkWorldBounds', true);
    }

    playerFireBullet()
    {
        let newBullet: Phaser.Sprite = this._playerBullets.getFirstExists(false);
        if (newBullet)
        {
            newBullet.reset(this._paddle.x, this._paddle.y + this._paddle.height * 0.2);
            newBullet.body.velocity.y = -400;
        }   
    }


    enemyFires(): void
    {
        this._projectile = this._projectiles.getFirstExists(false);
     
        this._projectile.body.setSize(this._projectile.body.width * 0.35, this._projectile.body.height * 0.35);
        this._game.BreakoutWorld.scalingManager.scaleGameElements(this.game, [this._projectile], 0.08, 0.08);

        let livingEnemies: Array<Phaser.Sprite> = new Array<Phaser.Sprite>();

        this._bricks.forEachAlive(function (projectile) {
            livingEnemies.push(projectile);
        }, this, this._projectile);

        if (livingEnemies.length > 0) {
            let random : number = this.game.rnd.integerInRange(0, livingEnemies.length - 1);

            // randomly select one of them
            let shooter :Phaser.Sprite = livingEnemies[random];
            // And fire the bullet from this enemy
            this._projectile.reset(shooter.body.x, shooter.body.y);
            this._projectile.visible = true;
            this.game.physics.arcade.moveToObject(this._projectile , this._paddle, 200);
            this._firingTimer = this.game.time.now + 5000;
        }

    }

    introduceBoss(): void
    {
        //boss.Speak();
        //this.game.sound.play(this._game.BreakoutWorld.stageManager.BossSoundList[this._levelNumber - 1], 1, false);
        let moveDown : Phaser.Tween = this.game.add.tween(this._boss).to({ y: 0 + 0.25 * this.game.world.height }, 3000, Phaser.Easing.Linear.None);
        let moveBackAndForth: Phaser.Tween = this.game.add.tween(this._boss).to({ x: this.game.width * 0.9 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        moveDown.chain(moveBackAndForth);
        moveDown.start();

        this._bossText = this._game.BreakoutWorld.styleManager.positionTextCenter("Ho Ho Ho! Another Challenger?");
        this._bossText.addColor("#19cb65", 0);
        this._bossText.fontSize = "300%";
        this._game.BreakoutWorld.styleManager.fadeText(this._bossText, 3000);
        this._boss.animations.add("float", [0,0,0,, 1, 1, ,1], 1, true).play();


    }


    //===============================================================================================================//
    //update UI
    //===============================================================================================================//

    updateScore(baseScore : number)
    {
        //score
        let addedScore: number = this._game.BreakoutWorld.scoreCalculator.calculatePoints(this._ballTouchedPaddle, baseScore);
        this._game.PlayerList.MyPlayerList[0].score += addedScore;

        //new lives
        let lifeCheck: boolean = this._game.PlayerList.MyPlayerList[0].checkLife(addedScore);
        if (lifeCheck)
        {
            this._livesText.setText(String(this._game.PlayerList.MyPlayerList[0].lives) + "X");
            this._game.BreakoutWorld.scalingManager.expandAndShrinkElement(this._livesText, this._livesText.width * 1.8,
                this._livesText.height * 1.8, this._livesText.width, this._livesText.height);
        } 


        this._scoreText.setText(String(this._game.PlayerList.MyPlayerList[0].score));

        //Multiplier
        this._game.BreakoutWorld.scoreCalculator.ScoreMultiplier++;

        this._multiplierText.setText("X " + String(this._game.BreakoutWorld.scoreCalculator.ScoreMultiplier));

        this._game.BreakoutWorld.scalingManager.expandAndShrinkElement(this._multiplierText, this._multiplierTextWidth * 1.8,
            this._multiplierTextHeight * 1.8, this._multiplierTextWidth, this._multiplierTextHeight);

        //Multiplier comments - Keep it in if you want smaller multipliers...
        this.multiplierComments();
    }

    multiplierComments()
    {
        let multiplierComment: string = this._game.BreakoutWorld.scoreCalculator.makeMultiplierComment();
        if (multiplierComment !== "") {
            this._commentText = this._game.BreakoutWorld.styleManager.positionTextCenter(multiplierComment);
            this._commentText.addColor("#F20000", 0);
            this._commentText.fontSize = "400%";
            this._commentText.anchor.set(0.5, 0.5);
            this._game.BreakoutWorld.styleManager.fadeText(this._commentText, 1000);
        }
    }


    //===============================================================================================================//
    //Loading resources...
    //===============================================================================================================//

    loadText(): void
    {
        //text
        this._scoreText = this._game.BreakoutWorld.styleManager.positionTextTopLeft(String(this._game.PlayerList.MyPlayerList[0].score), null);
        this._livesText = this._game.BreakoutWorld.styleManager.positionTextBottomLeft(String(this._game.PlayerList.MyPlayerList[0].lives) + " X", null);
        this._multiplierText = this._game.BreakoutWorld.styleManager.positionTextBottomRight(
            "X " + String(this._game.BreakoutWorld.scoreCalculator.ScoreMultiplier), null);
        this._multiplierTextWidth = this._multiplierText.width;
        this._multiplierTextHeight = this._multiplierText.height;
        this._levelNumberText = this._game.BreakoutWorld.styleManager.positionTextCenter(
            "Stage: " + String(this._game.PlayerList.MyPlayerList[0].level), null);
        this._levelNumberText.fontSize = "500%";

    }

    loadButtons(): void
    {
        //buttons
        //pause
        this._pauseButton = this._game.AddElement.buttonFactory.createProduct("pause", new ButtonParameters(this.game,
            this.game.world.width - 0.1 * this.game.world.width, 0 + 0.1 * this.game.world.height, 'pause-button', null, null, 1, 0, 1, 0));

        this._pauseButton.anchor.set(1, 0);
        this._game.BreakoutWorld.scalingManager.scaleGameElements(this.game, [this._pauseButton], 0.05, 0.05);
        this._pauseButton.inputEnabled = true;
        this._pauseButton.events.onInputUp.add(function () { this.game.paused = true; }, this);
        this.game.input.onDown.add(function () { if (this.game.paused) this.game.paused = false }, this);
    }

    loadSprites(): void
    {


        //sprites
        this._livesIcon = this._game.AddElement.ballFactory.createProduct("normal", new BallParameters(this.game, this._livesText.x + this._livesText.width * 1.5,
            this._livesText.y, 'ball', 0, null, 0));

        this._game.BreakoutWorld.scalingManager.scaleGameElements(this.game, [this._livesIcon], 0.1,0.1);

        //lives icon
        this._livesIcon.anchor.set(0, 0.7);
        this._livesIcon.enableAnimations();
        this._livesIcon.animations.add('hurt', [3, 4, 3, 4, 3, 4, 0], 2);
        this._livesIcon.alpha = 0.35;

        //paddle
        this._paddle = this.game.add.sprite(this._paddlePositionX, this._paddlePositionY, 'paddle', 0);
        this._game.BreakoutWorld.scalingManager.scaleGameElements(this.game, [this._paddle], 0.1, 0.1);
        this._paddle.anchor.set(0.5, 0.5);
        this.game.physics.enable(this._paddle, Phaser.Physics.ARCADE);
        this._paddle.body.immovable = true;
        this._paddle.body.setSize(this._paddle.body.width * 0.8, this._paddle.body.height/4);

        //ball
        this._ballPositionY = this._paddle.y - this._paddle.height * 0.1;
        this._ball = this._game.AddElement.ballFactory.createProduct("normal", new BallParameters(this.game, this._ballPositionX,
            this._ballPositionY, 'ball', 0, new MediumMovement(-100, -350), 1));
        this._game.BreakoutWorld.scalingManager.scaleGameElements(this.game, [this._ball], 0.08, 0.08);
        this._ball.anchor.set(0.5, 0.5);

        //boss
        this._boss = this.game.add.sprite(0 + this.game.world.width * 0.1, 0 - 0.5 * this.game.world.height,
            this._game.BreakoutWorld.stageManager.BossList[this._levelNumber -1], 0);
        this._boss.anchor.set(0.5, 0.5);
        this._game.BreakoutWorld.scalingManager.scaleGameElements(this.game, [this._boss], 0.15, 0.15);
        this.game.physics.enable(this._boss, Phaser.Physics.ARCADE);
        this._boss.body.immovable = true;
        this._boss.body.bounce.set(1);

        //projectiles
        this.loadProjectiles();
        this.loadPlayerBullets();

        //bricks
        this.loadBricks();

        //drops
        this.loadDrops();
    }

}
