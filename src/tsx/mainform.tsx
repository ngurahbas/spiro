import * as React from "react"

export interface MainFormProps {
    staticCircleRadius?: number;
    innerCircleRadius?: number;
    innerCircleMidToPen?: number;
}

export const MainForm = (props: MainFormProps) => {
    return (
        <form action="">
            <div className="input-row">
                <div className="input-label">
                    <label htmlFor="staticCircleRadius">Static circle radius</label>
                </div>
                <div className="input-value">
                    <input name="staticCircleRadius" type="number" value={props.staticCircleRadius} />
                </div>
            </div>
            <div className="input-row">
                <div className="input-label">
                    <label htmlFor="innerCircleRadius">Inner circle radius</label>
                </div>
                <div className="input-value">
                    <input name="innerCircleRadius" type="number" value={props.innerCircleRadius} />
                </div>
            </div>
            <div className="input-row">
                <div className="input-label">
                    <label htmlFor="innerCircleMidToPen">Pen distance</label>
                </div>
                <div className="input-value">
                    <input name="innerCircleMidToPen" type="number" value={props.innerCircleMidToPen} />
                </div>
            </div>
            <div className="input-row">
                <div className="input-label"/>
                <div className="input-value">
                    <button className="action-button">animate</button>
                    <button className="action-button">render</button>
                </div>
            </div>
        </form>
    );
};