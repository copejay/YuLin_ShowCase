
//外部数据限制
import type { saveRoleRow, saveTalentType } from '../../DTO/AppOutData.contract';
import type { saveRoleRowActiveSkill } from '../../DTO/AppOutData.contract';
import type { saveRoleRowPassiveSkill } from '../../DTO/AppOutData.contract';

//App与UI层数据限制

import type { UIUseItem } from '../../DTO/AppUI.contract';

import type { SkillUpForgetInfo } from '../../DTO/AppUI.contract';

import type { passiveSkillType } from '../../DTO/AppOutData.contract';

import type { DeleteRoleInfo } from '../../DTO/AppUI.contract';

//外部系统与服务
import {BagApp,GlobalApp,DataBaseService,TemplateService} from '../../DTO/OutApp.contract';

//UI层接口
import {TrainEntry} from "../TrainApplication";

//工具类
// import { TrainRoleManager } from './modelContextService/TrainRoleManager';
import { DomainFactory } from '../DomainFactory/DomainFactory';
import { TrainDomain } from '../../Domain/TrainDomain';

export class RolePanelPops{


    private UIEntry:TrainEntry;

    private GlobalApp:GlobalApp;
    private BagApp:BagApp;

    private TrainDomain:TrainDomain;

    constructor(GlobalApp,BagApp){

        this.GlobalApp=GlobalApp;
        this.BagApp=BagApp;

        this.TrainDomain=DomainFactory.instance.getTrainDomain();
    }


    initUI(TrainUI){
        this.UIEntry=TrainUI;
    }

    openDeleteRolePop(RoleID:string){
        let role:saveRoleRow=DataBaseService.instance.getRole(RoleID);
        let skill:saveTalentType=TemplateService.instance.getTalent(role.baseInfo.talentID);
        let DeleteRoleInfo:DeleteRoleInfo={
            roleName:role.baseInfo.name,
            roleLevel:role.baseInfo.QiLevel,
            roleTalent:skill.name,
        }
        this.UIEntry.openDeleteRoleConfirmPop(DeleteRoleInfo);
        // this.UIEntry.openDeleteRolePop(RoleID);
    }

    openPassiveSkillUpForgetPop(SkillID:string,RoleID:string){
        let info:SkillUpForgetInfo;
        let RoleRow:saveRoleRow=DataBaseService.instance.getRole(RoleID);
        let SkillRow:saveRoleRowPassiveSkill=RoleRow.passiveSkillList.find((item)=>item.id==SkillID);
        let SkillTemplate:passiveSkillType=TemplateService.instance.getPassiveSkill(SkillID);

        let SkillLevel=SkillRow.level;
        let SkillName=SkillTemplate.name;
        let UpNeed=10;
        info={
            skillName:SkillName,
            skillLevel:SkillLevel,
            skillUpNeed:UpNeed,
        }
        this.UIEntry.openSkillUpForgetPop(info);
    }

    openTrainRolePop(){
        let TrainItemList=this.BagApp.getTrainItemList();
        let UIItemList:UIUseItem[]=TrainItemList.map((item)=>{
            return{
                slotID:item.slotID,
                name:item.name,
                describe:item.describe,
                count:item.count,
            }
        })
        this.UIEntry.openTrainRolePop(UIItemList);
    }


    openConfirmUseItemPop(slotID:number){
        let BagItem=this.BagApp.getDomainBagItem(slotID);
        let UIItem:UIUseItem={
                slotID:BagItem.slotID,
                name:BagItem.name,
                describe:BagItem.describe,
                count:BagItem.count,
        }
        this.UIEntry.openUseItemConfirmPop(UIItem);
    }


    ConfirmUseItem(ItemSlotID:number,num:number){
        console.log(`TrainSys-App-RolePanelPops:确认使用物品：${ItemSlotID},${num}`);
        this.BagApp.trainUseItem(ItemSlotID,num);
    }



}