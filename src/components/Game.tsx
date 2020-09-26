import * as React from "react";
import { observer } from "mobx-react"
import { GameState } from "../state/state";

import "./Game.css";
import { PayoutTable } from "./payoutTable/PayoutTable";
import { Reel3d } from "./machine/Reel3d";
import { SpinButton } from "./buttons/Spin";
import { CoinButton } from "./buttons/Coin";
import { DebugPanel } from "./DebugPanel";

export interface GameProps {
  state: GameState;
}

@observer
export class Game extends React.Component<GameProps, {}> {

  private mouseMove(ev: MouseEvent) {
    this.props.state.mouseTrack(ev.pageX, ev.pageY, window.innerWidth, window.innerHeight);
  }

  public render() {
    const { state } = this.props;

    addEventListener('mousemove', (ev) => { this.mouseMove(ev) }, false);

    return <>
      <div id="balance">BALANCE: ₵{state.balance}</div>
      <div id="machine">
        {
          state.reelShifts.map((r, idx) =>
            <Reel3d
              key={`reel${idx}`}
              shift={r} index={idx}
              spinProgress={state.spinProgress}
              phase={state.gamePhase}
              spinRandomizer={state.spinRandomizer[idx]}
              machineRotateDeg={state.machineRotateDeg}
              winningLine={state.winningLine}
            />)
        }
      </div>
      <PayoutTable pattern={state.currenPatternIdx} />
      <SpinButton state={state} />
      <CoinButton state={state} />
      <DebugPanel state={state} />
    </>;
  }
}