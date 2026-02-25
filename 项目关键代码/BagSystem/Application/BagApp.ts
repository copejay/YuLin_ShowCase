

import { BagCells } from "./Assistant/BagCells";
import { BagPop } from "./Assistant/BagPop";

import { DomainBagItem } from "../Domain/DomainType";
//导入领域模型
import { BagDomain } from "../Domain/BagDomain";

import { DomainFactory } from "./DomainFactory/DomainFactory";
//导入UI层接口
import { BagEntry } from "../UI/BagEntry";
    export {BagEntry};

export class BagApp{

    private static _instance:BagApp;

    public static get instance(){
        if(!this._instance){
            this._instance=new BagApp();
            console.log(`【BagApp instance created】`);
            return this._instance;
        }
        return this._instance;
    }
    //领域模型
    private DomainBag:BagDomain;
    // private DomainBag:Bag;
    //训练界面UI
    private UIBag:BagEntry;
    //协助类
    private BagCells:BagCells;
    private BagPop:BagPop;

    //存储最新的背包槽点击
    private latestClickSlot:number;
    //存储当前系统的状态，UI是否存在
    uiLifeStatus:boolean=false;

    constructor(){
        DomainFactory.instance;
        this.DomainBag=DomainFactory.instance.getBagDomain();

        this.BagCells=new BagCells();
        this.BagPop=new BagPop();

        this.BagCells.OtherLinker(this.BagPop);
        this.BagPop.OtherLinker(this.BagCells);
    }

    LoadEntryUI(BagUI){
        this.UIBag=BagUI;
        this.uiLifeStatus=true;
        //加载协助类
        this.BagCells.LoadEntryUI(this.UIBag);
        this.BagPop.LoadEntryUI(this.UIBag);
    }
    UIDestroy(){
        this.UIBag=null;
        this.uiLifeStatus=false;
        //加载协助类
        this.BagCells.UIDestroy();
        this.BagPop.UIDestroy();
    }
    //数据提交到数据库
    commitData(){
        this.DomainBag.commitData();
    }

//提供给外部调用的方法
    trainUseItem(ItemSlotID:number,num:number){
        this.DomainBag.useTrainItem(ItemSlotID,num);
    }

    bagUseItem(){
        this.BagCells.bagUseItem(this.latestClickSlot,1);
    }

    getTrainItemList():DomainBagItem[]{
        let itemList=this.DomainBag.getTrainItemList();
        return itemList;
    }

    getDomainBagItem(slotID:number):DomainBagItem{
        let item=this.DomainBag.getDomainBagItem(slotID);
        return item;
    }


    buildBeginBagCells(){
        this.BagCells.buildBagCells("Item");
    }
    //主面板行为
    clickItemBox(slotID:number){
        console.log(`BagApp-点击背包槽:${slotID}`);
        this.latestClickSlot=slotID;
        this.BagPop.openItemPop(slotID);
    }

    clickWeaponBox(WeaponID:string){
        console.log("BagApplication: 点击武器框",WeaponID);
        this.BagPop.openWeaponPop(WeaponID);
    }
    SwitchToWeapon(){
        console.log("Bag App：切换到Weapon");
        this.BagCells.buildBagCells("Weapon");
    }
    SwitchToItem(){
        console.log("BagApp: 切换到Item");
        this.BagCells.buildBagCells("Item");
    }

    //弹窗行为
    ItemPopDeleteClick(){
        this.BagPop.openConfirmPop(this.latestClickSlot);
    }

    //确认窗行为
    ConfirmDeleteItem(){
        this.DomainBag.deleteBagItem(this.latestClickSlot);
        this.renewItemBag();
    }

    AddItem(ItemID:string,num:number){
        this.DomainBag.addBagItem(ItemID,num);
    }

    renewItemBag(){
        this.BagCells.buildBagCells("Item");
        this.BagPop.closeItemPop();
        this.BagPop.closeConfirmPop();
    }

}