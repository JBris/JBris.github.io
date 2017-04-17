export class ScalingManager extends Phaser.ScaleManager{

    /*=============================
    **Fields**
    =============================*/
    private _ratio: number = window.innerWidth / window.innerHeight;

    /*=============================
    **Constructors
    =============================*/

    constructor(game: Phaser.Game, width: string | number, height: string | number) {
        super(game, width, height);
    }

    /*=============================
    **Properties**
    =============================*/

    /*=============================
    **Methods**
    =============================*/

    scaleGameScreen(): void
    {
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.refresh();
    }

    scaleBreakoutBackground(background: Phaser.Image) :void
    {
        background.scale.setTo
        (
            this.game.width / background.width,
            this.game.height / background.height
        )
    }

    scaleGameElements(game: Phaser.Game, elements: Array<any>, xScaleValue: number, yScaleValue: number) : void
    {
        let width: number = game.world.width * xScaleValue;
        let height: number  = game.world.height * yScaleValue * this._ratio;

        for (let element of elements)
        {
            element.width = width;
            element.height = height;
        }
    }


    scaleGameElementsOverTime(game: Phaser.Game, elements: Array<any>, xScaleValue: number,
        yScaleValue: number, duration: number, killOnEnd: boolean): void {
 
        let scaledWidth: number = game.world.width * xScaleValue;
        let height: number = game.world.height * yScaleValue * this._ratio;

        for (let element of elements) {
            let scaleTween: Phaser.Tween = game.add.tween(element).to({ width: scaledWidth, height: height }, duration, Phaser.Easing.Linear.None, true);


            if (killOnEnd)
                scaleTween.onComplete.addOnce(function () { element.kill(); }, this);
        }
    } 

    expandAndShrinkElement(element: any, expandedX: number, expandedY: number, originalX: number, orginalY: number) : void
    {
        if (element.width !== expandedX && element.height !== expandedY)
        {
            let growth: Phaser.Tween = this.game.add.tween(element).to({ width: expandedX, height: expandedY }, 1000, Phaser.Easing.Linear.None);
            let shrink: Phaser.Tween = this.game.add.tween(element).to({ width: originalX, height: orginalY }, 1000, Phaser.Easing.Linear.None);

            growth.chain(shrink);
            growth.start();   
        }
    }

}




  
    



