import { Config } from './Config';

export class BreakoutConfig extends Config{

    /*=============================
    **Fields**
    =============================*/
    /*=============================
    **Constructors**
    =============================*/
    constructor(width?: number, height?: number, renderer?: number, aspect_ratio?: number, transparent?: boolean, antialias?: boolean,
        playerNumberOfLives?: number, numberOfStages?: number, defaultFrameSize?: number, orientation?: number)
    {
        super(width, height, renderer, aspect_ratio, transparent, antialias, playerNumberOfLives, numberOfStages, defaultFrameSize, orientation);

         this.z_defaultWidth = window.innerWidth * window.devicePixelRatio;
         this.z_defaultHeight = window.innerHeight * window.devicePixelRatio;
         this.z_defaultRenderer = Phaser.AUTO;
         this.z_defaultAspect_ratio = this.z_defaultWidth / this.z_defaultHeight;
         this.z_defaultTransparent = false;
         this.z_defaultAntialias = false;
         this.z_defaultNumberOfLives = 5;
         this.z_defaultSettableNumberOfLives = 9;
         this.z_defaultNumberOfStages = 3;
         this.z_defaultFrameSize = 64;
         this.z_defaultOrientation = 0;
         this.z_defaultPlayerNewLife = 2500;

         this.setGameDefaults();
    }

    /*=============================
    **Properties**
    =============================*/

    /*=============================
    **Methods**
    =============================*/

}