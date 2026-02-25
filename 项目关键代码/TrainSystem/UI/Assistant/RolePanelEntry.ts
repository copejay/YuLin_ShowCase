import { _decorator, Component, Node } from 'cc';
import {Label} from "cc";
const { ccclass, property } = _decorator;

import { wrapText} from '../../Infrastructure';


import { RolePanel_BaseContent } from './RolePanelAt/RolePanel_BaseContent';
import { RolePanel_MoreContent } from './RolePanelAt/RolePanel_MoreContent';
import { RolePanel_SkillContent } from './RolePanelAt/RolePanel_SkillContent';

import { RolePanel_ChContent } from './RolePanelAt/RolePanel_ChContent';

//数据限制
import { UIRoleBaseInfo } from '../../DTO/AppUI.contract';
import { UIRoleDaoTalentInfo } from '../../DTO/AppUI.contract';
import { UIRoleFightInfo } from '../../DTO/AppUI.contract';
import { UIRoleBloodLineInfo } from '../../DTO/AppUI.contract';
import { UISkillInfo } from '../../DTO/AppUI.contract';
    export type {UISkillInfo};

import { UIFightRoleInfo } from '../../DTO/AppUI.contract';
    //内部导出
     export type {UIFightRoleInfo};

//从一级导入，导出给三级使用
import type {event} from '../TrainEntry';
export type {event};

import {TrainApp} from '../TrainEntry';


@ccclass('RolePanelEntry')
export class RolePanelEntry extends Component {

    @property(Node)
    RolePanelNode:Node;
    @property(Node)
    CloseButton:Node;
  
    //协助类
    @property({type:Node,tooltip:"RolePanel_BaseContentNode"})
    RolePanel_BaseContentNode:Node;

    @property({type:Node,tooltip:"RolePanel_MoreContentNode"})
    RolePanel_MoreContentNode:Node;

    @property({type:Node,tooltip:"RolePanel_SkillContentNode"})
    RolePanel_SkillContentNode:Node;

    @property({type:Node,tooltip:"RolePanel_ChContent"})
    RolePanel_ChContentNode:Node;


    private RolePanel_BaseContent:RolePanel_BaseContent;
    private RolePanel_MoreContent:RolePanel_MoreContent;
    private RolePanel_SkillContent:RolePanel_SkillContent;
    private RolePanel_ChContent:RolePanel_ChContent;

    private TrainApp:TrainApp;
    // private RoleID:string="null";


    initApp(App){
        this.TrainApp=App;
        this.initAt();
    }


    EventBus(event:event){
        if(event.callFrom=="BaseContent"){//基础信息面板
            if(event.type=="UpFormation"){
                this.TrainApp.UpFormationClick();
            }else if(event.type=="TrainBtnClick"){
                this.TrainApp.TrainRoleBtnClick();
            }else{
                console.error("TrainSys-UI-RolePanelEntry：未知类型event!");
            }
        }else if(event.callFrom=="MoreContent"){//详情信息面板
            if(event.type=="DeleteRoleClick"){
                this.TrainApp.deleteRoleClick();
            }else{
                console.error("TrainSys-UI-RolePanelEntry：未知类型event!");
            }

        }else if(event.callFrom=="SkillContent"){//技能信息面板
            if(event.type=="ActiveSkillClick"){
                if(event.data.clickType=="Control"){
                    this.TrainApp.ActiveSkillControlClick(event.data.SkillID);
                }else if(event.data.clickType=="Look"){
                    this.TrainApp.ActiveSkillLookClick(event.data.SkillID);
                }else{
                    console.error("TrainSys-UI-RolePanelEntry：未知类型clickType!");
                }
                // this.TrainApp.ActiveSkillClick(event.data.SkillID);
            }else if(event.type=="PassiveSkillClick"){
                if(event.data.clickType=="Control"){
                    this.TrainApp.PassiveSkillControlClick(event.data.SkillID);
                }else if(event.data.clickType=="Look"){
                    this.TrainApp.PassiveSkillLookClick(event.data.SkillID);
                }else{
                    console.error("TrainSys-UI-RolePanelEntry：未知类型clickType!");
                }
                // this.TrainApp.PassiveSkillClick(event.data.SkillID);
            }else{
                console.error("TrainSys-UI-RolePanelEntry：未知类型event!");
            }

        }else if(event.callFrom=="ChContent"){//内容切换顶部栏
            if(event.type=="ToBase"){
                this.TrainApp.ToContent("Base");
            }else if(event.type=="ToMore"){
                this.TrainApp.ToContent("More");
            }else if(event.type=="ToSkill"){
                this.TrainApp.ToContent("Skill");
            }
        }else{
            console.error("TrainSys-UI-RolePanelEntry：未知类型CallFrom!")
        }
    }


    initAt(){
        this.RolePanel_BaseContent=this.RolePanel_BaseContentNode.getComponent(RolePanel_BaseContent);
        this.RolePanel_BaseContent.initEventBus(this.EventBus.bind(this));

        this.RolePanel_MoreContent=this.RolePanel_MoreContentNode.getComponent(RolePanel_MoreContent);
        this.RolePanel_MoreContent.initEventBus(this.EventBus.bind(this));

        this.RolePanel_SkillContent=this.RolePanel_SkillContentNode.getComponent(RolePanel_SkillContent);
        this.RolePanel_SkillContent.initEventBus(this.EventBus.bind(this));

        this.RolePanel_ChContent=this.RolePanel_ChContentNode.getComponent(RolePanel_ChContent);
        this.RolePanel_ChContent.initEventBus(this.EventBus.bind(this));
    }

    closeAllContent(){
        this.RolePanel_BaseContent.close();
        this.RolePanel_MoreContent.close();
        this.RolePanel_SkillContent.close();
    }

//基础界面行为接口
    openBaseContent(){
        this.closeAllContent();
        this.RolePanel_BaseContent.open();
        this.RolePanel_ChContent.ChangeBtnState('Base');
    }
    closeBaseContent(){
        this.RolePanel_BaseContent.close();
    }
    setBaseInfo(Info:UIRoleBaseInfo){
        this.RolePanel_BaseContent.setBaseInfo(
            Info.name,Info.classType,Info.classTypeNum,
            Info.QiLevel,Info.QiExp,Info.TiLevel,Info.TiExp,
            Info.learnPoint,Info.birthData,Info.lifeSpan);
    }
    setFightInfo(Info:UIRoleFightInfo){
        this.RolePanel_BaseContent.setFightInfo(Info.strong,Info.speed,Info.blood,Info.smart);
    }
    setBloodLineInfo(Info:UIRoleBloodLineInfo){
        this.RolePanel_BaseContent.setBloodLineInfo(Info.name,Info.describe,Info.talentLevel,Info.strong,Info.speed,Info.blood,Info.smart);
    }
    setDaoTalentInfo(Info:UIRoleDaoTalentInfo){
        this.RolePanel_BaseContent.setDaoTalentInfo(Info.level,Info.jin,Info.mu,Info.shui,Info.huo,Info.tu);
    }


//详情界面行为接口
    openMoreContent(){
        this.closeAllContent();
        this.RolePanel_MoreContent.open();
        this.RolePanel_ChContent.ChangeBtnState('More');
    }
    setFightRoleInfo(info:UIFightRoleInfo){
        this.RolePanel_MoreContent.setMoreInfo(info);
    }
    closeMoreContent(){
        this.RolePanel_MoreContent.close();
    }

//技能界面行为接口
    openSkillContent(){
        this.closeAllContent();
        this.RolePanel_SkillContent.open();
        // this.RolePanel_ChContent.clickChSkill();
        this.RolePanel_ChContent.ChangeBtnState('Skill');
    }
    setSkillInfo(ActiveSkillList:UISkillInfo[],PassiveSkillList:UISkillInfo[]){
        this.RolePanel_SkillContent.setSkillInfo(ActiveSkillList,PassiveSkillList);
    }
    closeSkillContent(){
        this.RolePanel_SkillContent.close();
    }


    //本界面接口
    open(){
        this.RolePanelNode.active=true;
    }
    close(){
        this.RolePanelNode.active=false;
    }
    

    addListener(){
        this.CloseButton.on(Node.EventType.TOUCH_END,this.clickCloseButton,this);
    }

    clickCloseButton(){
        this.close();
    }

    start() {
        //开始是隐藏的
        this.close();
        this.addListener();
    }

}


