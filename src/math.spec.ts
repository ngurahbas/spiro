import assert = require("assert");
import { sinByRev, cosByRev } from "./math";

describe("trigonometry constraint", () => {
    let x = Math.random();
    describe("sinByRev(i+x)", () => {
        it("should always return close to equal values for every i+x where i is integer and x is real number between 0 and 1", () => {
            let refSinValue = sinByRev(x);
            let tolerance = 0.000_000_001;
            for (let i = 1; i <= 10; i++) {
                assert(Math.abs(refSinValue - sinByRev(i + x)) < tolerance, "i = " + i);
            }
        });
    });
    describe("cosByRev(i+x)", () => {
        it("should always return close to equal values for every i+x where i is integer and x is real number between 0 and 1", () => {
            let refCosValue = cosByRev(x);
            let tolerance = 0.000_000_001;
            for (let i = 1; i <= 10; i++) {
                assert(Math.abs(refCosValue - cosByRev(i + x)) < tolerance, "i = " + i);
            }
        });
    });
});