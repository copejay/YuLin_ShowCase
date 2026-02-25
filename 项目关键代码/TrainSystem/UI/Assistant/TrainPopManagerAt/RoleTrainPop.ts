
import { _decorator, Component, Node, UITransform } from 'cc';
import {Label} from "cc";
const { ccclass, property } = _decorator;

import { TrainUseItemView } from '../../View/TrainUseItemView';

import { TrainUseItemSpawner } from '../../Spawner/TrainUseItemSpawner';

import type { UIUseItem } from '../TrainPopManager';

import type {event} from '../TrainPopManager';

@ccclass('RoleTrainPop')
export class RoleTrainPop extends Component {


    @property(Node)
    ActiveNode:Node;

    //scrollView
    @property(Node)
    ContentNode:Node;

    @property(Node)
    CellsNode:Node;

    @property(Node)
    CloseBtn:Node;

    @property({type:Node,tooltip:"TrainUseItemSpawner"})
    TrainUseItemSpawnerNode:Node;

    // private BagItemSpawner:BagItemSpawner;
    private TrainUseItemSpawner:TrainUseItemSpawner;

    // private ParentNode:Node;

    private ItemBoxList=[];

    ItemBoxTotalLength:number=0;

    // ClickCallBack:(ItemID:string)=>void=null;
    //这里弃用原来的ClickCallBack，因为原来的回调函数是由上级传入
    //从这一层看不出函数的作用，信息的传递需要层级分明

    EventBus;

    start(){
        this.close();
        this.CloseBtn.on(Node.EventType.TOUCH_END,this.close,this);
        this.TrainUseItemSpawner=this.TrainUseItemSpawnerNode.getComponent(TrainUseItemSpawner);
    }

    initEventBus(EventBus){
        this.EventBus=EventBus;
    }


    open(){
        this.ActiveNode.active=true;
    }
    close(){
        this.ActiveNode.active=false;
        this.DestroyBoxBoard();
    }

    //行为方法
    //管理显示视图
    buildCells(ItemInfoList:UIUseItem[]){
        this.DestroyBoxBoard();

        this.CreateItemBox(ItemInfoList.length);
        this.syncItemBoxList(ItemInfoList);
        this.renewContentSize();
    }


    //创建列表，顺便同步位置
    CreateItemBox(BoxNum:number){
        this.ItemBoxList=this.buildItemViewList(BoxNum);
        const ItemBoxSiteList=this.MakeBoxSiteList(BoxNum);
        for(let i=0;i<this.ItemBoxList.length;i++){
            let ItemBox=this.ItemBoxList[i];
            let BoxSite=ItemBoxSiteList[i];
            ItemBox.setPosition(BoxSite.x,BoxSite.y);
        }
    }
    //拿到具体信息，进行同步
    syncItemBoxList(ItemInfoList:UIUseItem[]){
        for(let i=0;i<this.ItemBoxList.length;i++){
            let ItemBox:TrainUseItemView=this.ItemBoxList[i];
            let ItemInfo:UIUseItem=ItemInfoList[i];
            ItemBox.setName(ItemInfo.name);
            ItemBox.setNum(ItemInfo.count);
            //对每一个格子设置回调，调用回调，唤起角色弹窗，传入点击角色id
            ItemBox.setClickCB(ItemInfo.slotID,(slotID)=>{
                this.ClickCallBack(slotID);
            });
        }
    }
    ClickCallBack(slotID){
        let event:event={callFrom:"RoleTrainPop",type:"TrainUseItemClick",data:{slotID:slotID}};
        this.EventBus(event);
    }


    //全部销毁
    DestroyBoxBoard(){
        this.RecycleItemBoxList(this.ItemBoxList);
        this.ItemBoxList=[];
    }
   //生成实体列表
    buildItemViewList(BoxNum:number){
        let ItemBoxList=[];
        for(let i=0;i<BoxNum;i++){
            let ItemBox=this.TrainUseItemSpawner.getView(this.CellsNode);
            ItemBoxList.push(ItemBox);
        }
        return ItemBoxList;
    }
    //回收实体列表
    RecycleItemBoxList(ItemBoxList){
        for(let i=0;i<ItemBoxList.length;i++){
            let ItemBox=ItemBoxList[i];
            // this.ItemBoxFactory.recycle(ItemBox);
            this.TrainUseItemSpawner.recycle(ItemBox);
        }
    }

    renewContentSize(){
        this.ContentNode.getComponent(UITransform).setContentSize(500,this.ItemBoxTotalLength);
    }


    //生成位置列表
    MakeBoxSiteList(BoxNum:number){
        let boxWidth=80;
        let boxHeight=80;
        let boxSpace=30;
        let levelBoxNum=4;
        let contentBaseHeight=300;

        let BoxSiteList=[];
        let level=0;//排列层级
        for(let i=0;i<BoxNum;i++){
            if(i%levelBoxNum==0){//每4个为一层
                level++;
            }
            let BoxSite={
                x:(i%levelBoxNum)*(boxWidth+boxSpace),
                y:(level-1)*-(boxHeight+boxSpace),
            }
            BoxSiteList.push(BoxSite);
            this.ItemBoxTotalLength=(boxHeight+boxSpace)*level+contentBaseHeight;
        }
        return BoxSiteList;
    }

}