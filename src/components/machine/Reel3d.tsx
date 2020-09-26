import * as React from "react";
import { observer } from "mobx-react"

import "./Reel3d.css";
import { REEL_ORIG } from "../../state/consts";
import { GamePhase } from "../../state/types";

export interface ReelProps {
  shift: number;
  index?: number;
  spinProgress?: number;
  phase: GamePhase;
  spinRandomizer: number;
  machineRotateDeg: any;
  winningLine: "top" | "bottom" | "center" | undefined;
}

@observer
export class Reel3d extends React.Component<ReelProps, {}> {

  private getSegment(i: number) {
    return REEL_ORIG[Math.round((i) / 3) - 1];
  }

  public render() {
    const { shift,
      index = 0,
      spinProgress = 0,
      spinRandomizer,
      machineRotateDeg,
      winningLine } = this.props;
    const segmentCount = 15;

    const goldS = 1.56;

    const segments = new Array(segmentCount);

    for (let i = 1; i <= segmentCount; i++) {
      const style: React.CSSProperties = {
        transform: `rotateY(${i * 360 / segmentCount}deg) translateZ(${segmentCount * goldS}em`,
        backgroundPositionX: (i % 3 === 0) ? "100%" : undefined,
      };

      const segment = <div
        key={`${i}segment`}
        style={style}
        className={(i % 3 === 1) ? "devider" : "seg" + this.getSegment(i)}
      />;

      segments[i - 1] = segment;
    }
    const shiftStyle: React.CSSProperties = {
      transform: `rotateY(${shift * 36 + 154 + (-360 * spinRandomizer * spinProgress)}deg)`,
      transition: `transform ${spinProgress < 0.25 ? spinProgress * 1 : spinProgress * (index + 1) * 0.5}s`,
    };

    const mStyle = {
      transform: `rotateY(${machineRotateDeg.x}deg) rotateX(${-machineRotateDeg.y}deg)`,
    }

    return <div className="m" style={mStyle}>
      <div className="frame">
        <div className={"strip"} style={shiftStyle}>
          {segments}
        </div>
      </div>
      <div className={"reelFrame" + (winningLine !== undefined ? " win" : "")} />
      <div className={"top line " + (winningLine == "top" ? "visible" : "")} />
      <div className={"center line " + (winningLine == "center" ? "visible" : "")} />
      <div className={"bottom line " + (winningLine == "bottom" ? "visible" : "")} />
    </div >;
  }
}