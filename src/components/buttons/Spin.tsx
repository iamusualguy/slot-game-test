import * as React from "react";
import { observer } from "mobx-react"


import "./Spin.css";
import { GameState } from "../../state/state";
import { GamePhase } from "../../state/types";

export interface SpinButtonProps {
    state: GameState;
}

@observer
export class SpinButton extends React.Component<SpinButtonProps, {}> {
    public render() {
        const { state } = this.props;
        const classNames = ["spinButton", (state.gamePhase == GamePhase.BetTime && state.balance > 0 ? "active" : "inactive")]
        return <div
            className={classNames.join(" ")}
            onClick={() => { state.gamePhase == GamePhase.BetTime && state.balance > 0 && state.spin() }}
        > SPIN </div>
    }
}
