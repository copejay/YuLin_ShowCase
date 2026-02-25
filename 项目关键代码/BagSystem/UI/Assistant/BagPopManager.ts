import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import { BagItemPopEntry } from './BagPopAt/BagItemPopEntry';
import { BagWeaponPopEntry } from './BagPopAt/BagWeaponPopEntry';
import { DeleteConfirmPopEntry } from './BagPopAt/DeleteConfirmPopEntry';

//App层接口
import { BagApp } from '../BagEntry';

//数据传输限制
import { UIPopStackItem } from '../UIType';

import type {event} from '../BagEntry';
    export type {event};

@ccclass('BagPopManager')
export class BagPopManager extends Component {

    @property({type:Node,tooltip:"物品弹窗"})
    BagItemPopNode:Node=null;

    @property({type:Node,tooltip:"武器弹窗"})
    BagWeaponPopNode:Node=null;

    @property({type:Node,tooltip:"删除确认弹窗"})
    DeleteConfirmPopNode:Node=null;

    ItemPopEntry:BagItemPopEntry;
    WeaponPopEntry:BagWeaponPopEntry;
    DeleteConfirmPopEntry:DeleteConfirmPopEntry;

    BagApp:BagApp;
    //存储最新打开的物品弹窗ID
    // newOpenPopItemID:string;

    //协助类通信接口
    ATclickCB(event:event){
        if(event.callFrom=="ItemPopEntry"){
            if(event.type=="DeleteClick"){
                console.log("BagSystem-ui-删除物品被点击");
                this.BagApp.ItemPopDeleteClick();
            }
        }
        if(event.callFrom=="ItemPopEntry"){
            if(event.type=="UseClick"){
                console.log("BagSystem-ui-背包使用物品被点击");
                this.BagApp.bagUseItem();
            }
        }
        if(event.callFrom=="DeleteConfirmPopEntry"){
            if(event.type=="DeleteConfirm"){
                console.log("BagSystem-ui-删除确认被点击");
                this.BagApp.ConfirmDeleteItem();
            }
        }
    }

    closeItemPop(){
        this.ItemPopEntry.close();
    }
    closeConfirmPop(){
        this.DeleteConfirmPopEntry.close();
    }


    Loading(BagApp){
        this.ItemPopEntry=this.BagItemPopNode.getComponent(BagItemPopEntry);
        this.WeaponPopEntry=this.BagWeaponPopNode.getComponent(BagWeaponPopEntry);
        // this.BagApp=BagApp;
        this.DeleteConfirmPopEntry=this.DeleteConfirmPopNode.getComponent(DeleteConfirmPopEntry);

        this.BagApp=BagApp;
    }

    openConfirmPop(ItemName:string){
        this.DeleteConfirmPopEntry.open();
        this.DeleteConfirmPopEntry.syncHintTip(ItemName);
        this.DeleteConfirmPopEntry.initCallBack(this.ATclickCB.bind(this));
    }
    openItemPop(StackItem:UIPopStackItem){
        this.ItemPopEntry.open();
        this.ItemPopEntry.initCallBack(this.ATclickCB.bind(this));
        // this.ItemPopEntry.syncInfo(StackItem);
        // this.newOpenPopItemID=StackItem.id;

        this.ItemPopEntry.syncNameCount(StackItem.name,StackItem.count);
        this.ItemPopEntry.syncDescribe(StackItem.describe);
        this.ItemPopEntry.syncItemType(StackItem.useType);
    }
    openWeaponPop(Weapon){
        this.WeaponPopEntry.open();
        this.WeaponPopEntry.syncInfo(Weapon);
    }

}


