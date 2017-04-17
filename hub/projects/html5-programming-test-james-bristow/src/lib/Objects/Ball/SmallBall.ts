import { Ball } from './Ball';
import { FastMovement } from '../MovableBehaviour/FastMovement';
import { iMovable } from '../MovableBehaviour/iMovable';
import { BallParameters } from './BallParameters';

export class SmallBall extends Ball{

    /*=============================
    **Fields**
    =============================*/

    /*=============================
    **Constructors
    =============================*/

    constructor(ballParameters: BallParameters) {
        super(ballParameters);
        this.z_defaultDamage = 1;
        this.z_defaultMovementType = new FastMovement();
        this.initDefaultBehaviour();
    }

    /*=============================
    **Properties**
    =============================*/

    /*=============================
    **Methods**
    =============================*/

    enableAnimations() {
        this.animations.add('ball-to-paddle', [3, 2, 1, 0], 24);
        this.animations.add('ball-to-brick', [3, 4, 1, 0], 24);
        this.animations.add('ball-to-boss', [3, 4, 1, 3, 4, 0], 24);
        this.animations.add('sleep', [1, 3, 1, 3], 24);
    }

}




