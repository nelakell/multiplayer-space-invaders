import Laser, {updateLaser} from './Laser';

function Lasers(props) {
    return (
        <div>
            {props.items.map((laser) => (
                <Laser key={laser.key} source={laser.source} xPos={laser.xPos} yPos={laser.yPos}/>
            ))}
        </div>
    );
}

export function updateLasers(lasers) {
    if (lasers == null) {
        return [];
    }
    let ls = []
    for (let i = 0; i < lasers.length; i++) {
        let l = updateLaser(lasers[i]);
        if (l !== undefined) ls.push(l);
    }
    return ls;
}

export default Lasers;