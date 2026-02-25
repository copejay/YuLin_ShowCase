
import {RoleRow,TalentType,RoleFightInfo} from '../TrainType';

import { RoleBaseInfo,SpriteRoot,FightInfo,RoleEquip,RoleActiveSkill,RolePassiveSkill } from '../TrainType';


export interface RoleEnv {

    getTalentTemplate(TalentID:string):TalentType;

    getAllRoleIDList():string[];

}

export type LevelNameAndDao={
    QiLevelName:string;
    TiLevelName:string;
    dao:number;//根据练气层级计算出的道行
}


import {FightRole} from './Service/FightRole';
import type { FightRoleBaseInfo } from './Service/FightRole';
import {LevelNameResolver} from './Service/LevelNameResolver';

import { TrainRole } from './Service/TrainRole';
    import type { TrainRoleBaseInfo,TrainRoleFightData,TrainRoleTalentType } from './Service/TrainRole';
//other domain
import { RoleFactory } from './RoleFactory';
import { OtherDomain } from './OtherDomain';


export class Role{
    id:string;
    baseInfo:RoleBaseInfo;
    spriteRoot:SpriteRoot;
    fightInfo:FightInfo;

    equipList:RoleEquip[];
    activeSkillList:RoleActiveSkill[];
    passiveSkillList:RolePassiveSkill[];
    fightSkillList:string[];

    //动态计算的属性
    dao:number;//根据练气层级计算出的道行
    QiLevelName:string;//练气层级的名称
    TiLevelName:string;//炼体层级的名称
    //计算得出的战斗中的属性
    speed:number;
    attack:number;
    defense:number;
    hp:number;
    mp:number;
    addHp:number;
    addMp:number;
    //查询才能得到的天赋数据
    talentName:string;
    talentDescribe:string;
    talentStrongLevel:string;
    talentSpeedLevel:string;
    talentBloodLevel:string;
    talentSmartLevel:string;

    //从环境中获取所有角色ID列表
    allRoleIDList:string[];
    private RoleEnv:RoleEnv;
    //其它领域
    RoleFactory:RoleFactory;
    OtherDomain:OtherDomain


    constructor(RoleEnv:RoleEnv){
        this.RoleEnv=RoleEnv;
    }

    LinkOtherDomain(RoleFactory:RoleFactory,OtherDomain:OtherDomain){
        this.RoleFactory=RoleFactory;
        this.OtherDomain=OtherDomain;
    }

    commitRole(){
        if(!this.id){
            console.warn("Role :commitRole: 数据还未加载！");
            return;
        }
        this.RoleFactory.saveRole(this.exportDomainRole())
    }

    exportDomainRole():RoleRow{
        let roleRow:RoleRow={
            id:this.id,
            baseInfo:this.baseInfo,
            spriteRoot:this.spriteRoot,
            fightInfo:this.fightInfo,
            equipList:this.equipList,
            activeSkillList:this.activeSkillList,
            passiveSkillList:this.passiveSkillList,
            fightSkillList:this.fightSkillList,
        }
        return roleRow;
    }

//【1】内部纯粹行为
    //初始化之前保存之前的role
    initRole(RoleID:string){
        
        let roleRow:RoleRow=this.RoleFactory.getRoleRowData(RoleID);
        this.id=roleRow.id;
        this.baseInfo=roleRow.baseInfo;
        this.spriteRoot=roleRow.spriteRoot;
        this.fightInfo=roleRow.fightInfo;
        this.equipList=roleRow.equipList;
        this.activeSkillList=roleRow.activeSkillList;
        this.passiveSkillList=roleRow.passiveSkillList;
        this.fightSkillList=roleRow.fightSkillList;

        this.initTalentInfo();
        this.initDaoAndLevelName();
        this.initFightInfo();
    }
    //查询得到天赋详情
    initTalentInfo(){
        let talentID=this.baseInfo.talentID;
       
        let talentTemplate:TalentType=this.RoleEnv.getTalentTemplate(talentID);
        this.talentName=talentTemplate.name;
        this.talentDescribe=talentTemplate.describe;
        this.talentStrongLevel=talentTemplate.strong;
        this.talentSpeedLevel=talentTemplate.speed;
        this.talentBloodLevel=talentTemplate.blood;
        this.talentSmartLevel=talentTemplate.smart;
    }

    //计算道行和练气层级的名称
    initDaoAndLevelName(){
        this.dao=LevelNameResolver.resolveDao(this.baseInfo.QiLevel);
        this.QiLevelName=LevelNameResolver.resolve("练气",this.baseInfo.QiLevel);
        this.TiLevelName=LevelNameResolver.resolve("炼体",this.baseInfo.TiLevel);
    }
    // //计算出战斗中使用的属性
    initFightInfo(){
        let fightInfo:FightRoleBaseInfo={
            strong:this.fightInfo.strong,
            speed:this.fightInfo.speed,
            blood:this.fightInfo.blood,
            smart:this.fightInfo.smart,
            dao:this.dao,
        }
        let fightRole:FightRole=FightRole.fromFightInfo(fightInfo,[]);

        this.speed=fightRole.ft_speed;
        this.attack=fightRole.ft_attack;
        this.defense=fightRole.ft_defense;
        this.hp=fightRole.ft_hp;
        this.mp=fightRole.ft_mp;
        this.addHp=fightRole.ft_addHp;
        this.addMp=fightRole.ft_addMp;
    }
//【1】

//【2】对外提供内部数据查询

    getAllRoleIDList():string[]{
        return this.RoleEnv.getAllRoleIDList();
    }

    //获取信息
    getRoleFightInfo():RoleFightInfo{
        return {
            speed:this.speed,
            attack:this.attack,
            defense:this.defense,
            hp:this.hp,
            mp:this.mp,
            addHp:this.addHp,
            addMp:this.addMp,
        }
    }
    getRoleBaseInfo():RoleBaseInfo{
        return this.baseInfo;
    }

    getLevelNameAndDao():LevelNameAndDao{
        return {
            QiLevelName:this.QiLevelName,
            TiLevelName:this.TiLevelName,
            dao:this.dao,
        }
    }
    getSpriteRoot():SpriteRoot{
        return this.spriteRoot;
    }

    getRole():RoleRow{
        let roleRow:RoleRow={
            id:this.id,
            baseInfo:this.baseInfo,
            spriteRoot:this.spriteRoot,
            fightInfo:this.fightInfo,
            equipList:this.equipList,
            activeSkillList:this.activeSkillList,
            passiveSkillList:this.passiveSkillList,
            fightSkillList:this.fightSkillList,
        }
        return roleRow;
    }

    getTrainRole():TrainRole{
        let Base:TrainRoleBaseInfo={
            QiLevel:this.baseInfo.QiLevel,
            QiExp:this.baseInfo.QiExp,
            TiLevel:this.baseInfo.TiLevel,
            TiExp:this.baseInfo.TiExp,
            lifeSpan:this.baseInfo.lifeSpan,
            talentLevel:this.baseInfo.talentLevel,
        }
        let Fight:TrainRoleFightData={
            strong:this.fightInfo.strong,
            speed:this.fightInfo.speed,
            blood:this.fightInfo.blood,
            smart:this.fightInfo.smart,
        }
        let talent:TrainRoleTalentType={
            strong:this.talentStrongLevel,
            speed:this.talentSpeedLevel,
            blood:this.talentBloodLevel,
            smart:this.talentSmartLevel,
        }
        let newTrainRole=TrainRole.fromPersistence(Base,Fight,talent);
        newTrainRole.setCB(this.PopCB.bind(this));
        return newTrainRole;
    };

    PopCB(msg:string){
        this.OtherDomain.createToastPop(msg);
    }

    saveTrainRole(trainRole:TrainRole){
        this.baseInfo.QiLevel=trainRole.QiLevel;
        this.baseInfo.QiExp=trainRole.QiExp;
        this.baseInfo.TiLevel=trainRole.TiLevel;
        this.baseInfo.TiExp=trainRole.TiExp;

        this.baseInfo.lifeSpan=trainRole.lifeSpan;
        this.baseInfo.talentLevel=trainRole.talentLevel;

        this.fightInfo.strong=trainRole.ft_strong;
        this.fightInfo.smart=trainRole.ft_smart;
        this.fightInfo.blood=trainRole.ft_blood;
        this.fightInfo.speed=trainRole.ft_speed;

        this.RoleFactory.saveRole(this.exportDomainRole())
    }


    addStrong(strong:number){
        let trainRole=this.getTrainRole();
        trainRole.strongAdd(strong);
        this.saveTrainRole(trainRole);
    };
    addSpeed(speed:number){
        let trainRole=this.getTrainRole();
        trainRole.speedAdd(speed);
        this.saveTrainRole(trainRole);
    };
    addBlood(blood:number){
        let trainRole=this.getTrainRole();
        trainRole.bloodAdd(blood);
        this.saveTrainRole(trainRole);
    };
    addSmart(smart:number){
        let trainRole=this.getTrainRole();
        trainRole.smartAdd(smart);
        this.saveTrainRole(trainRole);
    };

    addQiExp(QiExp:number){
        let trainRole=this.getTrainRole();
        trainRole.QiExpAdd(QiExp);
        this.saveTrainRole(trainRole);
    };
    addTiExp(TiExp:number){
        let trainRole=this.getTrainRole();
        trainRole.TiExpAdd(TiExp);
        this.saveTrainRole(trainRole);
    };
//【2】

//【3】外部触发内部行为
//【3】

}