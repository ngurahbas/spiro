import * as React from "react"

export interface MainFormProps {
    staticCircleRadius?: number;
    innerCircleRadius?: number;
    innerCircleMidToPen?: number;
    animateAction?: { (): void };
    renderAction?: { (): void };
}

interface MainFormState extends MainFormProps { }


export class MainForm extends React.Component<MainFormProps, MainFormState> {

    constructor(props: MainFormProps) {
        super(props);
        this.state = {
            staticCircleRadius: props.staticCircleRadius,
            innerCircleRadius: props.innerCircleRadius,
            innerCircleMidToPen: props.innerCircleMidToPen,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        let value = event.currentTarget.type == "number" ? Number.parseInt(event.currentTarget.value) : event.currentTarget.value;
        let name = event.currentTarget.name;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form action="">
                <NumberEntry name="staticCircleRadius" label="Static circle radius"
                    value={this.state.staticCircleRadius} onChange={this.handleChange} />
                <NumberEntry name="innerCircleRadius" label="Inner circle radius"
                    value={this.state.innerCircleRadius} onChange={this.handleChange} />
                <NumberEntry name="innerCircleMidToPen" label="Pen distance"
                    value={this.state.innerCircleMidToPen} onChange={this.handleChange} />
                <div className="input-row">
                    <div className="input-label" />
                    <div className="input-value">
                        <button className="action-button">animate</button>
                        <button className="action-button">render</button>
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
    onChange: { (event: React.FormEvent<HTMLInputElement>): void; };
}

function NumberEntry(props: NumberEntryProps) {
    return (
        <div className="input-row">
            <div className="input-label">
                <label htmlFor={props.name}>{props.label}</label>
            </div>
            <div className="input-value">
                <input name={props.name} type="number" value={props.value} onChange={props.onChange} step={10} />
            </div>
        </div>
    );
}