import { iMovable } from '../MovableBehaviour/iMovable';
import { MediumMovement } from '../MovableBehaviour/MediumMovement';
import { BallParameters } from './BallParameters';
import { iCollidable } from '../CollidableBehaviour/iCollidable';

export abstract class Ball extends Phaser.Sprite implements iCollidable  {

    /*=============================
    **Fields**
    =============================*/

    protected z_defaultDamage: number;
    protected z_defaultMovementType: iMovable;
    protected z_movementType: iMovable;
    protected z_attackPower: number;

    /*=============================
    **Constructors
    =============================*/

    constructor(ballParameters: BallParameters) {
        super(ballParameters.game, ballParameters.x, ballParameters.y, ballParameters.key, ballParameters.frame);
        this.z_movementType = ballParameters.MovementType;
        this.z_attackPower = ballParameters.Damage;
        this.enableAnimations();
        this.initBallPhysics();
    }

    /*=============================
    **Properties**
    =============================*/

    //getters
    get MovementType(): iMovable
    { return this.z_movementType; }

    get Damage(): number
    { return this.z_attackPower; }

    //setters

    set MovementType(val: iMovable)
    { this.z_movementType = val; }

    set Damage(val: number)
    { this.z_attackPower = val; }


    /*=============================
    **Methods**
    =============================*/

    initBallPhysics() {
        this.anchor.set(0.5);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;
        this.body.bounce.set(1);
        this.checkWorldBounds = true;
        this.body.setSize(this.body.width, this.body.height / 4);

    }

    setMovementType(movementType?: iMovable) {
        if (movementType === null || movementType === undefined)
            movementType = new MediumMovement();
        this.z_movementType = movementType;
    }

    abstract enableAnimations(): void;

    initDefaultBehaviour() {
        if (this.z_attackPower === null || this.z_attackPower === undefined)
            this.z_attackPower = this.z_defaultDamage;
        if (this.z_movementType === null || this.z_movementType === undefined)
            this.z_movementType = this.z_defaultMovementType;
    }

    collide(collidedWith: string, damageReceived? : number, newDirectionSeed?:number)
    {
        if (collidedWith == "paddle")
        {
            if (this.animations.getAnimation('ball-to-paddle') !== undefined && this.animations.getAnimation('ball-to-paddle') !== null)
            {
                this.animations.play('ball-to-paddle');
            }
            if (this.game.cache.checkSoundKey('ball-to-paddle')) this.game.sound.play('ball-to-paddle');
            this.calculateDirection(newDirectionSeed);
        }

        if (collidedWith == "brick") {
            if (this.animations.getAnimation('ball-to-brick') !== undefined && this.animations.getAnimation('ball-to-brick') !== null) {
                this.animations.play('ball-to-brick');
            }
            if (this.game.cache.checkSoundKey('ball-to-brick')) this.game.sound.play('ball-to-paddle');
        }
    }

    private calculateDirection(newDirectionSeed: number) {
        let diff: number = 0;

        if (this.x < newDirectionSeed) {
            //  left side
            diff = newDirectionSeed - this.x;
            this.body.velocity.x = (-5 * diff);
        }
        else if (this.x > newDirectionSeed) {
            //  right side
            diff = this.x - newDirectionSeed;
            this.body.velocity.x = (5 * diff);
        }
        else {
            //random
            this.body.velocity.x = 1 + Math.random() * 5;
        }
    }
}


