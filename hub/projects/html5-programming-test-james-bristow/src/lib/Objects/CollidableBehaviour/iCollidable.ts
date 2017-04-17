export interface iCollidable
{
    /*=============================
    **Fields**
    =============================*/
    collide(collidedWith: string, damageReceived?: number, newDirectionSeed?: number)
}