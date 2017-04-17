export interface iPlayer {

    /*=============================
    **Fields**
    =============================*/
     name: string;
     score: number;
     lives: number;
     level: number;
     newLifePool?: number;
     newLifeRequiredValue?: number;
     description?: string;

    /*=============================
    **Properties**
    =============================*/
    
    /*=============================
    **Methods**
    =============================*/
     checkLife(valueToIncreaseLife : number) : boolean;
}



