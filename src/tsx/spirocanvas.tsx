import * as React from "react";
import { CanvasController } from "../ts/canvas";
import { Spiro } from "../ts/data";

interface SpiroCanvasProps{
    canvasWidth?: number;
}

export class SpiroCanvas extends React.Component<SpiroCanvasProps> {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    
    canvasController: CanvasController;
    
    constructor(props: SpiroCanvasProps) {
        super(props);
        this.canvasRef = React.createRef();
        this.canvasRef.current
    }

    animateInCanvas(spiro: Spiro) {
        console.log("animate in canvas", spiro);
    }

    renderInCanvas(spiro: Spiro) {
        console.log("render in canvas", spiro);
    }

    render() {
        return (
            <canvas width={this.props.canvasWidth} height={this.props.canvasWidth} ref={this.canvasRef}></canvas>
        );
    }
}
