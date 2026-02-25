
//和UI层进行通信需要的数据限制
import { UIStackItem } from "../../DTO/AppUI.contract";

//UI层接口
import { BagEntry } from "../BagApp";
//领域模型
import { DomainFactory } from "../DomainFactory/DomainFactory";

import { BagDomain } from "../../Domain/BagDomain";
//导入其它部分
import {BagPop} from './BagPop';

//处理角色面板的逻辑
export class BagCells{

    //领域模型
    private DomainBag:BagDomain;

    private UIBag:BagEntry;
    private uiLifeStatus:boolean=false;
    //其它部分
    private BagPop:BagPop;

    constructor(){

        this.DomainBag=DomainFactory.instance.getBagDomain();
    }

    LoadEntryUI(UIBag:BagEntry){
        this.UIBag=UIBag;
        this.uiLifeStatus=true;
    }
    UIDestroy(){
        this.UIBag=null;
        this.uiLifeStatus=false;
    }

    OtherLinker(BagPop:BagPop){
        this.BagPop=BagPop;
    }

    bagUseItem(SlotID:number,num:number){
        this.DomainBag.useBagItem(SlotID,num);

        this.buildBagCells("Item");
        this.BagPop.closeItemPop();
    }


    //同步物品
    buildBagCells(type){
        console.log(`BagSystem--BagCells--UIBag:${this.UIBag}`);
        //初始化物品信息列表
        if(type=="Item"){
            let ItemList=this.DomainBag.getDomainBagItemList();
            let UIStackItemList:UIStackItem[]=[];
            ItemList.forEach(item => {
                let i:UIStackItem={
                    slotID:item.slotID,
                    name:item.name,
                    count:item.count,
                    grade:item.level,
                };
                UIStackItemList.push(i);
            });

            this.UIBag.buildItemCells(UIStackItemList);
        }else if(type=="Weapon"){
           
        }
    }


}