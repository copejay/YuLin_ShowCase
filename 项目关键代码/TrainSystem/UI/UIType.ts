

// export type {DomainBagItem} from '../../BagSystem/Domain/BagType';
export type {RoleRow} from '../../GlobalService';

export type UIUseItem={
slotID:number,
name:string,
describe:string,

count:number,
}

//角色基础信息
export type UIRoleBaseInfo={
name:string,classType:string,classTypeNum:number
QiLevel:string,QiExp:string,
TiLevel:string,TiExp:string,
learnPoint:number,birthData:number,lifeSpan:number
}
export type UIRoleFightInfo={//用于战斗的四维属性
strong:number,speed:number,blood:number,smart:number
}
export type UIRoleBloodLineInfo={
name:string,describe:string,talentLevel:number,
strong:string,speed:string,blood:string,smart:string
}
export type UIRoleDaoTalentInfo={
    level:string,
    jin:string,
    mu:string,
    shui:string,
    huo:string,
    tu:string,
}

export type UIRoleCell={
    id:string,
    name:string,
    classType:string,
    classTypeNum:number,
    up:boolean,
    QiLevel:string,
    TiLevel:string,
}

//角色战斗时的属性
export type UIFightRoleInfo={
    speed:string,
    attack:string,
    defense:string,
    hp:string,
    mp:string,
    addHp:string,
    addMp:string,
}


export type UISkillInfo={
    id:string,
    name:string,
    quality:string,
    level:number,
}

export type SkillUpForgetInfo={
    skillName:string,
    skillLevel:number,
    skillUpNeed:number
}

export type DeleteRoleInfo={
    roleName:string,
    roleTalent:string,
    roleLevel:number,
}

export type FormationUpRole={
    name:string;
    site:{x:number,y:number};
}