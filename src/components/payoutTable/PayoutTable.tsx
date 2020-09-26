import * as React from "react";
import { observer } from "mobx-react"
import { PAYOUTS } from "../../state/consts";
import { ReelPayout } from "../../state/types";

import "./PayoutTable.css";

export interface PayoutTableProps {
  pattern: number | undefined;
}

@observer
export class PayoutTable extends React.Component<PayoutTableProps, {}> {
  private XXX(payout: ReelPayout) {
    const segments = new Array();

    if (payout.type == "full" || payout.type == "any") {
      for (let i = 0; i < payout.pattern.length; i++) {
        const segment = <div
          key={`${i}segment`}
          className={"payoutIcon seg" + payout.pattern[i]}
        />;
        segments.push(segment);
      }
    } else {
      for (let i = 0; i < 3; i++) {
        const segment = <div
          key={`${i}segment`}
          className={"payoutIcon segCHERRY"}
        />;
        segments.push(segment);
      }
    }

    return <div className="payoutLine">{segments} </div>;

  }
  public render() {
    const getPatternLabel = (idx: number) => {
      switch (idx) {
        case 0: return "on TOP LINE";
        case 1: return "on CENTER LINE";
        case 2: return "on BOTTOM LINE";
        case 4:
        case 8:
          return "any combination on ANY LINE";
        default:
          return "on ANY LINE";
      }
    }

    return <div className={"payoutTable"}>{PAYOUTS.map((payout, idx) =>
      <div key={idx} className={"payoutEntry" + (this.props.pattern === idx ? " win" : "")}>
        <div className="patternAmount">¢{payout.amount} </div>
        {this.XXX(payout)}
        <div className="patternLabel">{getPatternLabel(idx)} </div>

      </div>
    )}</div >;
  }
}