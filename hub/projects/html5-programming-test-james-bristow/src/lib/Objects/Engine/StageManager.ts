export class StageManager
{
    /*=============================
    **Fields**
    =============================*/
    private _musicList: Array<string>;
    private _backgroundList: Array<string>;
    private _bossList: Array<string>;
    private _currentStage: number;
    /*=============================
    **Constructors**
    =============================*/
    constructor(game :Phaser.Game)
    {
        this._musicList = new Array<string>();
        this._backgroundList = new Array<string>();
        this._bossList = new Array<string>();
        this._currentStage = 0;
    }
    /*=============================
    **Properties**
    =============================*/
    //getters
    get MusicList(): Array<string>
    { return this._musicList;  }

    get BackgroundList(): Array<string>
    { return this._backgroundList; }

    get BossList(): Array<string>
    { return this._bossList; }

    get CurrentStage(): number
    { return this._currentStage; }

    //setters

    set MusicList(val: Array<string>)
    { this._musicList = val; }

    set BackgroundList(val: Array<string>) 
    { this._backgroundList = val; }

    set BossList(val: Array<string>)
    { this._bossList = val; }

    set CurrentStage(val: number)
    { this._currentStage = val; }

    /*=============================
    **Methods**
    =============================*/
}