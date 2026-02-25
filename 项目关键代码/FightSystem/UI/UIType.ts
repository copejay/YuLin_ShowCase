

export type UIFloatText={
    x:number;
    y:number;
    text:string;
    type:string;

}

export type HitEffect={
    x:number;
    y:number;
    EffectName:string;
    EffectType:string;
}

export type UIFightRole={
    x:number;
    y:number;
    name:string;
    classType:string;
    classTypeNum:number;

    level:number;
    Hp:number;
    maxHp:number;

    side:"left"|"right";


}