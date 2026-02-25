
import { _decorator, Component, Node } from 'cc';
import {Label} from "cc";
const { ccclass, property } = _decorator;

import { RoleTrainPop } from './TrainPopManagerAt/RoleTrainPop';
import { UseItemConfirmPop } from './TrainPopManagerAt/UseItemConfirmPop';
import { SkillUpForgetPop } from './TrainPopManagerAt/SkillUpForgetPop';

import { FormationPop } from './TrainPopManagerAt/FormationPop';
import { DeleteRoleConfirmPop } from './TrainPopManagerAt/DeleteRoleConfirmPop';

//数据传输规则只在二级入口引用，三级从二级这里拿，一级入口不需要
import { SkillUpForgetInfo,DeleteRoleInfo,FormationUpRole,UIUseItem } from '../UIType';
export type {SkillUpForgetInfo,DeleteRoleConfirmPop,FormationUpRole,UIUseItem};

//把所有的外部联系封锁在二级入口，三级入口的使用从二级进行引用
// export type {TrainUseItem};

import type {event} from '../TrainEntry';
export type {event};

//导入App层，方便使用接口
import {TrainApp} from '../TrainEntry';

@ccclass('TrainPopManager')
export class TrainPopManager extends Component {


    @property(Node)
    RoleTrainPopNode:Node;
    @property(Node)
    UseItemConfirmPopNode:Node;

    @property(Node)
    FormationPopNode:Node;
    @property(Node)
    SkillUpForgetPopNode:Node;

    @property(Node)
    DeleteRoleConfirmPopNode:Node;

    
    //管理所有训练界面弹窗
    RoleTrainPop:RoleTrainPop;
    UseItemConfirmPop:UseItemConfirmPop;
    FormationPop:FormationPop;
    SkillUpForgetPop:SkillUpForgetPop;
    DeleteRoleConfirmPop:DeleteRoleConfirmPop;

    TrainApp:TrainApp;

    // BoosEventBus:(event:event)=>void=null;

    start(){
        this.RoleTrainPop=this.RoleTrainPopNode.getComponent(RoleTrainPop);
        this.RoleTrainPop.initEventBus(this.ManagerEventBus.bind(this));

        this.UseItemConfirmPop=this.UseItemConfirmPopNode.getComponent(UseItemConfirmPop);
        this.UseItemConfirmPop.initEventBus(this.ManagerEventBus.bind(this));

        this.FormationPop=this.FormationPopNode.getComponent(FormationPop);
        this.FormationPop.initEventBus(this.ManagerEventBus.bind(this));

        this.SkillUpForgetPop=this.SkillUpForgetPopNode.getComponent(SkillUpForgetPop);
        this.SkillUpForgetPop.initEventBus(this.ManagerEventBus.bind(this));

        this.DeleteRoleConfirmPop=this.DeleteRoleConfirmPopNode.getComponent(DeleteRoleConfirmPop);
        this.DeleteRoleConfirmPop.initEventBus(this.ManagerEventBus.bind(this));
    }

    //打开遣散确认弹窗
    openDeleteRoleConfirmPop(DeleteRoleInfo:DeleteRoleInfo){
        this.DeleteRoleConfirmPop.open();
        this.DeleteRoleConfirmPop.setRoleInfo(DeleteRoleInfo);
    }
    closeDeleteRoleConfirmPop(){
        this.DeleteRoleConfirmPop.close();
    }

    //打开确认使用物品弹窗
    openUseItemConfirmPop(ConfirmUseItem:UIUseItem){
        this.UseItemConfirmPop.open();
        this.UseItemConfirmPop.setUseItemInfo(ConfirmUseItem);
    }
    closeUseItemConfirmPop(){
        this.UseItemConfirmPop.close();
    }

    //打开角色技能升级遗忘弹窗
    openSkillUpForgetPop(SkillUpForgetInfo:SkillUpForgetInfo){
        this.SkillUpForgetPop.open();
        this.SkillUpForgetPop.setSkillUpForgetInfo(SkillUpForgetInfo);
    }
    closeSkillUpForgetPop(){
        this.SkillUpForgetPop.close();
    }

    //打开角色训练弹窗
    openTrainRolePop(TrainUseItemList:UIUseItem[]){
        this.RoleTrainPop.open();
        this.RoleTrainPop.buildCells(TrainUseItemList);
    }
    closeTrainRolePop(){
        this.RoleTrainPop.close();
    }

    //打开列阵弹窗
    openFormationPop(FormationDisplayInfo:FormationUpRole[]){
        this.FormationPop.open();
        this.FormationPop.syncRoleCellsInfo(FormationDisplayInfo)
    }

    initApp(TrainApp){
        this.TrainApp=TrainApp;
    }


    ManagerEventBus(event:event){
        if(event.callFrom=="FormationPopClick"){
            if(event.type=="ClickCell" && 
                typeof event?.data?.site !== null){
                console.log(`TrainEntry: FormationPopClick${event.data.id}`);
                this.TrainApp.FormationCellClick(event.data.site);
            }else if(event.type=="CleanFormation"){
                console.log("hahaha");
            }else if(event.type=="DownRole"){
               this.TrainApp.DownRoleClick();
            }
        }else if(event.callFrom=="RoleTrainPop"){
            if (
                event.type === "TrainUseItemClick" &&
                typeof event?.data?.slotID === "number"
            ) {
                this.TrainApp.TrainUseItemClick(event.data.slotID);
            }
        }else if(event.callFrom=="UseItemConfirmPop"){
            if(event.type=="ConfirmBtnClick" && 
                typeof event?.data?.UseItemNum === "number"){
                // let UseItemNum=event.data.UseItemNum;
                this.TrainApp.ConfirmUseItem(event.data.UseItemNum);
            }
        }else if(event.callFrom=="DeleteRoleConfirmPop"){
            if(event.type=="ConfirmBtnClick"){
                this.TrainApp.deleteRoleConfirm();
            }else{
                console.error("TrainSys-UI-TrainPopManager：未知类型event!");
            }
        }
        else{
            console.error(`TrainEntry:未知来源信息${event.callFrom}`);
        }
    }

}