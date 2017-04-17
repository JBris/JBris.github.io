import { AssetRouter } from './AssetRouter';
import { StageManager } from './StageManager';

export class AssetLoader {

    /*=============================
    **Fields**
    =============================*/
    private _game: Phaser.Game;
    private _assetRouter: AssetRouter;
    private _stageManager: StageManager;
    /*=============================
    **Constructors
    =============================*/
    constructor(game: Phaser.Game, assetRouter: AssetRouter, stageManager: StageManager) {
        this._game = game;
        this._assetRouter = assetRouter;
        this._stageManager = stageManager;
    }
    /*=============================
    **Properties**
    =============================*/

    /*=============================
    **Methods**
    =============================*/
    loadSpriteSheet(name: string, fileType: string, frameWidth:number,frameHeight : number) {
        this._game.load.spritesheet(name, AssetRouter.spriteRoute + name +"."+ fileType, frameWidth, frameHeight);
    }

    loadBossSpriteSheet(name: string, fileType: string, frameWidth: number, frameHeight: number) {
        this._game.load.spritesheet(name, AssetRouter.spriteRoute + name + "." + fileType, frameWidth, frameHeight);
        this._stageManager.BossList.push(name);

    }


    loadLogos(name: string, fileType: string, frameWidth: number, frameHeight: number) {
        this._game.load.spritesheet(name, AssetRouter.logoRoute + name + "." + fileType, frameWidth, frameHeight);
    }

    loadButtons(name: string, fileType: string, frameWidth: number, frameHeight: number) {
        this._game.load.spritesheet(name, AssetRouter.buttonRoute + name + "." + fileType, frameWidth, frameHeight);
    }

    loadImage(name: string, fileType: string) 
    {
        this._game.load.image(name, AssetRouter.backgroundRoute + name + "." + fileType);
        this._stageManager.BackgroundList.push(name);
    }

    loadSound(name: string, fileType: string, altFileType:string) 
    {
        this._game.load.audio(name, [AssetRouter.mpg3SoundRoute + name + fileType, AssetRouter.oggSoundRoute + name + "." + altFileType]);

    }

    loadMusic(name: string, fileType: string, altFileType: string) {
        this._game.load.audio(name, [AssetRouter.mpg3MusicRoute + name + fileType, AssetRouter.oggMusicRoute + name + "." + altFileType]);
        this._stageManager.MusicList.push(name);
    }
}


