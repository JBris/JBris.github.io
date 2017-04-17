import { Breakout } from '../../Breakout';
import { BreakoutPlayer } from '../Objects/Player/BreakoutPlayer'
import { BreakoutButton } from '../Objects/Button/BreakoutButton';
import { BreakoutLogo } from '../Objects/Logo/BreakoutLogo';
import { Title } from '../Objects/Logo/Title';
import { ButtonParameters } from '../Objects/Button/ButtonParameters';

export class MainMenu extends Phaser.State
{
    /*=============================
    **Fields**
    =============================*/
    private _game: Breakout;
    private _background: Phaser.Image;
    private _music: Phaser.Sound;

    private _leaderBoard: Phaser.Text;

    private _playButton: BreakoutButton;
    private _offButton: BreakoutButton;
    private _optionsButton: BreakoutButton;

    private _title: BreakoutLogo;

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

    preload(): void 
    {
        this.camera.resetFX();

        this._game.BreakoutWorld.stageManager.CurrentStage = 0;

        let currentStage: number = this._game.BreakoutWorld.stageManager.CurrentStage;

        this._game.BreakoutWorld.scalingManager.scaleGameScreen();
        this.scale.onOrientationChange.add(this._game.BreakoutWorld.scalingManager.scaleGameScreen, this);
        this.scale.onOrientationChange.add(this._game.BreakoutWorld.scalingManager.scaleBreakoutBackground, this);

        //background

        this._background = this.add.image(0, 0, this._game.BreakoutWorld.stageManager.BackgroundList[currentStage]);
        this._game.BreakoutWorld.scalingManager.scaleBreakoutBackground(this._background);


        //logo
        this._title = new Title(this.game, this.game.world.centerX, this.game.world.centerY, 'title', 0);
        this.game.add.existing(this._title);
        this._game.BreakoutWorld.scalingManager.scaleGameElements(this.game,[this._title],0.2,0.15);

    }

    create(): void 
    {
        let currentStage: number = this._game.BreakoutWorld.stageManager.CurrentStage;
        //music
        this._music = this.add.audio(this._game.BreakoutWorld.stageManager.MusicList[currentStage], 1, true);
        this._music.fadeIn(6000);

        //buttons
        
        this._playButton = this._game.AddElement.buttonFactory.createProduct("start", new ButtonParameters(this.game, this._title.x - (this.game.world.width * 0.3), this._title.y,
            'play-button', this.prepareBeginGame, this, 1, 0, 1, 0));

        this._playButton.anchor.set(0.5, 1);

       this._optionsButton = this._game.AddElement.buttonFactory.createProduct("options", new ButtonParameters(this.game,
            this._title.x + (this.game.world.width * 0.3), this._title.y, 'options-button', this.options, this, 1, 0, 1, 0)); 

       this._optionsButton.anchor.set(0.5, 1);

       this._offButton = this._game.AddElement.buttonFactory.createProduct("off", new ButtonParameters(this.game, this._title.x + (this.game.world.width * 0.3),
           this._title.y + this.game.world.height * 0.3, 'off-button', this.endGame, this, 0, 1, 0, 1));

       this._offButton.anchor.set(0.5, 1);

       this._game.BreakoutWorld.scalingManager.scaleGameElements(this.game, [this._playButton, this._offButton, this._optionsButton], 0.1, 0.1);

       if (this._game.PlayerList.MyPlayerList.length > 0) this.addLeaderBoardText();

    }

    prepareBeginGame(): void 
    {
        this._music.fadeOut(4000);
        this.camera.fade(0x000000, 1000);
        this.camera.onFadeComplete.addOnce(this.createPlayer, this, null, this._game);
    }

    createPlayer(game: Breakout): void 
    {
        let name = "";
        while (name === "")
        {
            name = prompt("Player, please enter your name:");
        }
        this._game.PlayerList.addPlayer(new BreakoutPlayer(name, 0, this._game.BreakoutConfig.PlayerNumberOfLives,
            1,0, this._game.BreakoutConfig.ValueForNewLife));
        this.beginGame(this._game);
    }

    beginGame(game: Breakout): void 
    {
        this._background.destroy();
        this._music.destroy();
        this._game.BreakoutWorld.stageManager.CurrentStage = 1;
        this.game.state.start("FinalBoss", true, false, this._game);  
        //this.game.state.start("Game",true, false, this._game);  
    }

    addLeaderBoardText(): void 
    {
        this._leaderBoard = this._game.BreakoutWorld.styleManager.positionTextBottomLeft(
            "LEADERBOARD", null);
        this._leaderBoard.inputEnabled = true;
        this._leaderBoard.events.onInputUp.add(this.viewLeaderBoard,this);
    }

    viewLeaderBoard(): void 
    {

        this._background.destroy();
        this._music.destroy();
        this.game.state.start("LeaderBoard", true, false, this._game);  
    }

    options(): void  {
        this._background.destroy();
        this._music.destroy();
        this.game.state.start("Options", true, false, this._game);  
    }

    endGame(): void {
        this.game.destroy();
    }

}