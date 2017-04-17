import { iBreakoutParameters } from '../Engine/iBreakoutParameters';

export interface iBreakoutFactory
{
    /*=============================
    **Fields**
    =============================*/
    game: Phaser.Game;
    /*=============================
    **Constructor**
    =============================*/

    createProduct(productType: string, params: iBreakoutParameters): any;

    /*=============================
    **Properties**
    =============================*/

    /*=============================
    **Methods**
    =============================*/
}