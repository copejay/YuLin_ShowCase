

export type DomainItemUseType="roleTrain"|"bagUse"|"skillUse"|"noUse"
export type DomainItemUseTarget=
"lifeSpan"|
"TiExp"|"QiExp"|
"speed"|"strong"|"blood"|"smart"|
"pt_pool"|"xy_pool"|"ss_pool"|"cq_pool"|"null";
export type DomainItemActType="add"|"null";

export type DomainBagItemTemplate={
    name:string,
    describe:string,
    level:string,

    useType:DomainItemUseType,
    useTarget:string,
    act:string,
    actNum:number,
}

export type DomainBagItem={
    slotID:number,
    id:string,
    count:number,

    name:string,
    describe:string,
    level:string,

    useType:DomainItemUseType,
    useTarget:string,
    act:string,
    num:number,
}

export type DomainSimpleBagItem={
    slotID:number,
    id:string,
    count:number,
}