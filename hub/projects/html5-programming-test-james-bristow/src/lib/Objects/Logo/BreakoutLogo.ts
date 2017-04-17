export abstract class BreakoutLogo extends Phaser.Sprite {

    /*=============================
    **Fields**
    =============================*/

    /*=============================
    **Constructors
    =============================*/

    constructor(game: Phaser.Game, x: number, y: number, key: string, frame?: string | number){
        super(game,x,y,key,frame);

        this.enableFeatures();
        this.anchor.set(0.5, 0.5);
    }

    /*=============================
    **Properties**
    =============================*/
    //getters

    //setters

    /*=============================
    **Methods**
    =============================*/
    abstract enableFeatures(): void;
}


