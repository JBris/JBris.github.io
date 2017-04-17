export class ScoreCalculator {

    /*=============================
    **Fields**
    =============================*/
    private _game: Phaser.Game;
    private _scoreMultiplier: number;

    /*=============================
    **Constructors
    =============================*/

    constructor(game: Phaser.Game)
    {
        this._game = game;
        this._scoreMultiplier = 1;
    }

    /*=============================
    **Properties**
    =============================*/
    //getters
    get ScoreMultiplier() : number
    { return this._scoreMultiplier; }
 

    //setters
    set ScoreMultiplier(val: number)
    { this._scoreMultiplier = val; }

    /*=============================
    **Methods**
    =============================*/
    calculatePoints(resetMultiplier : boolean, basePointValue : number) : number
    {
        if (this._scoreMultiplier <= 1) return basePointValue;

        let awardedPoints = basePointValue;
        if (!resetMultiplier) awardedPoints *= 2;

        awardedPoints *= this._scoreMultiplier;

        //if the player gets long Multiplier chains...
        if (this._scoreMultiplier < 5) return awardedPoints;
        if (this._scoreMultiplier >= 5 && this._scoreMultiplier < 10 ) return awardedPoints * 1.2;
        if (this._scoreMultiplier >= 10 && this._scoreMultiplier < 15) return awardedPoints * 1.4;
        if (this._scoreMultiplier >= 15 && this._scoreMultiplier < 20) return awardedPoints * 1.6;
        if (this._scoreMultiplier >= 20 && this._scoreMultiplier < 25) return awardedPoints * 1.8;
        if (this._scoreMultiplier >= 25) return awardedPoints * 2;
    }

    makeMultiplierComment(): string
    {
        if (this._scoreMultiplier === 5) return "AMAZING!";
        if (this._scoreMultiplier === 10) return "INCREDIBLE!!";
        if (this._scoreMultiplier === 15) return "UNSTOPPABLE!!!";
        if (this._scoreMultiplier === 20 ) return "IMPOSSIBLE!!!!";
        if (this._scoreMultiplier === 25 ) return "GODLIKE!!!!!";
        return "";
    }

}


