
export interface FightFormation{
    LeftFightInfo:DomainFightRoleInfo[];
    RightFightInfo:DomainFightRoleInfo[];
}

export type site={x:number,y:number};

export type DomainFightRoleInfo={
    name:string,
    classType:string,//角色类型，人类，恶魔，狼。。
    classTypeNum:number,//同类角色的建模序列

    speed:number,
    hp:number,
    mp:number,

    atk:number,
    def:number,

    hpAdd:number,
    mpAdd:number,

    site:site,
}