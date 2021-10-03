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
        let name = event.currentTarget.name;
        let type = event.currentTarget.type;
        let value = type == "number" && event.currentTarget.value != ""
            ? parseInt(event.currentTarget.value) : event.currentTarget.value;
        this.setState({ ...this.state, [name]: value });
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <NumberEntry name="staticR" label="Static circle radius"
                    value={this.state.staticR} onChange={this.handleChange} />
                <NumberEntry name="rotatingR" label="Inner circle radius"
                    value={this.state.rotatingR} onChange={this.handleChange} />
                <NumberEntry name="rotatingMidR" label="Pen distance"
                    value={this.state.rotatingMidR} onChange={this.handleChange} />
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
    onChange: { (event: React.FormEvent<HTMLSelectElement>): void; };
}

function NumberEntry(props: NumberEntryProps) {
    return (
        <div className="input-row">
            <div className="input-label">
                <label htmlFor={props.name}>{props.label}</label>
            </div>
            <select className="input-value" name={props.name} value={props.value} onChange={props.onChange}>
                {
                    arrRange(100, 500, 10).map((value, index) =>
                        <option key={value} value={value} label={value.toString()} />)
                }
            </select>
        </div>
    );
}

function arrRange(min: number, max: number, interval: number): number[] {
    let length = Math.floor((max - min) / interval) + 1;
    return Array(length).fill(min).map((value, idx) => value + idx * interval);
}