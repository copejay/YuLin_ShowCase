
import {Bag,BagEnv} from "../../Domain/BagDomainAt/Bag";
import { DomainItemUseType ,DomainBagItemTemplate} from "../../Domain/BagType";

import { DataBaseService ,TemplateService} from "../../DTO/OutApp.contract";

import { BagItemValidator } from "./utils/BagItemValidator";

import { ItemUser } from "../../Domain/BagDomainAt/ItemUser";

import { builderItemUser } from "./builderItemUser";

export function createBagEnv():BagEnv{

    return {
        // trainItemUser:new builderTrainItemUser().getTrainItemUser(),

        setStackItem(StackItemID:string,Count:number){
            DataBaseService.instance.setStackItem(StackItemID,Count);
        },

        getItemList:()=>{
            let ItemList=DataBaseService.instance.getAllStackItem();
            return ItemList;
        },

        getItemTemplate(id) :DomainBagItemTemplate{
            let itemTemplate=TemplateService.instance.getStackItem(id);
           
            let item=BagItemValidator.parse(itemTemplate);

            return {
                name:item.name
                ,describe:item.describe
                ,level:item.level

                ,useType:item.useType
                ,useTarget:item.useTarget
                ,act:item.act
                ,actNum:item.actNum
            };
        },
    }
}

export class builderBag{

    public domainBag:Bag;

    constructor(){
        let bagEnv=createBagEnv();
        this.domainBag=new Bag(bagEnv);
    }

    build(){
        return this.domainBag;
    }

}