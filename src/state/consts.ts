import { ReelPayout as Payout, Symbol } from "./types";

const interleave = (arr: any[], thing: any) => [].concat(...arr.map(n => [n, thing]));

export const SPIN_DURATION = 2000;
export const RESULT_DELAY = 1500;

export const REEL_ORIG: Symbol[] = ["3xBAR", "BAR", "2xBAR", "7", "CHERRY"];

export const REEL: Symbol[] = interleave([...REEL_ORIG].reverse(), "*");

export const PAYOUTS: Payout[] = [
    {
        amount: 2000,
        pattern: [
            ["CHERRY", "CHERRY", "CHERRY"],
            ["*", "*", "*"],
            ["*", "*", "*"],
        ],
        type: "cherry",
    },
    {
        amount: 1000,
        pattern: [
            ["*", "*", "*"],
            ["CHERRY", "CHERRY", "CHERRY"],
            ["*", "*", "*"],
        ],
        type: "cherry",
    },
    {
        amount: 4000,
        pattern: [
            ["*", "*", "*"],
            ["*", "*", "*"],
            ["CHERRY", "CHERRY", "CHERRY"],
        ],
        type: "cherry",
    },
    {
        amount: 150,
        pattern: ["7", "7", "7"],
        type: "full",
    },
    {
        amount: 75,
        pattern: ["7", "CHERRY"],
        type: "any",
    },
    {
        amount: 50,
        pattern: ["3xBAR", "3xBAR", "3xBAR"],
        type: "full",
    },
    {
        amount: 20,
        pattern: ["2xBAR", "2xBAR", "2xBAR"],
        type: "full",
    },
    {
        amount: 10,
        pattern: ["BAR", "BAR", "BAR"],
        type: "full",
    },
    {
        amount: 5,
        pattern: ["3xBAR", "2xBAR", "BAR"],
        type: "any",
    },
]


export const CherryPayouts = [
    {
        amount: 2000,
        pattern: [
            ["CHERRY", "CHERRY", "CHERRY"],
            ["*", "*", "*"],
            ["*", "*", "*"],
        ],
    },
    {
        amount: 1000,
        pattern: [
            ["*", "*", "*"],
            ["CHERRY", "CHERRY", "CHERRY"],
            ["*", "*", "*"],
        ],
    },
    {
        amount: 4000,
        pattern: [
            ["*", "*", "*"],
            ["*", "*", "*"],
            ["CHERRY", "CHERRY", "CHERRY"],
        ],
    },
];

export const FullLinePayouts = [
    {
        amount: 150,
        pattern: ["7", "7", "7"],
    },
    {
        amount: 50,
        pattern: ["3xBAR", "3xBAR", "3xBAR"],
    },
    {
        amount: 20,
        pattern: ["2xBAR", "2xBAR", "2xBAR"],
    },
    {
        amount: 10,
        pattern: ["BAR", "BAR", "BAR"],
    },
];

export const LinePayouts = [
    {
        amount: 75,
        pattern: ["7", "CHERRY"],
    },
    {
        amount: 5,
        pattern: ["3xBAR", "2xBAR", "BAR"],
    },
];
