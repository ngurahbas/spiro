import * as React from "react";
import { CanvasController } from "../ts/canvas";
import { Spiro } from "../ts/data";

interface SpiroCanvasProps extends Spiro { }

export class SpiroCanvas extends React.Component<SpiroCanvasProps> {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    canvasController: CanvasController;
    
    constructor(props: SpiroCanvasProps) {
        super(props);
        this.canvasRef = React.createRef();
        this.canvasRef.current
    }

    componentDidMount() {
        this.canvasController = new CanvasController(this.canvasRef.current, this.props);
    }

    render() {
        return (
            <canvas width={this.props.canvasWidth} height={this.props.canvasWidth} ref={this.canvasRef}></canvas>
        );
    }
}
