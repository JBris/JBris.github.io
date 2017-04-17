export interface iBreakoutParameters
{
    /*=============================
    **Fields**
    =============================*/
    game: Phaser.Game;
    x: number;
    y: number;
    key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture;
    frame?: string | number;
}