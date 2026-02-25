import { _decorator, Component, Node, UITransform } from 'cc';
const { ccclass, property } = _decorator;

//二级协助类
import { BagCellsManager } from './Assistant/BagCellsManager';
import {BagPopManager} from './Assistant/BagPopManager';

//引入管理层
import { BagApp } from '../Application/BagApp';
    export {BagApp};//对内暴露，进行接口识别方便调用

export type event={//给二级协助类使用
    callFrom:string,
    type:string,
    data:any,
}

import type { UIPopStackItem, UIStackItem} from './UIType';

//Entry仅仅负责【功能接口暴露】就行了，具体的功能UI由Assistant里面的去做
@ccclass('BagEntry')
export class BagEntry extends Component {
    
    //协助类节点
    @property({type:Node,tooltip:"BagCellsManager"})
    BagCellsManagerNode:Node=null;
    @property({type:Node,tooltip:"BagPopManager"})
    BagPopManagerNode:Node=null;
    //管理格子
    BagCellsManager:BagCellsManager=null;
    //管理弹窗
    BagPopManager:BagPopManager=null;


    //交互按钮
    @property({type:Node,tooltip:"切换武器背包的按钮"})
    SwitchWeaponBagBtn:Node=null;
    @property({type:Node,tooltip:"切换物品背包的按钮"})
    SwitchItemBagBtn:Node=null;

    //App层
    BagApp:BagApp;

    //加载类运行所需的东西 1
    LoadComponent(){
        console.log("BagEntry: LoadComponent开始");
        //初始化管理层
        this.BagApp=BagApp.instance;

        this.BagCellsManager=this.BagCellsManagerNode.getComponent(BagCellsManager);
        this.BagCellsManager.Loading(this.BagApp);

        this.BagPopManager=this.BagPopManagerNode.getComponent(BagPopManager);
        this.BagPopManager.Loading(this.BagApp);
        
        //注入UI引用
        this.BagApp.LoadEntryUI(this);
    }


    start() {
        console.log("BagEntry: start开始");
        this.LoadComponent();
        
        //告诉App，UI已经初始化完成
        this.BagApp.buildBeginBagCells();

        //对切换武器背包按钮设置点击事件
        this.SwitchWeaponBagBtn.on(Node.EventType.TOUCH_END,()=>{
            console.log("BagEntry: 切换到武器背包");
            this.BagApp.SwitchToWeapon();
        },this);

        //对切换物品背包按钮设置点击事件
        this.SwitchItemBagBtn.on(Node.EventType.TOUCH_END,()=>{
            this.BagApp.SwitchToItem();
        },this);
    }

//UI层行为接口
    //创建面板
    buildItemCells(BagItemList:UIStackItem[]){
        this.BagCellsManager.reBuildItemCells(BagItemList);
    }
    buildWeaponCells(WeaponInfoList){
        this.BagCellsManager.reBuildWeaponCells(WeaponInfoList);
    }

    //打开弹窗
    openItemPop(StackItem:UIPopStackItem){
        this.BagPopManager.openItemPop(StackItem);
    }
    openConfirmPop(ItemName:string){
        this.BagPopManager.openConfirmPop(ItemName);
    }

    openWeaponPop(Weapon){
        this.BagPopManager.openWeaponPop(Weapon);
    }


    //关闭弹窗
    closeItemPop(){
        this.BagPopManager.closeItemPop();
    }
    closeConfirmPop(){
        this.BagPopManager.closeConfirmPop();
    }

}


