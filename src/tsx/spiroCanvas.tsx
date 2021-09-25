import * as React from "react";
import { CanvasController } from "../ts/canvas";
import { Spiro } from "../ts/data";

interface SpiroCanvasAttr {
    canvasWidth?: number;
}

export class SpiroCanvas extends React.Component<SpiroCanvasAttr, SpiroCanvasAttr> {
    canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

    canvasController: CanvasController;

    constructor(props: SpiroCanvasAttr) {
        super(props);
        this.state = {...props};
    }

    componentDidMount() {
        this.canvasController = new CanvasController(this.canvasRef.current);
    }

    animateInCanvas(spiro: Spiro) {
        this.setState({canvasWidth: spiro.canvasWidth});
        if (!this.canvasController)  {
            return;
        }
        this.canvasController.startAnimation(spiro);
    }

    renderInCanvas(spiro: Spiro) {
        this.setState({canvasWidth: spiro.canvasWidth});
        if (!this.canvasController)  {
            return;
        }
        this.canvasController.startRender(spiro);
    }

    render() {
        return (
            <canvas width={this.state.canvasWidth} height={this.state.canvasWidth} ref={this.canvasRef}></canvas>
        );
    }
}
