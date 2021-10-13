import {rectsIntersect, respectBoundaries} from "../modules/game";

test('respect boundaries', () => {
    expect(respectBoundaries(1, 0, 5)).toBe(1);
})

test('exceed min boundaries', () => {
    expect(respectBoundaries(-1, 0, 5)).toBe(0);
})

test('exceed max boundaries', () => {
    expect(respectBoundaries(6, 0, 5)).toBe(5);
})

test('detect collision', () => {
    const r1 = {left: 0, right: 50, top: 0, bottom: 50};
    const r2 = {left: 25, right: 75, top: 25, bottom: 75};
    expect(rectsIntersect(r1, r2)).toBe(true);
})

test('ignore non-existent collision', () => {
    const r1 = {left: 0, right: 50, top: 0, bottom: 50};
    const r2 = {left: 100, right: 150, top: 100, bottom: 150};
    expect(rectsIntersect(r1, r2)).toBe(false);
})
