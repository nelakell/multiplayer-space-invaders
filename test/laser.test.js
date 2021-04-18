import Laser from '../modules/laser.js'

test('boundaries exceeded', () => {
    let laser = new Laser();
    expect(laser.respectBoundaries(-1, 0)).toBe(0)
})

test('laser boundaries complied', () => {
    let laser = new Laser();
    expect(laser.respectBoundaries(5, 0)).toBe(5)
})