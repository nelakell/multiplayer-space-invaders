import Laser from '../modules/laser.js'

test('laser boundaries exceeded', () => {
    let laser = new Laser();
    expect(laser.respectBoundaries(-1, 0)).toBe(false)
})

test('laser boundaries complied', () => {
    let laser = new Laser();
    expect(laser.respectBoundaries(5, 0)).toBe(true)
})