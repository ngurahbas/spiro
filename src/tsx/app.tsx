import * as React from "react"

export interface MainFormProps {
    staticCircleRadius: number;
}

export const MainForm = (props: MainFormProps) => {
    return (
        <form action="">
            <label htmlFor="staticCircleRadius">Static circle radius</label>
            <input name="staticCircleRadius" type="text" value={props.staticCircleRadius} />
        </form>
    );
};