import { Breakout } from '../../Breakout';
import { BreakoutButton } from '../Objects/Button/BreakoutButton';
import { ButtonParameters } from '../Objects/Button/ButtonParameters';

export class LeaderBoard extends Phaser.State
{
    /*=============================
    **Fields**
    =============================*/
    private _game: Breakout;
    private _background: Phaser.Image;
    private _music: Phaser.Sound;
    private _leaderBoard: Phaser.Text;
    private _backButton: BreakoutButton;

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
        this._game.BreakoutWorld.stageManager.CurrentStage = 0;
        let currentStage: number = this._game.BreakoutWorld.stageManager.CurrentStage;
        this._game.BreakoutWorld.scalingManager.scaleGameScreen();

        //background
        this._background = this.add.image(0, 0, this._game.BreakoutWorld.stageManager.BackgroundList[currentStage]);
        this._game.BreakoutWorld.scalingManager.scaleBreakoutBackground(this._background);
    }

    create(): void 
    {
        let currentStage: number = this._game.BreakoutWorld.stageManager.CurrentStage;

        //music
        this._music = this.add.audio(this._game.BreakoutWorld.stageManager.MusicList[currentStage], 1, true);
        this._music.fadeIn(6000);

        //buttons
        this._backButton = this._game.AddElement.buttonFactory.createProduct("start", new ButtonParameters(this.game,
            this.game.world.width - 0.1 * this.game.world.width, this.game.world.height - 0.1 * this.game.world.height,
            'back-button', this.launchMainMenu, this, 1, 0, 1, 0));

        this._backButton.anchor.set(1, 1);
        this._game.BreakoutWorld.scalingManager.scaleGameElements(this.game, [this._backButton], 0.1, 0.1);

        //text
        this._leaderBoard = this._game.BreakoutWorld.styleManager.positionTextTopLeft(this._game.PlayerList.displayPlayers(), null);
    }

    launchMainMenu(): void {
        this._background.destroy();
        this._music.destroy();
        this.game.state.start("MainMenu", true, false, this._game);
    }
}