import * as ee from "../modules/enemiesEngine.js";
import EnemiesEngine from "../modules/enemiesEngine.js";


ee.respectBoundaries = jest.fn((x, y, z) => x + y + z);

test('update enemies', () => {
    let enemiesEngine = new EnemiesEngine();
    console.log(enemiesEngine.$enemiesContainer.style.transform)
    enemiesEngine.updateEnemies();
    console.log(enemiesEngine.$enemiesContainer.style.transform)
})
