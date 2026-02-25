import { _decorator, Component, Node } from 'cc';

import {Prefab,UITransform} from 'cc';
const { ccclass, property } = _decorator;
//三级协助类
import { CellsItem } from './BagCellsAt/CellsItem';
import { CellsWeapon } from './BagCellsAt/CellsWeapon';
//刷新器
import { BagItemSpawner } from '../Spawner/BagItemSpawner';
import { BagWeaponSpawner } from '../Spawner/BagWeaponSpawner';
//数据传输限制
import { UIStackItem } from '../UIType';
    export type {UIStackItem};
//下级事件通信机制
import type { event } from '../BagEntry';
    export type {event};
//App层接口
import { BagApp } from '../BagEntry';

@ccclass('BagCellsManager')
export class BagCellsManager extends Component {

    @property({type:Node,tooltip:"框板节点"})
    BoardNode:Node=null;

    @property({type:Node,tooltip:"格子父节点"})
    BoardBoxParentNode:Node=null;

    @property({type:Node,tooltip:"内容节点"})
    ContentNode:Node=null;
    //生成器节点
    @property(Node)
    ItemBoxViewSpawnerNode:Node;
    @property(Node)
    WeaponBoxViewSpawnerNode:Node;

    //协助类
    CellsItem:CellsItem=null;
    CellsWeapon:CellsWeapon=null;

    BagApp:BagApp;


    Loading(BagApp){
        this.LoadComponent(BagApp);
    }
    LoadComponent(BagApp){
        //拿到生成器
        let myBagItemSpawner=this.ItemBoxViewSpawnerNode.getComponent(BagItemSpawner);
        let myBagWeaponSpawner=this.WeaponBoxViewSpawnerNode.getComponent(BagWeaponSpawner);
        //组成协助类
        this.CellsItem=new CellsItem(myBagItemSpawner,this.BoardBoxParentNode,this.EventBus.bind(this));
        this.CellsWeapon=new CellsWeapon(myBagWeaponSpawner,this.BoardBoxParentNode,this.EventBus.bind(this));
        //注入App层
        this.BagApp=BagApp;
    }

    EventBus(event:event){
        if(event.callFrom=="CellsItem"){
            if(event.type=="ClickItem"){
                this.BagApp.clickItemBox(event.data.slotID);
            }
        }
        if(event.callFrom=="CellsWeapon"){
            if(event.type=="ClickItem"){
                this.BagApp.clickWeaponBox(event.data.id);
            }
        }
    }



//行为方法
    //管理显示视图
    reBuildItemCells(ItemInfoList:UIStackItem[]){
        this.destroyAllCells();
        this.CellsItem.buildCells(ItemInfoList);
        this.resetContentLength();
    }
    
    reBuildWeaponCells(WeaponInfoList){
        this.destroyAllCells();
        this.CellsWeapon.CreateBoxBoard(WeaponInfoList);
        this.resetContentLength();
    }


    destroyAllCells(){
        this.CellsItem.DestroyBoxBoard();
        this.CellsWeapon.DestroyBoxBoard();
    }

    resetContentLength(){
        this.ContentNode.getComponent(UITransform).setContentSize(600,this.CellsItem.ItemBoxTotalLength);
    }

}


