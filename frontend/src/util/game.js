export function rectsIntersect(rect1, rect2) {
    return !(
        rect2.left > rect1.right ||
        rect2.right < rect1.left ||
        rect2.top > rect1.bottom ||
        rect2.bottom < rect1.top
    );
}

export function ensureBoundaries(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

export const createKey = () => {
    return Date.now() + '_' + Math.floor(Math.random() * (100000 - 1 + 1) + 1)
}