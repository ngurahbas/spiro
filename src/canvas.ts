export interface CanvasReference {
    width: number;
    height: number;
    context: RenderingContext;
}

export class CanvasController implements CanvasReference{
    width: number;
    height: number;
    context: RenderingContext;

    get midX(): number {
        return this.width / 2;
    }

    get midY(): number {
        return this.height / 2;
    }

    constructor(element: HTMLCanvasElement) {
        this.width = element.width;
        this.height = element.height;
        this.context = element.getContext("2d");
    }
}
