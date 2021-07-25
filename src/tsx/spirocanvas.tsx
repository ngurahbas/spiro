import * as React from "react";

interface SpiroCanvasProps extends SpiroCanvasState { }

interface SpiroCanvasState {
    staticCircleRadius: number;
    innerCircleRadius: number;
    innerCircleMidToPen: number;
}

export class SpiroCanvas extends React.Component<SpiroCanvasProps, SpiroCanvasState> {
    constructor(props: SpiroCanvasProps) {
        super(props);
        this.state = {
            staticCircleRadius: props.staticCircleRadius,
            innerCircleRadius: props.innerCircleRadius,
            innerCircleMidToPen: props.innerCircleMidToPen,
        }
    }

    render() {

        return (
            <canvas width="2048" height="2048"></canvas>
        );
    }
}
