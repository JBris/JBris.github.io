import { iPlayer } from './iPlayer';

export class PlayerList {

    /*=============================
    **Fields**
    =============================*/
    private _myPlayerList: Array<iPlayer>;
    private _maxNumOfPlayers: number;

    /*=============================
    **Constructors**
    =============================*/
    constructor()
    {
        this._myPlayerList = new Array<iPlayer>();
        this._maxNumOfPlayers = 10;
    }

    /*=============================
    **Properties**
    =============================*/

    //getters
    get MyPlayerList(): Array<iPlayer>
    { return this._myPlayerList; }

    get MaxNumOfPlayers(): number
    { return this._maxNumOfPlayers; }

    //setters
    set MyPlayerList(val: Array<iPlayer>)
    { this._myPlayerList = val; }

    set MaxNumOfPlayers(val: number)
    { this._maxNumOfPlayers = val; }

    /*=============================
    **Methods**
    =============================*/

    addPlayer(iPlayer): void
    {
        this.sortPlayers();
        if (this._myPlayerList.length > this._maxNumOfPlayers)
        {
            while (this._myPlayerList.length > this._maxNumOfPlayers) this._myPlayerList.pop();
        }
        this._myPlayerList.unshift(iPlayer);
    }

    removePlayer(iPlayer, deleteCount?:number): void {
        this._myPlayerList.splice(iPlayer, deleteCount);
    }

    sortPlayers() :void
    {
        this._myPlayerList.sort(function (a, b) {
            let scoreA :  number = a.score;
            let scoreB :  number = b.score;
            return (scoreA > scoreB) ? -1 : (scoreA < scoreB) ? 1 : 0;
        });
    }

    displayPlayers(): string
    {
        if (this._myPlayerList.length === 0) return "No players yet";
        this.sortPlayers();
        let playerDisplay: string = "";
        for (let player of this._myPlayerList)
        {
            playerDisplay += "Name: " + player.name + " Score: " + player.score + " Level: " + player.level + '\n';
        }

        return playerDisplay;
    }
}



