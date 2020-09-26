import * as React from "react";
import { observer } from "mobx-react"


import "./Coin.css";
import { GameState } from "../../state/state";
import { GamePhase } from "../../state/types";

export interface CoinButtonProps {
    state: GameState;
}

@observer
export class CoinButton extends React.Component<CoinButtonProps, {}> {
    public render() {
        const { state } = this.props;
        const classNames = ["coinButton", (state.gamePhase == GamePhase.BetTime ? "active" : "inactive")]
        return <div
            className={classNames.join(' ')}
            onClick={() => { state.gamePhase == GamePhase.Spining || state.insertCoin() }}
        >₵</div>
    }
}
