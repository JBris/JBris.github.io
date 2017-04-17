import { Breakout } from '../../Breakout';

export class Boot extends Phaser.State   {

    /*=============================
    **Fields**
    =============================*/
    private _game: Breakout;
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
        this.game.stage.backgroundColor = '#337799';
        this._game.BreakoutWorld.scalingManager.scaleGameScreen();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this._game.BreakoutWorld.assetLoader.loadSpriteSheet('ball', 'png', 64, 64);
    }

    create(): void  {
        this.game.state.start("Preload", true, false, this._game);
    }


}



