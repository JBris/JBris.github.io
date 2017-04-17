import { Breakout } from '../../Breakout';

import { Ball } from '../Objects/Ball/Ball';
import { BallParameters } from '../Objects/Ball/BallParameters';

import { MediumMovement } from '../Objects/MovableBehaviour/MediumMovement';
import { FastMovement } from '../Objects/MovableBehaviour/FastMovement';
import { SlowMovement } from '../Objects/MovableBehaviour/SlowMovement';

import { BreakoutButton } from '../Objects/Button/BreakoutButton';
import { ButtonParameters } from '../Objects/Button/ButtonParameters';


export class FinalBoss extends Phaser.State {

    /*=============================
    **Fields**
    =============================*/
    //Game
    private _game: Breakout;
    private _background: Phaser.Image;
    private _music: Phaser.Sound;
    private _currentlyPlaying: boolean;
    private _ballTouchedPaddle : boolean;
    private _bossNotDisplayed: boolean;

    //Numbers
    private _paddlePositionX: number;
    private _paddlePositionY: number;
    private _ballPositionX: number;
    private _ballPositionY: number;
    private _multiplierTextWidth: number;
    private _multiplierTextHeight: number;
    private _levelNumber: number;
    private _leftPaddleTimer = 0;
    private _rightPaddleTimer = 0;
    private _bossTimer = 0;
    private _bossLife = 20;

    //Buttons
    private _playButton: BreakoutButton;
    private _pauseButton: BreakoutButton;
    private _restartButton: BreakoutButton;

    //Objects
    private _ball: Ball;
    private _paddle: Phaser.Sprite;
    private _leftBloodyPaddle: Phaser.Sprite;
    private _rightBloodyPaddle: Phaser.Sprite;
    private _boss: Phaser.Sprite;
    private _livesIcon: Ball;
    private _bloodyBulletProjectiles: Phaser.Group;
    private _bloodyBulletProjectile: Phaser.Sprite;
    private _bloodySpreadProjectiles: Phaser.Group;
    private _bloodySpreadProjectile: Phaser.Sprite;
    private _drops: Phaser.Group;
    private _playerBullets: Phaser.Group;

    //Text
    private _levelNumberText: Phaser.Text;
    private _scoreText: Phaser.Text;
    private _livesText: Phaser.Text;
    private _multiplierText: Phaser.Text;
    private _commentText: Phaser.Text;

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
        this._bossNotDisplayed = true;

        this.game.stage.backgroundColor = 0xf0000;

        this.game.camera.resetFX();
        this.camera.onFadeComplete.forget();
        this.scale.onOrientationChange.add(this._game.BreakoutWorld.scalingManager.scaleGameScreen, this);

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
        this._music = this.add.audio('final_chaoz',1,true);
        this._music.play();
        this._game.BreakoutWorld.styleManager.damageFlash(1000);
        this.game.time.events.add(1000, this._game.BreakoutWorld.styleManager.fadeText, this, this._levelNumberText);
        this.game.time.events.add(1000, this.displayPlayButton, this);

    }

    update(): void {
        
        this.game.physics.arcade.collide(this._ball, this._paddle, this.ballCollidePaddle,null, this);
        this.game.physics.arcade.collide(this._ball, this._boss, this.ballCollideBoss, null, this);
        this.game.physics.arcade.collide(this._ball, this._leftBloodyPaddle, this.ballCollideLeftPaddle, null, this);
        this.game.physics.arcade.collide(this._ball, this._rightBloodyPaddle, this.ballCollideRightPaddle, null, this);
    
       // this.game.physics.arcade.collide(this._paddle, this._projectiles, this.projectileCollidesPaddle, null, this);
        this.game.physics.arcade.collide(this._paddle, this._drops, this.paddleGetsDrop, null, this);


        if (this._currentlyPlaying) {
            this._paddle.x = this.game.input.x || this.game.world.width * 0.5;

            if (this._boss.alive && this.game.time.now > this._leftPaddleTimer) {
                this.leftPaddleFires();
            }

            if (this._boss.alive && this.game.time.now > this._rightPaddleTimer) {
                this.rightPaddleFires();
            }

            if (this._boss.alive && this.game.time.now > this._bossTimer) {

                this.bossFires();
            }

        }

    }


    //===============================================================================================================//
    //start game
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
        if (this._bossNotDisplayed === true) this.introduceBoss();
        this._playButton.destroy();
    }

    beginPlaying() : void
    { this._currentlyPlaying = true; }

    //===============================================================================================================//
    //lose game
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
    //game loop
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
        this._music.destroy();
        this._game.PlayerList.MyPlayerList[0].level += 1;
        this.game.state.start("Game", true, false, this._game);
    }


    //===============================================================================================================//
    //Enemy behaviour
    //===============================================================================================================//

    introduceBoss(): void {
        this._bossNotDisplayed = false;
        this.game.add.tween(this._boss).to({ y: 0 + 0.2 * this.game.world.height }, 4000, Phaser.Easing.Linear.None, true);
        this.game.add.tween(this._leftBloodyPaddle).to({ y: 0 + 0.2 * this.game.world.height }, 2500, Phaser.Easing.Linear.None, true);
        this.game.add.tween(this._rightBloodyPaddle).to({ y: 0 + 0.2 * this.game.world.height }, 2500, Phaser.Easing.Linear.None, true);
        this.game.sound.play('evil-laugh');
        let bossDialogue: Array<Phaser.Text> = new Array<Phaser.Text>();
        let lineDuration: number = 4000;

        bossDialogue.push(this._game.BreakoutWorld.styleManager.positionTextCenter("Again?"));
        bossDialogue.push(this._game.BreakoutWorld.styleManager.positionTextCenter("I remember."));
        bossDialogue.push(this._game.BreakoutWorld.styleManager.positionTextCenter("Forever."));
        bossDialogue[0].x = 0 + this.game.world.width * 0.15;
        bossDialogue[2].x = this.game.world.width - this.game.world.width * 0.2;

        for (let line of bossDialogue) {
            line.addColor("#F20000", 0);
            line.fontSize = "300%";
            this._game.BreakoutWorld.styleManager.fadeText(line, lineDuration);
            lineDuration += 1000;
        }

        this._boss.animations.add("float", [0, 0, 1, 1], 1, true).play();
        this._leftBloodyPaddle.animations.add("float", [0, 1, 2], 1, true).play();
        this._rightBloodyPaddle.animations.add("float", [3, 4, 5], 1, true).play();

    }

    leftPaddleFires() : void
    {
        this._bloodyBulletProjectile = this._bloodyBulletProjectiles.getFirstExists(false);
        // And fire the bullet from this enemy
        this._bloodyBulletProjectile.reset(this._leftBloodyPaddle.body.x, this._leftBloodyPaddle.body.y);
        this._bloodyBulletProjectile.visible = true;
        this.game.physics.arcade.moveToObject(this._bloodyBulletProjectile, this._paddle, 200);
        this._leftPaddleTimer = this.game.time.now + 5000;
    }

    rightPaddleFires(): void
    {
        this._bloodyBulletProjectile = this._bloodyBulletProjectiles.getFirstExists(false);
        // And fire the bullet from this enemy
        this._bloodyBulletProjectile.reset(this._rightBloodyPaddle.body.x, this._rightBloodyPaddle.body.y);
        this._bloodyBulletProjectile.visible = true;
        this.game.physics.arcade.moveToObject(this._bloodyBulletProjectile, this._paddle, 200);
        this._rightPaddleTimer = this.game.time.now + 5000;
    }

    bossFires(): void
    {
        this._bossTimer = this.game.time.now + 6000;
        this.game.time.events.repeat(Phaser.Timer.SECOND * 0.5, 3, this.bossLaunchAttack, this);
    }

    bossLaunchAttack()
    {
        this._bloodySpreadProjectile = this._bloodySpreadProjectiles.getFirstExists(false);
        // And fire the bullet from this enemy
        this._bloodySpreadProjectile.reset(this._boss.body.x, this._boss.body.y);
        this._bloodySpreadProjectile.visible = true;
        this.game.physics.arcade.moveToObject(this._bloodySpreadProjectile, this._paddle, 200);
    }

   //===============================================================================================================//
   //collisions
   //===============================================================================================================//

    ballCollidePaddle(): void {
        if ("vibrate" in window.navigator) { window.navigator.vibrate([100]); }
        this._game.BreakoutWorld.scoreCalculator.ScoreMultiplier = 1;
        this._multiplierText.setText("X " + String(this._game.BreakoutWorld.scoreCalculator.ScoreMultiplier));
        this._ballTouchedPaddle = true;
        if (this._currentlyPlaying) this._ball.collide("paddle", 0, this._paddle.x);
    }

    ballCollideBoss(ball: Ball, boss: Phaser.Sprite): void {
        this._bossLife -= 1;
        if (this._bossLife <= 0) 
        {
            this._boss.animations.stop();
            let deathAnimation: Phaser.Animation = this._boss.animations.add('death', [4, 5, 6, 7, 8], 1, false).play();    
            deathAnimation.onComplete.addOnce(function () {
                this._boss.kill();
            }, this);

            this._leftBloodyPaddle.animations.stop("float");
            this._leftBloodyPaddle.animations.frame = 7;
            this._rightBloodyPaddle.animations.stop("float");
            this._rightBloodyPaddle.animations.frame = 7;
        } else
            this._boss.animations.add('hurt', [2, 3, 2, 3], 2, false).play(); 

      //  boss.physicsEnabled = false;
        if ("vibrate" in window.navigator) { window.navigator.vibrate([100]); }
         ball.collide("boss");
     //   boss.kill();
       // this.prepareRelaunchGame();        
    }

    ballCollideLeftPaddle(ball: Ball, leftPaddle: Phaser.Sprite): void {
        if ("vibrate" in window.navigator) { window.navigator.vibrate([100]); }
        ball.collide("boss");
        this._leftPaddleTimer = this.game.time.now + 8000;    
        this._leftBloodyPaddle.animations.add('hurt', [6, 7, 6, 7, 6, 7, 6, 7], 1,false); 
    }

    ballCollideRightPaddle(ball: Ball, rightPaddle: Phaser.Sprite): void {
        if ("vibrate" in window.navigator) { window.navigator.vibrate([100]); }
        ball.collide("boss");
        this._rightPaddleTimer = this.game.time.now + 8000; 
        this._rightBloodyPaddle.animations.add('hurt', [6, 7, 6, 7, 6, 7, 6, 7], 1,false);
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

    loadBloodyBullet(): void
    {
        // The enemy's bullets
        this._bloodyBulletProjectiles = this.game.add.group();
        this._bloodyBulletProjectiles.enableBody = true;
        this._bloodyBulletProjectiles.physicsBodyType = Phaser.Physics.ARCADE;
        this._bloodyBulletProjectiles.createMultiple(50, 'bloody-bullet', 0);
        this._bloodyBulletProjectiles.visible = true;
        this._bloodyBulletProjectiles.setAll('anchor.x', 0.5);
        this._bloodyBulletProjectiles.setAll('anchor.y', 1);
        this._bloodyBulletProjectiles.setAll('outOfBoundsKill', true);
        this._bloodyBulletProjectiles.setAll('checkWorldBounds', true);
    }

    loadBloodySpread(): void {
        // The enemy's bullets
        this._bloodySpreadProjectiles = this.game.add.group();
        this._bloodySpreadProjectiles.enableBody = true;
        this._bloodySpreadProjectiles.physicsBodyType = Phaser.Physics.ARCADE;
        this._bloodySpreadProjectiles.createMultiple(50, 'bloody-spread', 0);
        this._bloodySpreadProjectiles.visible = true;
        this._bloodySpreadProjectiles.setAll('anchor.x', 0.5);
        this._bloodySpreadProjectiles.setAll('anchor.y', 1);
        this._bloodySpreadProjectiles.setAll('outOfBoundsKill', true);
        this._bloodySpreadProjectiles.setAll('checkWorldBounds', true);
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
            "????????", null);
        this._levelNumberText.fontSize = "500%";
        this._levelNumberText.addColor("#8B0000",0);

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
        this._boss = this.game.add.sprite(this.game.world.centerX, 0 - 0.5 * this.game.world.height,
            'fetus-ball', 0);
        this._boss.anchor.set(0.5, 0.5);
        this._game.BreakoutWorld.scalingManager.scaleGameElements(this.game, [this._boss], 0.15, 0.15);
        this.game.physics.enable(this._boss, Phaser.Physics.ARCADE);
        this._boss.body.immovable = true;
        this._boss.body.bounce.set(1);

        //boss allies
        this._leftBloodyPaddle = this.game.add.sprite(0 + 0.15 * this.game.world.width, 0 - 0.5 * this.game.world.height,
            'bloody-paddle', 0);
        this._leftBloodyPaddle.anchor.set(0.5, 0.5);
        this._game.BreakoutWorld.scalingManager.scaleGameElements(this.game, [this._leftBloodyPaddle], 0.1, 0.1);
        this.game.physics.enable(this._leftBloodyPaddle, Phaser.Physics.ARCADE);
        this._leftBloodyPaddle.body.immovable = true;
        this._leftBloodyPaddle.body.bounce.set(1);

        this._rightBloodyPaddle = this.game.add.sprite(this.game.world.width - 0.15 * this.game.world.width, 0 - 0.5 * this.game.world.height,
            'bloody-paddle', 0);
        this._rightBloodyPaddle.anchor.set(0.5, 0.5);
        this._game.BreakoutWorld.scalingManager.scaleGameElements(this.game, [this._rightBloodyPaddle], 0.1, 0.1);
        this.game.physics.enable(this._rightBloodyPaddle, Phaser.Physics.ARCADE);
        this._rightBloodyPaddle.body.immovable = true;
        this._rightBloodyPaddle.body.bounce.set(1);

        //projectiles
        this.loadPlayerBullets();
        this.loadBloodyBullet();
        this.loadBloodySpread();

        //drops
        this.loadDrops();
    }

}
