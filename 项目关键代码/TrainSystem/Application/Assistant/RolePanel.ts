

type RolePanelState='Close' | 'Open';

export type ContentState='Base' | "More" |'Skill';

//导入数据传输协议
import { UIRoleBaseInfo } from "../../DTO/AppUI.contract";
import { UIRoleDaoTalentInfo } from "../../DTO/AppUI.contract";
import { UIRoleFightInfo } from "../../DTO/AppUI.contract";
import { UIRoleBloodLineInfo } from "../../DTO/AppUI.contract";
import { UISkillInfo } from "../../DTO/AppUI.contract";
import { UIFightRoleInfo } from "../../DTO/AppUI.contract";

import { saveRoleRow } from "../../DTO/AppOutData.contract";
import { saveTalentType } from "../../DTO/AppOutData.contract";
// import { skillType } from "../../DTO/AppOutData.contract";

import { activeSkillType } from "../../DTO/AppOutData.contract";
import { passiveSkillType } from "../../DTO/AppOutData.contract";

//导入外部的系统接口
import {DataBaseService,TemplateService} from '../../DTO/OutApp.contract';

import { TrainEntry } from "../TrainApplication";

import type { RoleFightInfo } from "../../DTO/DomainType.contract";

//导入领域模型
import { TrainDomain } from "../../Domain/TrainDomain";
import { DomainFactory } from "../DomainFactory/DomainFactory";

//导入工具类
// import { FightRoleManager } from "./modelContextService/FightRoleManager";

//处理角色弹窗的逻辑
export class RolePanel{

    TrainEntryUI:TrainEntry;

    RolePanelState:RolePanelState;
    ContentState:ContentState;

    private DomainTrain:TrainDomain;

    //本来想过在二级入口直接对外部系统进行引用使用，虽然在一开始好像减少了代码量
    //但是考虑到二级类只是对一级类的拓展，它本身必须要依赖于一级类，这样才能层级分明
    //坚持这个原则，才能避免二级类脱离一级类的掌控
    //对外部系统的引用在一定程度上可以标识功能边界，统一在一级入口引用并注入可以减少心智负担
    constructor(){
        this.DomainTrain=DomainFactory.instance.getTrainDomain();
    }

    initUI(TrainUI){
        this.TrainEntryUI=TrainUI;
    }

    open(RoleID:string){
        this.RolePanelState="Open";
        this.TrainEntryUI.openRolePanel();

        this.toContent(RoleID,'Base');
    }

    toContent(RoleID:string,type:ContentState){
        this.ContentState=type;
        switch(type){
            case 'Base':
                let BaseInfo:UIRoleBaseInfo=this.getUIRoleBaseInfo(RoleID);
                let DaoTalentInfo:UIRoleDaoTalentInfo=this.getRoleDaoTalentInfo(RoleID);
                let FightInfo:UIRoleFightInfo=this.getUIRoleFightInfo(RoleID);
                let BloodLineInfo:UIRoleBloodLineInfo=this.getRoleBloodLineInfo(RoleID);
                this.TrainEntryUI.openRolePanel_BaseContent(BaseInfo,DaoTalentInfo,FightInfo,BloodLineInfo);
                break;
            case 'More':
                // let newFightRoleManager=new FightRoleManager(RoleID);
                // let FightRoleInfo:FightRoleInfo=newFightRoleManager.getFightRoleInfo();
                this.DomainTrain.initRole(RoleID);
                let FightRoleInfo:RoleFightInfo=this.DomainTrain.getFightRole();

                let UIFightRoleInfo:UIFightRoleInfo=this.getUIFightRoleInfo(FightRoleInfo);
                this.TrainEntryUI.openRolePanel_MoreContent(UIFightRoleInfo);
                break;
            case 'Skill':
                let ActiveSkillList:UISkillInfo[]=[];
                let PassiveSkillList:UISkillInfo[]=[];

                ActiveSkillList=this.getRoleSkillInfo(RoleID).UIActiveSkillList;
                PassiveSkillList=this.getRoleSkillInfo(RoleID).UIPassiveSkillList;

                this.TrainEntryUI.openRolePanel_SkillContent(ActiveSkillList,PassiveSkillList);
                break;
        }
    }

    getUIFightRoleInfo(FightRoleInfo:RoleFightInfo):UIFightRoleInfo{

        let UIFightRoleInfo:UIFightRoleInfo={
            speed:this.NumWan(FightRoleInfo.speed),
            attack:this.NumWan(FightRoleInfo.attack),
            defense:this.NumWan(FightRoleInfo.defense),
            hp:this.NumWan(FightRoleInfo.hp),
            mp:this.NumWan(FightRoleInfo.mp),
            addHp:this.NumWan(FightRoleInfo.addHp),
            addMp:this.NumWan(FightRoleInfo.addMp),
        }
        return UIFightRoleInfo;
    }

    //把超过一百万的数字转换为万
    NumWan(num:number):string{
        if(num/10000>=100){
            let numWan=Math.floor(num/10000);
            return numWan.toString()+"w";
        }
        return num.toString();
    }

    getRoleDaoTalentInfo(RoleID:string){
        // let Role:RoleRow=DataBaseService.instance.getRole(RoleID);
        this.DomainTrain.initRole(RoleID);
        let LevelNameAndDao=this.DomainTrain.getLevelNameAndDao();
        let SpriteRoot=this.DomainTrain.getSpriteRoot();

        let levelString=this.NumWan(LevelNameAndDao.dao);

        let DaoTalentInfo:UIRoleDaoTalentInfo={
            level:levelString,
            jin:SpriteRoot['金'].toString(),
            mu:SpriteRoot['木'].toString(),
            shui:SpriteRoot['水'].toString(),
            huo:SpriteRoot['火'].toString(),
            tu:SpriteRoot['土'].toString(),
        }
        return DaoTalentInfo;
    }


    getRoleSkillInfo(RoleID:string){
        let Role:saveRoleRow=DataBaseService.instance.getRole(RoleID);

        let activeSkillList=Role.activeSkillList;
        let passiveSkillList=Role.passiveSkillList;

        let UIActiveSkillList:UISkillInfo[]=[];
        let UIPassiveSkillList:UISkillInfo[]=[];

        for(let Skill of activeSkillList){
            //模板信息
            let SkillInfo:activeSkillType=TemplateService.instance.getActiveSkill(Skill.id);
            if(SkillInfo.skillType=='zd'){
                UIActiveSkillList.push({
                    id:Skill.id,
                    name:SkillInfo.name,
                    quality:SkillInfo.level,
                    level:Skill.level,
                })
            }else{
                console.error("TrainSys-UI-RolePanel：未知类型技能！")
            }
        }
        for(let Skill of passiveSkillList){
            //模板信息
            let SkillInfo:passiveSkillType=TemplateService.instance.getPassiveSkill(Skill.id);
            if(SkillInfo.skillType=='bd'){
                UIPassiveSkillList.push({
                    id:Skill.id,
                    name:SkillInfo.name,
                    quality:SkillInfo.level,
                    level:Skill.level,
                })
            }else{
                console.error("TrainSys-UI-RolePanel：未知类型技能！")
            }
        }
        return {UIActiveSkillList,UIPassiveSkillList};
    }



    getUIRoleBaseInfo(ID):UIRoleBaseInfo{
        // let RoleInfo:RoleRow=this.getRoleInfoByID(ID);
        this.DomainTrain.initRole(ID);
        let Role=this.DomainTrain.getRole();
        let LevelNameAndDao=this.DomainTrain.getLevelNameAndDao();

        let baseInfo=Role.baseInfo;

        let DaoString=this.NumWan(LevelNameAndDao.dao);

        let QiExpString=this.NumWan(baseInfo.QiExp);
        let TiExpString=this.NumWan(baseInfo.TiExp);

        let RoleBaseInfo:UIRoleBaseInfo={
            name:baseInfo.name,
            classType:baseInfo.classType,
            classTypeNum:baseInfo.classTypeNum,
            QiLevel:LevelNameAndDao.QiLevelName,
            QiExp:QiExpString,
            TiLevel:LevelNameAndDao.TiLevelName,
            TiExp:TiExpString,
            learnPoint:baseInfo.learnPoint,
            birthData:baseInfo.birthData,
            lifeSpan:baseInfo.lifeSpan}
        return RoleBaseInfo
    }
    //四维数据
    getUIRoleFightInfo(ID):UIRoleFightInfo{
        let RoleInfo:saveRoleRow=this.getRoleInfoByID(ID);

        let FightInfo=RoleInfo.fightInfo;   
        let RoleFightInfo:UIRoleFightInfo={
            strong:FightInfo.strong,
            speed:FightInfo.speed,
            blood:FightInfo.blood,
            smart:FightInfo.smart}
        return RoleFightInfo;
    }

    getRoleBloodLineInfo(ID):UIRoleBloodLineInfo{
        let RoleInfo:saveRoleRow=this.getRoleInfoByID(ID);

        let TalentID=RoleInfo.baseInfo.talentID;
        let TalentLevel=RoleInfo.baseInfo.talentLevel;

        let TalentTemplate:saveTalentType=TemplateService.instance.getTalent(TalentID);
        let name=TalentTemplate.name;
        let describe=TalentTemplate.describe;
        let strong=TalentTemplate.strong;
        let speed=TalentTemplate.speed;
        let blood=TalentTemplate.blood;
        let smart=TalentTemplate.smart;

        let RoleBloodLineInfo:UIRoleBloodLineInfo={
            name:name,describe:describe,talentLevel:TalentLevel,
            strong:strong,speed:speed,blood:blood,smart:smart}
        return RoleBloodLineInfo;
    }


    getRoleInfoByID(RoleID:string):saveRoleRow{
        return DataBaseService.instance.getRole(RoleID);
    }

    addSpeed(RoleID:string,speed:number){
        this.DomainTrain.initRole(RoleID);
        this.DomainTrain.addSpeed(speed);
    }
    addStrong(RoleID:string,strong:number){
        this.DomainTrain.initRole(RoleID);
        this.DomainTrain.addStrong(strong);
    }
    addBlood(RoleID:string,blood:number){
        this.DomainTrain.initRole(RoleID);
        this.DomainTrain.addBlood(blood);
    }
    addSmart(RoleID:string,smart:number){
        this.DomainTrain.initRole(RoleID);
        this.DomainTrain.addSmart(smart);
    }
    addQiExp(RoleID:string,QiExp:number){
        this.DomainTrain.initRole(RoleID);
        this.DomainTrain.addQiExp(QiExp);
    }
    addTiExp(RoleID:string,TiExp:number){
        this.DomainTrain.initRole(RoleID);
        this.DomainTrain.addTiExp(TiExp);
    }

}