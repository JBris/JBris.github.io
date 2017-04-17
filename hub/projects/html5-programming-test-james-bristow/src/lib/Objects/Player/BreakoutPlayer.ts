import { iPlayer } from './iPlayer';

export class BreakoutPlayer implements iPlayer {

    /*=============================
    **Fields**
    =============================*/

    name: string;
    score: number;
    lives: number;
    level: number;
    newLifePool: number;
    newLifeRequiredValue: number;
    description?: string;

    /*=============================
    **Constructors**
    =============================*/

    constructor(name: string, score: number, lives: number, level: number, newLifePool?: number, newLifeRequiredValue?: number, description ?:string) {
        this.name = name;
        this.score = score;
        this.lives = lives;
        this.level = level;
        this.description = description;

        if (newLifePool !== undefined && newLifePool !== null) this.newLifePool = newLifePool;
        else this.newLifePool = 0;

        if (newLifeRequiredValue !== undefined && newLifeRequiredValue !== null) this.newLifeRequiredValue = newLifeRequiredValue;
        else this.newLifeRequiredValue = -1;
    }

    /*=============================
    **Properties**
    =============================*/


    /*=============================
    **Methods**
    =============================*/
    checkLife(valueToIncreaseLife: number): boolean
    {
        this.newLifePool += valueToIncreaseLife;
        if (this.newLifePool > this.newLifeRequiredValue)
        {
            
            this.newLifePool = 0;
            this.lives++;
            this.newLifeRequiredValue *= 1.2;
            return true;
        }
        return false;

    }


}



