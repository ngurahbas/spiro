import * as React from "react";
import { CanvasController } from "../ts/canvas";
import { Spiro } from "../ts/data";

interface SpiroCanvasProps {
    canvasWidth?: number;
}

export class SpiroCanvas extends React.Component<SpiroCanvasProps> {
    canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

    canvasController: CanvasController;

    constructor(props: SpiroCanvasProps) {
        super(props);
    }

    componentDidMount() {
        this.canvasController = new CanvasController(this.canvasRef.current);
    }

    animateInCanvas(spiro: Spiro) {
        if (!this.canvasController)  {
            return;
        }
        this.canvasController.startAnimation(spiro);
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
