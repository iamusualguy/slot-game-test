import { action, computed, observable } from "mobx"
import { now } from "mobx-utils";
import { PAYOUTS, REEL, RESULT_DELAY, SPIN_DURATION } from "./consts"
import { GamePhase, ReelShifts, Symbol } from "./types";

const trans = (b: any[][]) => {
    for (var d = b.length, a = 0; a < d; a++)
        for (var c = a + 1; c < d; c++) {
            var e = b[a][c];
            b[a][c] = b[c][a];
            b[c][a] = e;
        }
    return b
};

const flat = (array: any[][]) => {
    return array.reduce((acc, val) => acc.concat(val), []);
}

export class GameState {
    @observable
    public balance = 0

    @observable
    public reelShifts: ReelShifts = [0, 0, 0];

    @observable
    public spinRandomizer: number[] = [0, 0, 0];

    @observable
    public gamePhase: GamePhase = GamePhase.BetTime;

    @observable
    public winningLine: "top" | "bottom" | "center" | undefined = undefined;

    @observable
    public fixedPos = [
        { s: "3xBAR" as Symbol, p: "top" },
        { s: "3xBAR" as Symbol, p: "top" },
        { s: "3xBAR" as Symbol, p: "top" },
    ];

    @observable
    public currenPatternIdx: number | undefined;

    @observable
    private machineRotateX: number = 0;

    @observable
    private machineRotateY: number = 0;

    @observable
    private spinTimestamp: number | undefined;

    constructor() {
        this.reelShifts = this.reelShifts.map(() => Math.floor(Math.random() * REEL.length)) as ReelShifts;
        this.balance = 100;
    }

    @computed
    public get visibleReels(): Symbol[][] {
        return this.reelShifts.map(c => {
            return [...REEL.slice(c), ...REEL.slice(0, c)].slice(3, 6);
        });
    }

    @computed
    public get spinProgress(): number {
        if (this.spinTimestamp !== undefined) {
            const startTime = this.spinTimestamp;
            const timePassed = Math.max(0, now("frame") - startTime);
            if (timePassed > 0) {
                return Math.min(1, timePassed / SPIN_DURATION);
            }
        }
        return 1;
    }

    @computed
    public get machineRotateDeg() {
        return { x: this.machineRotateX, y: this.machineRotateY };
    }

    @action.bound
    public insertCoin() {
        this.balance++;
    }

    @action.bound
    public mouseTrack(x: number, y: number, width: number, height: number) {
        this.machineRotateX = Math.floor(10 * (x - width / 2) / width * 2);
        this.machineRotateY = Math.floor(10 * (y - height / 2) / height * 2);
    }

    @action.bound
    public spin(debug: boolean = false) {
        if (this.balance > 0 && this.gamePhase === GamePhase.BetTime) {
            this.balance--;

            this.winningLine = undefined;
            this.currenPatternIdx = undefined;

            this.spinTimestamp = now("frame");

            this.spinRandomizer = this.spinRandomizer.map(() => Math.floor(Math.random() * 4) + 4);

            this.gamePhase = GamePhase.Spining;

            setTimeout(
                () => {
                    this.spinTimestamp = undefined;
                    this.gamePhase = GamePhase.ResultReveal;
                    if (debug) {
                        this.reelShifts = this.reelShifts.map((_, idx) => {
                            switch (this.fixedPos[idx].p) {
                                case "top":
                                    return (REEL.indexOf(this.fixedPos[idx].s) + 7) % REEL.length;
                                case "center":
                                    return (REEL.indexOf(this.fixedPos[idx].s) + 6) % REEL.length;
                                case "bottom":
                                    return (REEL.indexOf(this.fixedPos[idx].s) + 5) % REEL.length;
                            }
                        }) as ReelShifts;
                    } else {
                        this.reelShifts = this.reelShifts.map(() => Math.floor(Math.random() * REEL.length)) as ReelShifts;
                    }

                    const patternMatch = this.patternMatch();

                    this.winningLine = patternMatch.winLine;

                    setTimeout(() => {
                        this.gamePhase = GamePhase.BetTime;
                        this.balance += patternMatch.amount;
                        this.currenPatternIdx = patternMatch.patternIdx;
                    }, RESULT_DELAY);
                },
                SPIN_DURATION,
            );
        }
    }

    @action.bound
    public debug() {
        this.spin(true)
    }

    @action.bound
    public patternMatch() {
        const tempView = trans(JSON.parse(JSON.stringify(this.visibleReels)));
        const flatView = flat(tempView);

        for (let i = 0; i < PAYOUTS.length; i++) {
            const payout = PAYOUTS[i];
            if (payout.type == "cherry") {
                if (flat(payout.pattern).filter((c, idx) => c !== flatView[idx]).every(c => c === "*")) {
                    return { amount: payout.amount, patternIdx: i, winLine: this.getLineName(i) };//payout.amount;
                }
            } else if (payout.type == "full") {
                for (let idx = 0; idx < tempView.length; idx++) {
                    const l = tempView[idx];
                    if (l.join() === payout.pattern.join()) {
                        return { amount: payout.amount, patternIdx: i, winLine: this.getLineName(idx) };//payout.amount;
                    }
                }
            } else if (payout.type == "any") {
                for (let idx = 0; idx < tempView.length; idx++) {
                    const l = tempView[idx];
                    if (l.every(c => payout.pattern.indexOf(c) > -1)) {
                        return { amount: payout.amount, patternIdx: i, winLine: this.getLineName(idx) };//payout.amount;
                    }
                }
            }
        }
        return { amount: 0, patternIdx: -1, winLine: undefined };
    }

    private getLineName(n: number): "top" | "bottom" | "center" {
        return n === 0 ? "top" : n === 1 ? "center" : "bottom";
    }

}