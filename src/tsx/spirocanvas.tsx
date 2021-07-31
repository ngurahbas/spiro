import * as React from "react";

interface SpiroCanvasProps {
    staticR: number;
    rotatingR: number;
    rotatingMidR: number;
    canvasWidth: number;
}

export class SpiroCanvas extends React.Component<SpiroCanvasProps> {
    canvas: React.Ref<HTMLCanvasElement>;
    
    constructor(props: SpiroCanvasProps) {
        super(props);
    }

    render() {
        return (
            <canvas width={this.props.canvasWidth} height={this.props.canvasWidth} ref={this.canvas}></canvas>
        );
    }
}
