import './Hero.css'

import DMG_MODEL_2 from '../../res/kenney/PNG/Damage/playerShip1_damage2.png'
import DMG_MODEL_3 from '../../res/kenney/PNG/Damage/playerShip1_damage3.png'

const DamageModel = (props) => {
    let dmgModel;
    if (props.lives === 2) {
        dmgModel = DMG_MODEL_2;
    } else if (props.lives === 1) {
        dmgModel = DMG_MODEL_3;
    }
    if (dmgModel !== undefined) {
        return (
            <div >
                <img className={'damagemodel'}
                    src={dmgModel}
                    alt={"damagemodel"}
                    style={{left: props.xPos, top: props.yPos}}/>
            </div>
        )
    } else {
        return null;
    }
}

export default DamageModel;