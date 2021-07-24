import * as React from "react"

export interface MainFormProps {
    staticCircleRadius?: number;
    innerCircleRadius?: number;
    innerCircleMidToPen?: number;
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
        console.log('(event) = ', event.currentTarget.value);
        this.setState({ staticCircleRadius: parseInt(event.currentTarget.value) });
    }

    render() {
        return (
            <form action="">
                <div className="input-row">
                    <div className="input-label">
                        <label htmlFor="staticCircleRadius">Static circle radius</label>
                    </div>
                    <div className="input-value">
                        <input name="staticCircleRadius" type="number" value={this.state.staticCircleRadius} onChange={this.handleChange} />
                        <span>{this.state.staticCircleRadius}</span>
                    </div>
                </div>
                <div className="input-row">
                    <div className="input-label">
                        <label htmlFor="innerCircleRadius">Inner circle radius</label>
                    </div>
                    <div className="input-value">
                        <input name="innerCircleRadius" type="number" value={this.props.innerCircleRadius} />
                    </div>
                </div>
                <div className="input-row">
                    <div className="input-label">
                        <label htmlFor="innerCircleMidToPen">Pen distance</label>
                    </div>
                    <div className="input-value">
                        <input name="innerCircleMidToPen" type="number" value={this.props.innerCircleMidToPen} />
                    </div>
                </div>
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