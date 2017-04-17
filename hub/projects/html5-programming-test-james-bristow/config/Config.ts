export abstract class Config {

    /*=============================
    **Fields**
    =============================*/

    //Actual Values
    protected z_width: number;
    protected z_height: number;
    protected z_renderer: number;
    protected z_aspect_ratio: number;
    protected z_transparent: boolean;
    protected z_antialias: boolean;
    protected z_playerNumberOfLives: number;
    protected z_playerMaximumSettableLives: number;
    protected z_numberOfStages: number;
    protected z_frameSize: number;
    protected z_orientation: number;
    protected z_playerNewLife: number;

    //Default Values
    protected z_defaultWidth: number;
    protected z_defaultHeight: number;
    protected z_defaultRenderer: number;
    protected z_defaultAspect_ratio: number;
    protected z_defaultTransparent: boolean;
    protected z_defaultAntialias: boolean;
    protected z_defaultNumberOfLives: number;
    protected z_defaultSettableNumberOfLives: number;
    protected z_defaultNumberOfStages: number;
    protected z_defaultFrameSize: number;
    protected z_defaultOrientation: number;
    protected z_defaultPlayerNewLife: number;

    /*=============================
    **Constructors**
    =============================*/
    constructor(width?: number, height?: number, renderer?: number, aspect_ratio?: number, transparent?: boolean, antialias?: boolean, 
        playerNumberOfLives?: number, playerMaximumSettableLives? : number, numberOfStages?: number, defaultFrameSize?: number, orientation?:number, newLife?: number)
    {
        this.z_width = width;
        this.z_height = height;
        this.z_renderer = renderer;
        this.z_aspect_ratio = aspect_ratio;
        this.z_transparent = transparent;
        this.z_antialias = antialias;
        this.z_playerNumberOfLives = playerNumberOfLives;
        this.z_playerMaximumSettableLives = playerMaximumSettableLives;
        this.z_numberOfStages = numberOfStages;
        this.z_frameSize = defaultFrameSize;
        this.z_orientation = orientation;
        this.z_playerNewLife = newLife;

    }

    /*=============================
    **Properties**
    =============================*/

    //getters
    get Width(): number
    {
        return this.z_width;
    }

    get Height(): number {
        return this.z_height;
    }

    get Renderer(): number {
        return this.z_renderer;
    }

    get AspectRatio(): number {
        return this.z_aspect_ratio;
    }

    get Transparent() :boolean
    {
        return this.z_transparent;
    }

    get AntiAlias() :boolean
    {
        return this.z_antialias;
    }

    get PlayerNumberOfLives(): number
    {
        return this.z_playerNumberOfLives;
    }

    get PlayerMaximumSettableNumberOfLives(): number {
        return this.z_playerMaximumSettableLives;
    }

    get NumberOfStages(): number {
        return this.z_numberOfStages;
    }

    get DefaultFrameSize(): number {
        return this.z_frameSize;
    }

    get Orientation(): number {
        return this.z_orientation;
    }

    get ValueForNewLife(): number {
        return this.z_playerNewLife;
    }

    //setters

    set Width(val: number) {
        this.z_width = val;
    }

    set Height(val: number) {
        this.z_height = val;
    }

    set Renderer(val: number) {
        this.z_renderer = val;
    }

    set AspectRatio(val: number) {
        this.z_aspect_ratio = val;
    }

    set Transparent(val: boolean) {
        this.z_transparent = val;
    }

    set AntiAlias(val: boolean) {
        this.z_antialias = val;
    }

    set PlayerNumberOfLives(val: number) {
        this.z_playerNumberOfLives = val;
    }

    set PlayerMaximumSettableNumberOfLives(val: number) {
        this.z_playerMaximumSettableLives = val;
    }

    set NumberOfStages(val: number) {
        this.z_numberOfStages = val;
    }

    set DefaultFrameSize(val: number) {
        this.z_frameSize = val;
    }

    set Orientation(val: number) {
        this.z_orientation = val;
    }

    set ValueForNewLife(val: number) {
        this.z_playerNewLife = val;
    }

    /*=============================
    **Methods**
    =============================*/

    protected setGameDefaults() {

        if (this.z_width === null || this.z_width === undefined)
            this.z_width = this.z_defaultWidth;
        if (this.z_height === null || this.z_height === undefined)
            this.z_height = this.z_defaultHeight;
        if (this.z_renderer === null || this.z_renderer === undefined)
            this.z_renderer = this.z_defaultRenderer;
        if (this.z_aspect_ratio === null || this.z_aspect_ratio === undefined)
            this.z_aspect_ratio = this.z_defaultAspect_ratio;
        if (this.z_transparent === null || this.z_transparent === undefined)
            this.z_transparent = this.z_defaultTransparent;
        if (this.z_antialias === null || this.z_antialias === undefined)
            this.z_antialias = this.z_defaultAntialias;
        if (this.z_playerNumberOfLives === null || this.z_playerNumberOfLives === undefined)
            this.z_playerNumberOfLives = this.z_defaultNumberOfLives;
        if (this.z_playerMaximumSettableLives === null || this.z_playerMaximumSettableLives === undefined)
            this.z_playerMaximumSettableLives = this.z_defaultSettableNumberOfLives;
        if (this.z_numberOfStages === null || this.z_numberOfStages === undefined)
            this.z_numberOfStages = this.z_defaultNumberOfStages;
        if (this.z_frameSize === null || this.z_frameSize === undefined)
            this.z_frameSize = this.z_defaultFrameSize;
        if (this.z_orientation === null || this.z_orientation === undefined)
            this.z_orientation = this.z_defaultOrientation;
        if (this.z_playerNewLife === null || this.z_playerNewLife === undefined)
            this.z_playerNewLife = this.z_defaultPlayerNewLife;
    }

}