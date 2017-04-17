import { Move } from './Move';

export class MediumMovement extends Move {

    /*=============================
    **Fields**
    =============================*/

    /*=============================
    **Constructors**
    =============================*/
    constructor(velocityX?: number, velocityY?: number) {
        super(velocityX, velocityY);
        this.z_defaultVelocityX = -75;
        this.z_defaultVelocityY = -300;
        this.initDefaultVelocities();
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


