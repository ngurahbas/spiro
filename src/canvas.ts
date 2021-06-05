export interface CanvasModel {
    width: number;
    height: number;
    context: RenderingContext;
}

export function getCanvasModel(canvasElement: HTMLCanvasElement): CanvasModel {
    return {
        width: canvasElement.width,
        height: canvasElement.height,
        context: canvasElement.getContext("2d")
    };
}