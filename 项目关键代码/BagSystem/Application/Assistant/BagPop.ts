
import { UIPopStackItem } from "../../DTO/AppUI.contract";

//UI层接口
import { BagEntry } from "../BagApp";
//领域接口
import { DomainFactory } from "../DomainFactory/DomainFactory";
import { BagDomain } from "../../Domain/BagDomain";
//other
import { BagCells } from "./BagCells";
import { Bag } from "../../Domain/BagDomainAt/Bag";

//处理角色弹窗的逻辑
export class BagPop{

    DomainBag:BagDomain;
    //前端ui
    UIBag:BagEntry;
    uiLifeStatus:boolean=false;
    //
    BagCells:BagCells;


    constructor(){
        this.DomainBag=DomainFactory.instance.getBagDomain();
    }

    OtherLinker(BagCells:BagCells){
        this.BagCells=BagCells;
    }

    LoadEntryUI(ui:BagEntry){
        this.UIBag=ui;
        this.uiLifeStatus=true;
    }
    UIDestroy(){
        this.UIBag=null;
        this.uiLifeStatus=false;
    }

    //关闭物品弹窗
    closeItemPop(){
        this.UIBag.closeItemPop();
    }
    closeConfirmPop(){
        this.UIBag.closeConfirmPop();
    }

    openItemPop(slotID:number){
        this.UIBag.openItemPop(this.getUIPopStackItem(slotID));
    }
    openWeaponPop(WeaponID:string){
      
    }
    
    openConfirmPop(slotID:number){
        let bagItem=this.DomainBag.getDomainBagItem(slotID);
        this.UIBag.openConfirmPop(bagItem.name);
    }


//获取数据方法
    getUIPopStackItem(slotID:number):UIPopStackItem{
        let item=this.DomainBag.getDomainBagItem(slotID);

        let UIPopStackItem:UIPopStackItem={
            id:item.id,
            name:item.name,
            count:item.count,
            level:item.level,
            describe:item.describe,
            useType:item.useType,
        }
        return UIPopStackItem;
    }

}