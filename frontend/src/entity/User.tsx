export type User = {
    socket: any,
    id: number,
    playerState: PlayerState
};

export type PlayerState = {
    name: string,
    fighter: string,
    language: string,
    ready: boolean,
    gameState: PlayerGameState
}

export type PlayerGameState = {
    xPos: number,
    yPos: number,
    lasers: any,
    bonus: any,
    score: number,
    lives: number,
    level: number,
    lastShot: number
}
