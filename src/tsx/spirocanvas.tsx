import * as React from "react";

interface SpiroCanvasProps extends SpiroCanvasState { }

interface SpiroCanvasState {
    staticR: number;
    rotatingR: number;
    rotatingMidR: number;
}

export class SpiroCanvas extends React.Component<SpiroCanvasProps, SpiroCanvasState> {
    canvas: React.Ref<HTMLCanvasElement>;
    
    constructor(props: SpiroCanvasProps) {
        super(props);
        this.state = {
            staticR: props.staticR,
            rotatingR: props.rotatingR,
            rotatingMidR: props.rotatingMidR,
        }
    }

    render() {
        let element = <canvas width="2048" height="2048" ref={this.canvas}></canvas>;
        return (
            element
        );
    }
}
