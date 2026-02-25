


export class BattleTime {
    static speed = 1; // 1x / 2x / 4x

    static setSpeed(v: number) {
        BattleTime.speed = v;
    }

    static scale(t: number) {
        return t / BattleTime.speed;
    }
}


export function battleDelay(ms: number) {
    return new Promise<void>(resolve => {
        setTimeout(resolve, BattleTime.scale(ms));
    });
}
