import { Ball } from './Ball';
import { BigBall } from './BigBall';
import { SmallBall } from './SmallBall';
import { NormalBall } from './NormalBall';

import { iBreakoutFactory } from '../Engine/iBreakoutFactory';
import { BallParameters } from './BallParameters';
import { iMovable } from '../MovableBehaviour/iMovable';

export class BallFactory extends Phaser.GameObjectFactory implements iBreakoutFactory
{
    /*=============================
    **Fields**
    =============================*/
    ball: Ball;

    /*=============================
    **Constructors
    =============================*/

    constructor (game: Phaser.Game)
    {
        super(game);
    }

    createProduct(ballType: string, ballParamaters : BallParameters) : Ball
    {
        if (ballType === "big")
            this.ball = new BigBall(ballParamaters);

       if (ballType === "small")
           this.ball = new SmallBall(ballParamaters);
    
       this.ball = new NormalBall(ballParamaters);
       this.ball.MovementType.movableSprite = this.ball;
       return this.game.add.existing(this.ball);
    }

    /*=============================
    **Properties**
    =============================*/

    /*=============================
    **Methods**
    =============================*/
}