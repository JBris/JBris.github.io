import { iMovable } from './iMovable';

export abstract class Move implements iMovable {

    /*=============================
    **Fields**
    =============================*/
    movableSprite: Phaser.Sprite;
    baseVelocityX: number;
    baseVelocityY: number;
    protected z_defaultVelocityX: number;
    protected z_defaultVelocityY: number;

    /*=============================
    **Constructors**
    =============================*/
    constructor(velocityX?:number, velocityY?:number)
    {
        this.baseVelocityX = velocityX;
        this.baseVelocityY = velocityY;
    }
    /*=============================
    **Properties**
    =============================*/

    /*=============================
    **Methods**
    =============================*/
    protected initDefaultVelocities() : void
    {
        if (this.baseVelocityX === null || this.baseVelocityX === undefined)
            this.baseVelocityX = this.z_defaultVelocityX;

        if (this.baseVelocityY === null || this.baseVelocityY === undefined)
            this.baseVelocityY = this.z_defaultVelocityY;
    }

    setVelocity(velocityX: number, velocityY: number): void
    {
        this.baseVelocityX = velocityX;
        this.baseVelocityY = velocityY;
    }


    move(velocityX?: number, velocityY?: number) : void {
        if (velocityX === null || velocityX === undefined)
            velocityX = this.baseVelocityX;

        if (velocityY === null || velocityY === undefined)
            velocityY = this.baseVelocityY;

        this.movableSprite.body.velocity.set(velocityX, velocityY);
    }

}


