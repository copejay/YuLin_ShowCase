
import { _decorator, Component, Node } from 'cc';
import {Label} from "cc";
const { ccclass, property } = _decorator;

import { ConfirmUseItem } from '../TrainPopManager';
import {event} from '../TrainPopManager';

import { wrapText } from '../../../Infrastructure';

import { DeleteRoleInfo } from '../TrainPopManager';

@ccclass('DeleteRoleConfirmPop')
export class DeleteRoleConfirmPop extends Component {

    //控制节点显隐性
    @property(Node)
    ActiveNode:Node;

    //确认与取消
    @property(Node)
    ConfirmBtn:Node;
    @property(Node)
    CancelBtn:Node;

    //控制使用数量
    @property(Label)
    RoleNameLabel:Label;


    //物品具体信息
    @property({type:Label,tooltip:"角色天赋名"})
    RoleTalentLabel:Label;
    @property({type:Label,tooltip:"角色等级"})
    RoleLevelLabel:Label;

    // UseItemNum:number=1;

    EventBus;

    initEventBus(EventBus){
        this.EventBus=EventBus;
    }

    close(){
        this.ActiveNode.active=false;
    }
    open(){
        this.ActiveNode.active=true;
    }
    listen(){
        this.CancelBtn.on(Node.EventType.TOUCH_END,this.close,this);

        // this.NumAddBtn.on(Node.EventType.TOUCH_END,this.addItemNum,this);
        // this.NumReduceBtn.on(Node.EventType.TOUCH_END,this.reduceItemNum,this);

        this.ConfirmBtn.on(Node.EventType.TOUCH_END,this.ConfirmBtnClick,this);
    }

    ConfirmBtnClick(){
        let event:event={callFrom:"DeleteRoleConfirmPop",type:"ConfirmBtnClick",data:"null"};
        this.EventBus(event);
    }

    start(){
        this.listen();
        this.close();
    }

    setRoleInfo(DeleteRoleInfo:DeleteRoleInfo){
        this.RoleNameLabel.string=`【${DeleteRoleInfo.roleName}】`;
        this.RoleTalentLabel.string=`${DeleteRoleInfo.roleTalent}`;
        this.RoleLevelLabel.string=`${DeleteRoleInfo.roleLevel}`;
    }

    // setRoleInfo(RoleName:string,RoleTalent:string,RoleLevel:number){
    //     this.RoleNameLabel.string=`【${RoleName}】`;
    //     this.RoleTalentLabel.string=`${RoleTalent}`;
    //     this.RoleLevelLabel.string=`${RoleLevel}`;
    // }

    // setUseItemInfo(ConfirmUseItem:ConfirmUseItem){
    //     // let UseItemNameLabel=this.ItemNameNode.getComponent(Label);
    //     // UseItemNameLabel.string=`【${ConfirmUseItem.name}】`;

    //     // let describeText=wrapText(ConfirmUseItem.describe,18);
    //     // let UseItemDescribeLabel=this.ItemDescribeNode.getComponent(Label);
    //     // UseItemDescribeLabel.string=describeText;
    // }

    // setItemNum(){
    //     let UseItemNumLabel=this.UseItemNumNode.getComponent(Label);
    //     UseItemNumLabel.string=`【${this.UseItemNum.toString()}】`;
    // }

    // addItemNum(){
    //     this.UseItemNum++;
    //     this.setItemNum();
    // }

    // reduceItemNum(){
    //     if(this.UseItemNum<=1){
    //         return;
    //     }
    //     this.UseItemNum--;
    //     this.setItemNum();
    // }


}