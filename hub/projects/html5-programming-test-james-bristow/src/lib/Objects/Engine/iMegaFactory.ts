import { iBreakoutFactory } from './iBreakoutFactory';

export interface iMegaFactory {

    /*=============================
    **Fields**
    =============================*/
    ballFactory: iBreakoutFactory;
    paddleFactory: iBreakoutFactory;
    brickFactory: iBreakoutFactory;
    bossFactory: iBreakoutFactory;
    buttonFactory: iBreakoutFactory;

    /*=============================
    **Properties**
    =============================*/

    /*=============================
    **Methods**
    =============================*/

}


