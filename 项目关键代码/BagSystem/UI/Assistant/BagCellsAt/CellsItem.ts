
// import { ItemBoxViewFactory } from '../../Infrastructure';

import { BagItemSpawner } from '../../Spawner/BagItemSpawner';

import { Prefab ,Node} from 'cc';
//导入数据传输限制
// import { UIStackItem } from '../../../DTO/AppUI.contract';
import { UIStackItem } from '../BagCellsManager';

import type {event} from '../BagCellsManager';


export class CellsItem{

    private BagItemSpawner:BagItemSpawner;

    private ParentNode:Node;

    private ItemBoxList=[];

    ItemBoxTotalLength:number=0;

    EventBus;

    // ClickCallBack:(ItemID:string)=>void=null;

    
    constructor(BagItemSpawner:BagItemSpawner,ParentNode:Node,EventBus:(event:event)=>void){
        this.BagItemSpawner=BagItemSpawner;
        this.ParentNode=ParentNode;
        // this.ClickCallBack=ClickCallBack;
        this.EventBus=EventBus;
    }

    clickCallBack(slotID:number){
        this.EventBus({callFrom:"CellsItem",type:"ClickItem",data:{slotID:slotID}});
    }

    //行为方法
    //管理显示视图
    buildCells(ItemInfoList:UIStackItem[]){
        this.CreateItemBox(ItemInfoList.length);
        this.syncItemBoxList(ItemInfoList);
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
    syncItemBoxList(ItemInfoList:UIStackItem[]){
        for(let i=0;i<this.ItemBoxList.length;i++){
            let ItemBox=this.ItemBoxList[i];
            let ItemInfo=ItemInfoList[i];
            ItemBox.syncName(ItemInfo.name);
            ItemBox.syncNum(ItemInfo.count);

            let map={"普通":1,"稀有":2,"史诗":3,"传奇":4};
            ItemBox.setLevelBorder(map[ItemInfo.grade.slice(0,2)]);
            // console.log(`BagSys-UI-BagCell-Item:物品评级${ItemInfo.grade}!`);
            //对每一个格子设置回调，调用回调，唤起角色弹窗，传入点击角色id
            ItemBox.setBoxCallBack(ItemInfo.slotID,(slotID)=>{
                this.clickCallBack(slotID);
            });
        }
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
            let ItemBox=this.BagItemSpawner.getItemBoxView(this.ParentNode);
            ItemBoxList.push(ItemBox);
        }
        return ItemBoxList;
    }
    //回收实体列表
    RecycleItemBoxList(ItemBoxList){
        for(let i=0;i<ItemBoxList.length;i++){
            let ItemBox=ItemBoxList[i];
            // this.ItemBoxFactory.recycle(ItemBox);
            this.BagItemSpawner.recycle(ItemBox);
        }
    }
    //生成位置列表
    MakeBoxSiteList(BoxNum:number){
        let BoxSiteList=[];
        let level=0;//排列层级
        for(let i=0;i<BoxNum;i++){
            if(i%5==0){//每3个为一层
                level++;
            }
            let BoxSite={
                x:(i%5)*100,
                y:(level-1)*-100,
            }
            BoxSiteList.push(BoxSite);
            this.ItemBoxTotalLength=100*level+700;
        }
        return BoxSiteList;
    }
}