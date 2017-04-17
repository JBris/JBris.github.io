export interface iMovable {

    /*=============================
    **Fields**
    =============================*/
    movableSprite: Phaser.Sprite;
    baseVelocityX: number;
    baseVelocityY: number;
    /*=============================
    **Properties**
    =============================*/

    /*=============================
    **Methods**
    =============================*/
    setVelocity(velocityX: number, velocityY: number):void;
    move(velocityX?: number, velocityY?: number): void;
 
}


