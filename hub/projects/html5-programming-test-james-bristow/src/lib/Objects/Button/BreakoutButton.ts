import { ButtonParameters } from './ButtonParameters';

export abstract class BreakoutButton extends Phaser.Button {

    /*=============================
    **Fields**
    =============================*/

    /*=============================
    **Constructors
    =============================*/
    constructor(buttonParamaters: ButtonParameters) {
        super(buttonParamaters.game, buttonParamaters.x, buttonParamaters.y, buttonParamaters.key, buttonParamaters.Callback, buttonParamaters.Context,
            buttonParamaters.Overframe,buttonParamaters.Outframe,buttonParamaters.Downframe, buttonParamaters.Upframe);

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

}


