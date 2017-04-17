import { Move } from './Move';

export class FastMovement extends Move {

    /*=============================
    **Fields**
    =============================*/

    /*=============================
    **Constructors**
    =============================*/
    constructor(velocityX?: number, velocityY?: number) {
        super(velocityX, velocityY);
        this.z_defaultVelocityX = -100;
        this.z_defaultVelocityY = -400;
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


