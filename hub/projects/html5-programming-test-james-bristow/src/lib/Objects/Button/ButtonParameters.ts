import { iBreakoutParameters } from '../Engine/iBreakoutParameters';

export class ButtonParameters implements iBreakoutParameters{

    /*=============================
    **Fields**
    =============================*/
    game: Phaser.Game;
    x: number;
    y: number;
    key?: string;
    frame?: string | number;
    private _callback: Function;
    private _context: any;
    private _overframe: number;
    private _outframe: number;
    private _downframe: number;
    private _upframe: number;

    /*=============================
    **Constructors
    =============================*/

    constructor(game: Phaser.Game, x?: number, y?: number, key?: string, callback?: Function, context?: any, overframe?: number,
        outframe?: number, downframe?: number, upframe?: number) 
    {
        this.game=game;
        this.x=x;
        this.y=y;
        this.key = key;
        this._callback = callback;
        this._context = context;
        this._overframe= overframe;
        this._outframe = outframe;
        this._downframe = downframe;
        this._upframe =upframe;
    }

    /*=============================
    **Properties**
    =============================*/
    //getters

    get Callback(): Function
    { return this._callback; }

    get Context(): any
    { return this._context; }

    get Overframe(): number
    { return this._overframe; }

    get Outframe(): number
    { return this._outframe; }

    get Downframe(): number
    { return this._downframe; }

    get Upframe(): number
    { return this._upframe; }

    //setters

    set Callback(val: Function)
    { this._callback = val; }

    set Context(val: any)
    { this._context = val; }

    set Overframe(val: number)
    { this._overframe = val; }

    set Outframe(val: number)
    { this._outframe = val; }

    set Downframe(val: number)
    { this._downframe = val; }

    set Upframe(val: number)
    { this._upframe = val; }

    /*=============================
    **Methods**
    =============================*/

}


