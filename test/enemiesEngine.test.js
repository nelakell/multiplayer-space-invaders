import * as ee from "../modules/enemiesEngine.js";
import EnemiesEngine from "../modules/enemiesEngine.js";


test('new value respects boundaries', () =>{
    let enemiesEngine = new EnemiesEngine();
    let res = enemiesEngine.respectBoundaries(1,0,5);
    expect(res).toBe(1);
})

test('new value exceeds min boundaries', () =>{
    let enemiesEngine = new EnemiesEngine();
    let res = enemiesEngine.respectBoundaries(-1,0,5);
    expect(res).toBe(0);
})

test('new value exceeds max boundaries', () =>{
    let enemiesEngine = new EnemiesEngine();
    let res = enemiesEngine.respectBoundaries(6,0,5);
    expect(res).toBe(5);
})
