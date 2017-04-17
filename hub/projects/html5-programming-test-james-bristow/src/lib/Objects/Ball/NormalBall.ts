import { Ball } from './Ball';
import { MediumMovement } from '../MovableBehaviour/MediumMovement';
import { iMovable } from '../MovableBehaviour/iMovable';
import { BallParameters } from './BallParameters';

export class NormalBall extends Ball{

    /*=============================
    **Fields**
    =============================*/

    /*=============================
    **Constructors
    =============================*/

    constructor(ballParameters: BallParameters) {
        super(ballParameters);

        this.z_defaultDamage = 1;
        this.z_defaultMovementType = new MediumMovement();
        this.initDefaultBehaviour();
    }

    /*=============================
    **Properties**
    =============================*/

    /*=============================
    **Methods**
    =============================*/

    enableAnimations() {
        this.animations.add('ball-to-paddle', [3, 2, 1, 0], 2);
        this.animations.add('ball-to-brick', [3, 4, 1, 0], 2);
        this.animations.add('ball-to-boss', [3, 4, 1, 3, 4, 0], 2);
        this.animations.add('sleep', [1, 3, 1, 3], 2);
    }
}




