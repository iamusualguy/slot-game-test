export type Symbol = "3xBAR" | "BAR" | "2xBAR"| "7"| "CHERRY" | "*";

export type ReelShifts = [number, number, number];

export interface AnyPayout {
    pattern: Symbol[];
    amount: number;
    type: "any";
}

export interface FullPayout {
    pattern: Symbol[];
    amount: number;
    type: "full";
}

export interface CherryPayout {
    pattern: Symbol[][];
    amount: number;
    type: "cherry";
}

export type ReelPayout = CherryPayout | FullPayout | AnyPayout;

export enum GamePhase {
    BetTime = "BetTime",
    Spining = "Spining",
    ResultReveal = "ResultReveal",
}