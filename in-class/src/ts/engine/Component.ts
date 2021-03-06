import chroma from "chroma-js";
import { GameObject } from "./GameObject";

export class Component {
    protected gameObject: GameObject;
    public args: any[];

    constructor(gameObject: GameObject, ...args: any[]) {
        this.gameObject = gameObject;
        this.args = args;
    }
}

export abstract class DrawComponent extends Component {
    public color: chroma.Color;
    abstract draw(ctx: CanvasRenderingContext2D): void;
}

export abstract class UpdateComponent extends Component {
    abstract update(): void;
}

export class ScreenTextComponent extends DrawComponent {
    public color: chroma.Color;
    public font: string;
    public string: string;

    constructor(gameObject: GameObject, string: string, options: { color?: string, font?: string }) {
        super(gameObject);
        this.string = string;
        this.color = chroma(options?.color || "red");
        this.font = options?.font || "32pt arial";
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color.css();
        ctx.font = this.font;
        ctx.fillText(this.string, this.gameObject.x, this.gameObject.y);
    }
}

export class DrawGeometryComponent extends DrawComponent {
    public color: chroma.Color;

    constructor(gameObject: GameObject, color: string) {
        super(gameObject);
        this.color = chroma(color);
    }
    draw(ctx: CanvasRenderingContext2D) {
        const rectGeom = <RectangleGeometryComponent>this.gameObject.getComponent("RectangleGeometryComponent");
        if (rectGeom) {
            // draw rect
        }
    }
}

export class RectangleGeometryComponent extends Component {
    public width: number;
    public height: number;
    constructor(gameObject: GameObject, w: number, h: number) {
        super(gameObject);
        this.width = w;
        this.height = h;
    }
}
