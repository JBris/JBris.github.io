import { Breakout } from '../../Breakout';
import { BreakoutPlayer } from '../Objects/Player/BreakoutPlayer'
import { BreakoutButton } from '../Objects/Button/BreakoutButton';
import { BreakoutLogo } from '../Objects/Logo/BreakoutLogo';
import { Title } from '../Objects/Logo/Title';
import { ButtonParameters } from '../Objects/Button/ButtonParameters';

export class Options extends Phaser.State
{
    /*=============================
    **Fields**
    =============================*/
    private _game: Breakout;
    private _background: Phaser.Image;
    private _music: Phaser.Sound;

    private _backButton: BreakoutButton;

    //Lives
    private _playerStartLives: Phaser.Text;
    private _playerDecrementLives: Phaser.Text;
    private _playerIncrementLives: Phaser.Text;

    //New Lives Ceiling
    private _playerNewLivesCeiling: Phaser.Text;
    private _playerDecrementNewLives: Phaser.Text;
    private _playerIncrementNewLives: Phaser.Text;

    //Refresh Screen
    private _refreshScreenText: Phaser.Text;

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
    preload() {
        this._game.BreakoutWorld.stageManager.CurrentStage = 0;
        let currentStage: number = this._game.BreakoutWorld.stageManager.CurrentStage;
        this._game.BreakoutWorld.scalingManager.scaleGameScreen();

        //background
        this._background = this.add.image(0, 0, this._game.BreakoutWorld.stageManager.BackgroundList[currentStage]);
        this._game.BreakoutWorld.scalingManager.scaleBreakoutBackground(this._background);
    }

    create() {
        let currentStage: number = this._game.BreakoutWorld.stageManager.CurrentStage;

        //music
        this._music = this.add.audio(this._game.BreakoutWorld.stageManager.MusicList[currentStage], 1, true);
        this._music.play();

        //buttons
        this._backButton = this._game.AddElement.buttonFactory.createProduct("start", new ButtonParameters(this.game,
            this.game.world.width - 0.1 * this.game.world.width, this.game.world.height - 0.1 * this.game.world.height,
            'back-button', this.launchMainMenu, this, 1, 0, 1, 0));

        this._backButton.anchor.set(1, 1);
        this._game.BreakoutWorld.scalingManager.scaleGameElements(this.game, [this._backButton], 0.1, 0.1);

        //text
        //Lives
        this.setLivesText();

        //NewLivesCeiling
        this.setNewLivesCeilingText();

        //refreshScreen
        this.setRefreshScreenText();

    }


    decreaseLives(): void 
    {
        this._game.BreakoutConfig.PlayerNumberOfLives -= 1;
        if (this._game.BreakoutConfig.PlayerNumberOfLives < 1) this._game.BreakoutConfig.PlayerNumberOfLives = 1;
        this._playerStartLives.setText("Lives " + this._game.BreakoutConfig.PlayerNumberOfLives, null);
    }

    increaseLives(): void 
    {
        this._game.BreakoutConfig.PlayerNumberOfLives += 1;
        if (this._game.BreakoutConfig.PlayerNumberOfLives > this._game.BreakoutConfig.PlayerMaximumSettableNumberOfLives)
            this._game.BreakoutConfig.PlayerNumberOfLives = this._game.BreakoutConfig.PlayerMaximumSettableNumberOfLives;
        this._playerStartLives.setText("Lives " + this._game.BreakoutConfig.PlayerNumberOfLives, null);
    }

    decreaseNewLivesCeiling(): void {
        this._game.BreakoutConfig.ValueForNewLife -= 100;
        if (this._game.BreakoutConfig.ValueForNewLife < 1000) this._game.BreakoutConfig.ValueForNewLife = 1000;
        this._playerNewLivesCeiling.setText("Points for Life " + this._game.BreakoutConfig.ValueForNewLife, null);
    }

    IncreaseNewLivesCeiling(): void {
        this._game.BreakoutConfig.ValueForNewLife += 100;
        if (this._game.BreakoutConfig.ValueForNewLife > 30000) this._game.BreakoutConfig.ValueForNewLife = 30000;
        this._playerNewLivesCeiling.setText("Points for Life " + this._game.BreakoutConfig.ValueForNewLife, null);
    }

    refreshScreen(): void {
        this._game.BreakoutWorld.scalingManager.scaleGameScreen();

    }

    launchMainMenu() :void {
        this._background.destroy();
        this._music.destroy();
        this.game.state.start("MainMenu", true, false, this._game);
    }

    //====================================================================================//
    //Loading Text
    //====================================================================================//

    setLivesText() : void
    {
        this._playerStartLives = this._game.BreakoutWorld.styleManager.positionTextTopLeft(
            "Lives " + this._game.BreakoutConfig.PlayerNumberOfLives, null);
        this._playerStartLives.x = 0 + 0.2 * this.game.world.width;
        this._playerStartLives.y = 0 + 0.1 * this.game.world.height;

        this._playerDecrementNewLives = this._game.BreakoutWorld.styleManager.positionTextTopLeft(
            "<", null);
        this._playerDecrementNewLives.inputEnabled = true;
        this._playerDecrementNewLives.events.onInputUp.add(this.decreaseLives, this, null);
        this._playerDecrementNewLives.x = this._playerStartLives.x - 0.5 * this._playerStartLives.width;
        this._playerDecrementNewLives.y = 0 + 0.1 * this.game.world.height;

        this._playerIncrementLives = this._game.BreakoutWorld.styleManager.positionTextTopLeft(
            ">", null);
        this._playerIncrementLives.inputEnabled = true;
        this._playerIncrementLives.events.onInputUp.add(this.increaseLives, this, null);
        this._playerIncrementLives.x = this._playerStartLives.x + 1.5 * this._playerStartLives.width;
        this._playerIncrementLives.y = 0 + 0.1 * this.game.world.height;
    }

    setNewLivesCeilingText(): void
    {
        this._playerNewLivesCeiling = this._game.BreakoutWorld.styleManager.positionTextTopLeft(
            "Points for Life " + this._game.BreakoutConfig.ValueForNewLife, null);
        this._playerNewLivesCeiling.x = 0 + 0.2 * this.game.world.width;
        this._playerNewLivesCeiling.y = 0 + 0.2 * this.game.world.height;

        this._playerDecrementLives = this._game.BreakoutWorld.styleManager.positionTextTopLeft(
            "<", null);
        this._playerDecrementLives.inputEnabled = true;
        this._playerDecrementLives.events.onInputUp.add(this.decreaseNewLivesCeiling, this, null);
        this._playerDecrementLives.x = this._playerNewLivesCeiling.x - 0.2 * this._playerNewLivesCeiling.width;
        this._playerDecrementLives.y = 0 + 0.2 * this.game.world.height;

        this._playerIncrementNewLives = this._game.BreakoutWorld.styleManager.positionTextTopLeft(
            ">", null);
        this._playerIncrementNewLives.inputEnabled = true;
        this._playerIncrementNewLives.events.onInputUp.add(this.IncreaseNewLivesCeiling, this, null);
        this._playerIncrementNewLives.x = this._playerNewLivesCeiling.x + 1.2 * this._playerNewLivesCeiling.width;
        this._playerIncrementNewLives.y = 0 + 0.2 * this.game.world.height;
    }

    setRefreshScreenText(): void
    {
        this._refreshScreenText = this._game.BreakoutWorld.styleManager.positionTextTopLeft(
            "Refresh Screen", null);
        this._refreshScreenText.inputEnabled = true;
        this._refreshScreenText.events.onInputUp.add(this.refreshScreen, this, null);
        this._refreshScreenText.x = 0 + 0.2 * this.game.world.width;
        this._refreshScreenText.y = 0 + 0.3 * this.game.world.height;
    }

}