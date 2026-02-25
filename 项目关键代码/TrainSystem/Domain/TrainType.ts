

export type RoleRow={
    id:string;
    baseInfo:RoleBaseInfo;
    spriteRoot:SpriteRoot;
    fightInfo:FightInfo;
    equipList:RoleEquip[];
    activeSkillList:RoleActiveSkill[];
    passiveSkillList:RolePassiveSkill[];
    fightSkillList:string[];
}

export type RoleBaseInfo={

    name:string;//姓名

    QiLevel: number;//练气等级
    QiExp: number;//练气经验
    TiLevel: number;//炼体等级
    TiExp: number;//炼体经验

    learnPoint: number;//领悟点
    classType: string;//种族
    classTypeNum: number;//种族内部序列
    talentID: string;//天赋
    talentLevel: number;//天赋强度
    lifeSpan: number;//生命周期
    birthData: number;//获取时间
}
export type RoleFightInfo={
    speed:number;//速度
    attack:number;//攻击
    defense:number;//防御
    hp:number;//生命值
    mp:number;//魔法值
    addHp:number;//额外生命值
    addMp:number;//额外魔法值
}

//灵根属性
export type SpriteRoot={
    金:number;//力量
    木:number;//速度
    水:number;//体质
    火:number;//智力
    土:number;
}

//四维属性
export type FightInfo={
    strong:number;//力量
    speed:number;//速度
    blood:number;//体质
    smart:number;//智力
}
export interface RoleEquip{
    id:string;
    level:number;
}
export interface RoleActiveSkill{
    id:string;
    level:number;
}
export interface RolePassiveSkill{
    id:string;
    level:number;
}

export type TalentType={
    name:string;
    describe:string;
    strong:string;
    speed:string;
    blood:string;
    smart:string;
}

export type DisplayFormationRole={
    name:string;
    site:{x:number,y:number};
}

export type FormationRole={
    id:string;
    site:{x:number,y:number};
}

export type TrainItem={
    name:string;
    describe:string;

    useTarget:string;
    act:string;
    num:number;
}