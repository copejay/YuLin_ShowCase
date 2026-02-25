
import type {site} from '../DomainType';

import type { DomainFightRoleInfo } from "../DomainType";
const SitePool: site[] = [
    {x:1,y:1},{x:2,y:1},{x:3,y:1},
    {x:1,y:2},{x:2,y:2},{x:3,y:2},
    {x:1,y:3},{x:2,y:3},{x:3,y:3},
];
const EnemyBaseMap: Record<string, any> = {
    wolf: {
        name: "野狼",
        classType: "beast",
        classTypeNum: 1,

        baseHp: 120,
        baseMp: 30,
        baseAtk: 25,
        baseDef: 10,
        baseSpeed: 18,
    },

    demon: {
        name: "恶魔",
        classType: "demon",
        classTypeNum: 1,

        baseHp: 180,
        baseMp: 80,
        baseAtk: 35,
        baseDef: 18,
        baseSpeed: 12,
    },
    bug: {
        name: "虫子",
        classType: "bug",
        classTypeNum: 1,

        baseHp: 80,
        baseMp: 20,
        baseAtk: 15,
        baseDef: 5,
        baseSpeed: 20,
    }
};

type LevelRate = {
    hp: number;
    mp: number;
    atk: number;
    def: number;
    speed: number;
};

const LevelRateTable: Record<number, LevelRate> = {
    1: { hp: 1.0, mp: 1.0, atk: 1.0, def: 1.0, speed: 1.0 },
    2: { hp: 1.3, mp: 1.2, atk: 1.2, def: 1.2, speed: 1.05 },
    3: { hp: 1.6, mp: 1.4, atk: 1.4, def: 1.4, speed: 1.1 },
    4: { hp: 2.0, mp: 1.7, atk: 1.7, def: 1.7, speed: 1.15 },
    5: { hp: 2.6, mp: 2.0, atk: 2.1, def: 2.0, speed: 1.2 },
};

function pickSites(count: number): site[] {
    const pool = [...SitePool];

    // 洗牌
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    return pool.slice(0, count);
}

export class Enemy{


    constructor(){

    }

    createEnemy(type: string, level: number, site: site): DomainFightRoleInfo {
        const base =EnemyBaseMap[type] ??
        (console.warn(`Enemy type not found: ${type}, fallback to bug`),
        EnemyBaseMap["bug"]);

        const rate = LevelRateTable[level] ?? LevelRateTable[1];
        return {
            name: base.name,
            classType: base.classType,
            classTypeNum: base.classTypeNum,

            hp: Math.floor(base.baseHp * rate.hp),
            mp: Math.floor(base.baseMp * rate.mp),

            atk: Math.floor(base.baseAtk * rate.atk),
            def: Math.floor(base.baseDef * rate.def),

            speed: Math.floor(base.baseSpeed * rate.speed),

            hpAdd: 0,
            mpAdd: 0,

            site,
        };
    }

    createEnemyGroup(type: string, level: number): DomainFightRoleInfo[] {

        // 数量：2~5
        const count = Math.floor(Math.random() * 4) + 2;

        const sites = pickSites(count);

        const enemies: DomainFightRoleInfo[] = [];

        for (let i = 0; i < count; i++) {

            const enemy = this.createEnemy(
                type,
                level,
                sites[i]
            );

            enemies.push(enemy);
        }

        return enemies;
    }

    createRandomEnemyGroup(level: number): DomainFightRoleInfo[] {

        // 所有可用类型
        const types = Object.keys(EnemyBaseMap);

        // 数量：2~5
        const count = Math.floor(Math.random() * 4) + 2;

        // 随机位置
        const sites = pickSites(count);

        const enemies: DomainFightRoleInfo[] = [];

        for (let i = 0; i < count; i++) {

            // 随机一个类型
            const type =
                types[Math.floor(Math.random() * types.length)];

            const enemy = this.createEnemy(
                type,
                level,
                sites[i]
            );

            enemies.push(enemy);
        }

        return enemies;
    }


}