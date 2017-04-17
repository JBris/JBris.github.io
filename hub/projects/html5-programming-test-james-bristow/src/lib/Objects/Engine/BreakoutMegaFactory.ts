import { iMegaFactory } from './iMegaFactory';
import { iBreakoutFactory } from './iBreakoutFactory';

import { BallFactory } from '../Ball/BallFactory';
import { ButtonFactory } from '../Button/ButtonFactory';

export class BreakoutMegaFactory extends Phaser.GameObjectFactory implements iMegaFactory {

    /*=============================
    **Fields**
    =============================*/
    ballFactory: iBreakoutFactory;
    paddleFactory: iBreakoutFactory;
    brickFactory: iBreakoutFactory;
    bossFactory: iBreakoutFactory;
    buttonFactory: iBreakoutFactory;

    /*=============================
    **Constructors**
    =============================*/
    constructor(game:Phaser.Game)
    {
        super(game);
        this.ballFactory = new BallFactory(game);
        this.buttonFactory = new ButtonFactory(game);
    }

    /*=============================
    **Properties**
    =============================*/

    /*=============================
    **Methods**
    =============================*/

}


