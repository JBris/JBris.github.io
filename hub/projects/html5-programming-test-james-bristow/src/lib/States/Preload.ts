import { Breakout } from '../../Breakout';
import { Ball } from '../Objects/Ball/Ball';
import { BallParameters } from '../Objects/Ball/BallParameters';

export class Preload extends Phaser.State {

    /*=============================
    **Fields**
    =============================*/
    private _game: Breakout;
    private _loadingSprite: Ball;

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

    preload(): void  {

        this._loadingSprite = this._game.AddElement.ballFactory.createProduct("normal", new BallParameters(this.game, this.game.world.centerX,
            this.game.world.centerY, 'ball', 0));

        this._game.BreakoutWorld.scalingManager.scaleGameElements(this.game,[this._loadingSprite],0.2,0.2);

        if (this._loadingSprite.animations.getAnimation('sleep') !== undefined && this._loadingSprite.animations.getAnimation('sleep') !== null)
            this._loadingSprite.animations.play('sleep', 24, true);

        //sprites
        this.loadSprites();

        //logos
        this.loadLogos();

        //buttons
        this.loadButtons();

        //backgrounds
        this.loadBackgrounds();

        //sound effects
        this.loadSoundEffects();

        //music
        this.loadMusic();
    }

    create(): void {
        this.camera.fade(0x000000, 3000);
        this.camera.onFadeComplete.addOnce(this.launchMainMenu ,this);
    }

    launchMainMenu()  :void 
    {
      this.game.state.start("MainMenu", true, false, this._game);
    }

    loadSprites(): void 
    {
        this._game.BreakoutWorld.assetLoader.loadSpriteSheet('paddle', 'png', 64, 64);

        //projectiles
        this._game.BreakoutWorld.assetLoader.loadSpriteSheet('bullet-player', 'png', 64, 64);
        this._game.BreakoutWorld.assetLoader.loadSpriteSheet('bullet-enemy', 'png', 64, 64);
        this._game.BreakoutWorld.assetLoader.loadSpriteSheet('poison', 'png', 64, 64);
        this._game.BreakoutWorld.assetLoader.loadSpriteSheet('fire-eye', 'png', 64, 64);
        this._game.BreakoutWorld.assetLoader.loadSpriteSheet('fire', 'png', 64, 64);
        this._game.BreakoutWorld.assetLoader.loadSpriteSheet('bloody-bullet', 'png', 64, 64);
        this._game.BreakoutWorld.assetLoader.loadSpriteSheet('bloody-spread', 'png', 64, 64);

        //goodies
        this._game.BreakoutWorld.assetLoader.loadSpriteSheet('ammo-box', 'png', 64, 64);
        this._game.BreakoutWorld.assetLoader.loadSpriteSheet('lemon', 'png', 64, 64);

        //bricks
        this._game.BreakoutWorld.assetLoader.loadSpriteSheet('blue-brick', 'png',64,64);
        this._game.BreakoutWorld.assetLoader.loadSpriteSheet('gold-brick', 'png', 64, 64);
        this._game.BreakoutWorld.assetLoader.loadSpriteSheet('green-brick', 'png', 64, 64);
        this._game.BreakoutWorld.assetLoader.loadSpriteSheet('teal-brick', 'png', 64, 64);

        //bosses
        this._game.BreakoutWorld.assetLoader.loadBossSpriteSheet('skullface', 'png', 64, 64);
        this._game.BreakoutWorld.assetLoader.loadBossSpriteSheet('eye', 'png', 64, 64);
        this._game.BreakoutWorld.assetLoader.loadBossSpriteSheet('shadow', 'png', 64, 64);
        this._game.BreakoutWorld.assetLoader.loadBossSpriteSheet('fetus-ball', 'png', 64, 64);
        this._game.BreakoutWorld.assetLoader.loadBossSpriteSheet('bloody-paddle', 'png', 64, 64);
    }

    loadLogos(): void 
    {
        this._game.BreakoutWorld.assetLoader.loadLogos('title', 'png', 250, 117);
    } 

    loadButtons(): void 
    {
        this._game.BreakoutWorld.assetLoader.loadButtons('play-button', 'png', 200, 200);
        this._game.BreakoutWorld.assetLoader.loadButtons('back-button', 'png', 200, 200);
        this._game.BreakoutWorld.assetLoader.loadButtons('off-button', 'png', 220, 259);
        this._game.BreakoutWorld.assetLoader.loadButtons('options-button', 'png', 200, 200);
        this._game.BreakoutWorld.assetLoader.loadButtons('pause-button', 'png', 152, 250);

    }

    loadBackgrounds(): void 
    {
        this._game.BreakoutWorld.assetLoader.loadImage('1st-sky', 'jpg');
        this._game.BreakoutWorld.assetLoader.loadImage('2nd-sky', 'jpg');
        this._game.BreakoutWorld.assetLoader.loadImage('3rd-sky', 'jpg');
        this._game.BreakoutWorld.assetLoader.loadImage('4th-sky', 'jpg');
    }

    loadSoundEffects(): void 
    {
        this._game.BreakoutWorld.assetLoader.loadSound('ball-to-boss', 'mp3', 'ogg');
        this._game.BreakoutWorld.assetLoader.loadSound('ball-to-brick', 'mp3', 'ogg');
        this._game.BreakoutWorld.assetLoader.loadSound('ball-to-paddle', 'mp3', 'ogg');
        this._game.BreakoutWorld.assetLoader.loadSound('bullet-to-paddle', 'mp3', 'ogg');
        this._game.BreakoutWorld.assetLoader.loadSound('evil-laugh-short', 'mp3', 'ogg');

        this._game.BreakoutWorld.assetLoader.loadSound('ding', 'mp3', 'ogg');
        this._game.BreakoutWorld.assetLoader.loadSound('bullet-fire', 'mp3', 'ogg');
        this._game.BreakoutWorld.assetLoader.loadSound('gun-cock', 'mp3', 'ogg');

        //bosses
        this._game.BreakoutWorld.assetLoader.loadSound('noble-woman-laugh', 'mp3', 'ogg');
        this._game.BreakoutWorld.assetLoader.loadSound('yuck', 'mp3', 'ogg');
        this._game.BreakoutWorld.assetLoader.loadSound('demon-sound', 'mp3', 'ogg');
        this._game.BreakoutWorld.assetLoader.loadSound('evil-laugh', 'mp3', 'ogg');

    }
    
    loadMusic(): void 
    {
        this._game.BreakoutWorld.assetLoader.loadMusic('opening_glorious_morning', 'mp3', 'ogg');
        this._game.BreakoutWorld.assetLoader.loadMusic('stage_1_electrical_adventures', 'mp3', 'ogg');
        this._game.BreakoutWorld.assetLoader.loadMusic('stage_2_Endgame', 'mp3', 'ogg');
        this._game.BreakoutWorld.assetLoader.loadMusic('stage_3_parago', 'mp3', 'ogg');
        this._game.BreakoutWorld.assetLoader.loadMusic('final_chaoz', 'mp3', 'ogg');

    }
}
