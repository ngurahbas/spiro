import * as React from "react";
import { Spiro } from "../ts/data";

export interface SpiroFormProps extends Spiro {
    animateAction?: { (spiro: Spiro): void };
    renderAction?: { (spiro: Spiro): void };
}

export class SpiroForm extends React.Component<SpiroFormProps, Spiro> {
    handleAnimate: { (): void };
    handleRender: { (): void };

    constructor(props: SpiroFormProps) {
        super(props);
        this.state = {
            ...props,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleAnimate = () => {
            props.animateAction({
                staticR: this.state.staticR,
                rotatingR: this.state.rotatingR,
                rotatingMidR: this.state.rotatingMidR,
                canvasWidth: 1024
            });
        };

        this.handleRender = () => {
            props.renderAction({
                staticR: this.state.staticR,
                rotatingR: this.state.rotatingR,
                rotatingMidR: this.state.rotatingMidR,
                canvasWidth: 1024
            });
        };
    }

    handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        let changeData: {[key: string]: any}  = {
            canvasWidth: this.state.canvasWidth,
            staticR: this.state.staticR,
            rotatingR: this.state.rotatingR,
            rotatingMidR: this.state.rotatingMidR,
        };

        let name = event.currentTarget.name;
        let type = typeof(event.currentTarget.value);
        let value = type == "number" && event.currentTarget.value != ""
            ? event.currentTarget.value : parseInt(event.currentTarget.value);
        changeData[name] = value;

        if (changeData.rotatingR >= changeData.staticR) {
            changeData.rotatingR = changeData.staticR - 10;
        }
        if (changeData.rotatingMidR >= changeData.rotatingR) {
            changeData.rotatingMidR = changeData.rotatingR - 10;
        }

        this.setState({...this.state, ...changeData});
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <NumberEntry name="staticR" label="Static circle radius"
                    value={this.state.staticR} onChange={this.handleChange}
                    range={arrRange(100, 500, 1)} />
                <NumberEntry name="rotatingR" label="Inner circle radius"
                    value={this.state.rotatingR} onChange={this.handleChange}
                    range={arrRange(50, this.state.staticR - 10, 1)} />
                <NumberEntry name="rotatingMidR" label="Pen distance"
                    value={this.state.rotatingMidR} onChange={this.handleChange}
                    range={arrRange(10, this.state.rotatingR - 10, 1)} />
                <div className="input-row">
                    <div className="input-label" />
                    <div className="input-value">
                        <button className="action-button" onClick={this.handleAnimate}>animate</button>
                        <button className="action-button" onClick={this.handleRender}>render</button>
                    </div>
                </div>
            </form>
        );
    }
}

interface NumberEntryProps {
    name: string;
    label: string;
    value: number;
    range: number[];
    onChange: { (event: React.FormEvent<HTMLSelectElement>): void; };
}

function NumberEntry(props: NumberEntryProps) {
    return (
        <div className="input-row">
            <div className="input-label">
                <label htmlFor={props.name}>{props.label}</label>
            </div>
            <div className="input-value">
                <select name={props.name} value={props.value} onChange={props.onChange}>
                    {
                        props.range.map((value, index) =>
                            <option key={value} value={value} label={value.toString()} />)
                    }
                </select>
            </div>
        </div>
    );
}

function arrRange(min: number, max: number, interval: number): number[] {
    let length = Math.floor((max - min) / interval) + 1;
    return Array(length).fill(min).map((value, idx) => value + idx * interval);
}