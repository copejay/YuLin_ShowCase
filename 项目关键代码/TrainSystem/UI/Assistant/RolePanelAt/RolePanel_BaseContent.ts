import { _decorator, Component, Node } from 'cc';
import {Label} from "cc";
const { ccclass, property } = _decorator;

// import { RoleRow } from '../../../GlobalService';

import { BaseContent_BaseInfo } from './BaseContentAt/BaseContent_BaseInfo';
import { BaseContent_FightInfo } from './BaseContentAt/BaseContent_FightInfo';
import { BaseContent_BloodLineInfo } from './BaseContentAt/BaseContent_BloodLineInfo';
import { BaseContent_DaoTalentInfo } from './BaseContentAt/BaseContent_DaoTalentInfo';

import type {event} from '../RolePanelEntry';

@ccclass('RolePanel_BaseContent')
export class RolePanel_BaseContent extends Component {

    @property({type:Node,tooltip:"ActiveNode"})
    ActiveNode;

    @property({type:Node,tooltip:"BaseContent_BaseInfoNode"})
    BaseContent_BaseInfoNode;

    @property({type:Node,tooltip:"BaseContent_DaoTalentInfoNode"})
    BaseContent_DaoTalentInfoNode;

    @property({type:Node,tooltip:"BaseContent_FightInfoNode"})
    BaseContent_FightInfoNode;

    @property({type:Node,tooltip:"BaseContent_BloodLineInfoNode"})
    BaseContent_BloodLineInfoNode;

    @property(Node)
    RoleTrainBtn:Node;
    @property(Node)
    UpFormation:Node;

    private BaseContent_BaseInfo:BaseContent_BaseInfo;
    private BaseContent_DaoTalentInfo:BaseContent_DaoTalentInfo;
    private BaseContent_FightInfo:BaseContent_FightInfo;
    private BaseContent_BloodLineInfo:BaseContent_BloodLineInfo;


    // private TrainApp;
    private EventBus;

    // private RoleID;

    // start(){
    //     this.initAt();
    //     this.close();
    // }
    start(){
        this.addListen();
    }

    open(){
        this.ActiveNode.active=true;
    }
    close(){
        this.ActiveNode.active=false;
    }

    // initApp(app){
    //     this.TrainApp=app;
    //     this.initAt();
    //     this.close();
    // }

    initEventBus(EventBus){
        this.EventBus=EventBus;

        this.initAt();
        this.close();
    }


    initAt(){
        this.BaseContent_BaseInfo=this.BaseContent_BaseInfoNode.getComponent(BaseContent_BaseInfo);
        this.BaseContent_DaoTalentInfo=this.BaseContent_DaoTalentInfoNode.getComponent(BaseContent_DaoTalentInfo);

        this.BaseContent_FightInfo=this.BaseContent_FightInfoNode.getComponent(BaseContent_FightInfo);
        this.BaseContent_BloodLineInfo=this.BaseContent_BloodLineInfoNode.getComponent(BaseContent_BloodLineInfo);
    }

    // setRoleID(RoleID:string){
    //     this.RoleID=RoleID;
    // }

    UpFormationClickCB(){
        // this.TrainApp.UpFormationClick(this.RoleID);
        let Event:event={callFrom:"BaseContent",type:"UpFormation",data:{RoleID:`null`}};
        this.EventBus(Event);
    }

    RoleTrainBtnClick(){
        let Event:event={callFrom:"BaseContent",type:"TrainBtnClick",data:{RoleID:"不需要写"}};
        this.EventBus(Event);
        // this.TrainApp.RoleTrainBtnClick(this.RoleID);
    }

    addListen(){
        this.UpFormation.on(Node.EventType.TOUCH_END,this.UpFormationClickCB,this);
        this.RoleTrainBtn.on(Node.EventType.TOUCH_END,this.RoleTrainBtnClick,this);
    }


    setBaseInfo(name:string,classType:string,classTypeNum:number,
        QiLevel:string,QiExp:string,TiLevel:string,TiExp:string,
        learnPoint:number,getData:number,lifeSpan:number){
        this.BaseContent_BaseInfo.setBaseInfo(name,classType,classTypeNum,QiLevel,QiExp,TiLevel,TiExp,learnPoint,getData,lifeSpan);
    }
    setDaoTalentInfo(DaoLevel:string,JinTalentLabel:string,MuTalentLabel:string,ShuiTalentLabel:string,HuoTalentLabel:string,TuTalentLabel:string){
        this.BaseContent_DaoTalentInfo.setDaoTalentInfo(DaoLevel,JinTalentLabel,MuTalentLabel,ShuiTalentLabel,HuoTalentLabel,TuTalentLabel);
    }
    setFightInfo(strong:number,speed:number,blood:number,smart:number){
        this.BaseContent_FightInfo.setFightInfo(strong,speed,blood,smart);
    }
    setBloodLineInfo(TalentName:string,TalentDescribe:string,TalentLevel:number,StrongType:string,SpeedType:string,BloodType:string,SmartType:string){
        this.BaseContent_BloodLineInfo.setBloodLineInfo(TalentName,TalentDescribe,TalentLevel,StrongType,SpeedType,BloodType,SmartType);
    }

}


