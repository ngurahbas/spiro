import * as React from "react"

export interface MainFormProps {
    staticCircleRadius: number;
}

export const MainForm = (props: MainFormProps) => {
    return (
        <form action="">
            <div className="input-row">
                <div className="input-label">
                    <label htmlFor="staticCircleRadius">Static circle radius</label>
                </div>
                <div className="input-value">
                    <input name="staticCircleRadius" type="text" value={props.staticCircleRadius} />
                </div>
            </div>
        </form>
    );
};