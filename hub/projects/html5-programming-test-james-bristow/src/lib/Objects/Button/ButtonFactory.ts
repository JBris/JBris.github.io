import { BreakoutButton } from './BreakoutButton';
import { OffButton } from './OffButton';
import { OptionsButton } from './OptionsButton';
import { RestartButton } from './RestartButton';
import { StartButton } from './StartButton';
import { PauseButton } from './PauseButton';

import { ButtonParameters } from './ButtonParameters';

import { iBreakoutFactory } from '../Engine/iBreakoutFactory';


export class ButtonFactory extends Phaser.GameObjectFactory implements iBreakoutFactory
{
    /*=============================
    **Fields**
    =============================*/
    breakoutButton: Phaser.Button;

    /*=============================
    **Constructors
    =============================*/

    constructor (game: Phaser.Game)
    {
        super(game);
    }

    createProduct(buttonType: string, buttonParamaters: ButtonParameters): BreakoutButton
    {
        if (buttonType === "off")
            this.breakoutButton = new OffButton(buttonParamaters);

        if (buttonType === "options")
            this.breakoutButton = new OptionsButton(buttonParamaters);

        if (buttonType === "restart")
            this.breakoutButton = new RestartButton(buttonParamaters);

        if (buttonType === "pause")
            this.breakoutButton = new PauseButton(buttonParamaters);

        this.breakoutButton = new StartButton(buttonParamaters);

        return this.game.add.existing(this.breakoutButton);
    }

    /*=============================
    **Properties**
    =============================*/

    /*=============================
    **Methods**
    =============================*/
}