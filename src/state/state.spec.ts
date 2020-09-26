import { RESULT_DELAY, SPIN_DURATION } from "./consts";
import { GameState } from "./state";
import { GamePhase } from "./types";

describe("state", () => {
    afterEach(() => {
        jest.useRealTimers();
    });

    it("should correctly init game", () => {
        const state = new GameState();
        expect(state.balance).toBe(100);
        expect(state.gamePhase).toBe(GamePhase.BetTime);
    });

    it("should insert coin", () => {
        const state = new GameState();
        expect(state.balance).toBe(100);
        state.insertCoin();
        expect(state.balance).toBe(101);
    });

    it("should not spin if balance <= 0", () => {
        const state = new GameState();
        state.balance = 0;
        expect(state.gamePhase).toBe(GamePhase.BetTime);
        state.spin();
        expect(state.gamePhase).toBe(GamePhase.BetTime);

        state.insertCoin();
        state.spin();
        expect(state.gamePhase).toBe(GamePhase.Spining);
    });

    it("should retun correct amount and win line", () => {
        jest.useFakeTimers();
        const state = new GameState();
        state.fixedPos = [
            { s: "7", p: "center" },
            { s: "7", p: "center" },
            { s: "CHERRY", p: "center" },
        ];
        state.debug();

        state.patternMatch()
        expect(state.patternMatch().amount).toBe(0);
        expect(state.patternMatch().winLine).toBeUndefined();

        jest.advanceTimersByTime(SPIN_DURATION);

        expect(state.patternMatch().amount).toBe(75);
        expect(state.patternMatch().winLine).toBe("center");
    });

    it("spin flow", () => {
        jest.useFakeTimers();
        const state = new GameState();
        expect(state.balance).toBe(100);
        expect(state.gamePhase).toBe(GamePhase.BetTime);
        state.fixedPos = [
            { s: "CHERRY", p: "top" },
            { s: "CHERRY", p: "top" },
            { s: "CHERRY", p: "top" },
        ];
        state.debug();
        expect(state.balance).toBe(99);
        expect(state.gamePhase).toBe(GamePhase.Spining);

        jest.advanceTimersByTime(SPIN_DURATION / 2);
        expect(state.gamePhase).toBe(GamePhase.Spining);
        expect(state.balance).toBe(99);

        jest.advanceTimersByTime(SPIN_DURATION / 2);
        expect(state.gamePhase).toBe(GamePhase.ResultReveal);

        jest.advanceTimersByTime(RESULT_DELAY);

        expect(state.balance).toBe(2099);
        expect(state.gamePhase).toBe(GamePhase.BetTime);
    });
});
