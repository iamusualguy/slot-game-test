import * as React from "react";
import { observer } from "mobx-react"


import "./DebugPanel.css";
import { GameState } from "../state/state";
import { toJS } from "mobx";

export interface DebugPanelProps {
    state: GameState;
}

@observer
export class DebugPanel extends React.Component<DebugPanelProps, {}> {

    private balanceChange(ev: React.ChangeEvent) {
        this.props.state.balance = (ev.target as any).value || 1;
    }

    private reelSChange(ev: React.ChangeEvent, idx: number) {
        this.props.state.fixedPos[idx].s = (ev.target as any).value;
    }

    private reelPChange(ev: React.ChangeEvent, idx: number) {
        this.props.state.fixedPos[idx].p = (ev.target as any).value;
    }

    public render() {
        const { state } = this.props;
        return <div className="debugPanel">
            balance:    {state.gamePhase}
            <br />
            balance: <br /> <input
                type="number"
                value={toJS(state.balance)}
                min="1"
                max="5000"
                onChange={(ev) => this.balanceChange(ev)} />
            <br />
            reel positions:<br />
            <select onChange={(ev) => this.reelSChange(ev, 0)}>
                <option value="3xBAR">3xBAR</option>
                <option value="BAR">BAR</option>
                <option value="2xBAR">2xBAR</option>
                <option value="7">7</option>
                <option value="CHERRY">CHERRY</option>
            </select>
            <select onChange={(ev) => this.reelPChange(ev, 0)}>
                <option value="top">top</option>
                <option value="center">center</option>
                <option value="bottom">bottom</option>
            </select>

            <select onChange={(ev) => this.reelSChange(ev, 1)}>
                <option value="3xBAR">3xBAR</option>
                <option value="BAR">BAR</option>
                <option value="2xBAR">2xBAR</option>
                <option value="7">7</option>
                <option value="CHERRY">CHERRY</option>
            </select>
            <select onChange={(ev) => this.reelPChange(ev, 1)}>
                <option value="top">top</option>
                <option value="center">center</option>
                <option value="bottom">bottom</option>
            </select>

            <select onChange={(ev) => this.reelSChange(ev, 2)}>
                <option value="3xBAR">3xBAR</option>
                <option value="BAR">BAR</option>
                <option value="2xBAR">2xBAR</option>
                <option value="7">7</option>
                <option value="CHERRY">CHERRY</option>
            </select>
            <select onChange={(ev) => this.reelPChange(ev, 2)}>
                <option value="top">top</option>
                <option value="center">center</option>
                <option value="bottom">bottom</option>
            </select>

            <input type="button" value="debug spin" onClick={() => state.debug()}/>
        </div>
    }
}
