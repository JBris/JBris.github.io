import { iBreakoutParameters } from '../Engine/iBreakoutParameters';
import { iMovable } from '../MovableBehaviour/iMovable';

export class BallParameters implements iBreakoutParameters{

    /*=============================
    **Fields**
    =============================*/
    game: Phaser.Game;
    x: number;
    y: number;
    key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture;
    frame?: string | number;
    private _movementType: iMovable;
    private _damage: number;

    /*=============================
    **Constructors
    =============================*/

    constructor(game: Phaser.Game, x: number, y: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture,
        frame?: string | number, movementType?: iMovable, damage?: number) 
    {
        this.game = game;
        this.x = x;
        this.y = y;
        this.key = key;
        this.frame = frame;
        this._movementType = movementType;
        this._damage = damage;
    }

    /*=============================
    **Properties**
    =============================*/
    //getters

    get MovementType(): iMovable
    { return this._movementType; }

    get Damage(): number
    { return this._damage; }
 
    //setters

    set MovementType(val: iMovable)
    { this._movementType = val; }

    set Damage(val: number)
    { this._damage = val; }

    /*=============================
    **Methods**
    =============================*/

}


