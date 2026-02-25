
import { ItemUser } from "./BagDomainAt/ItemUser";
import { Bag } from "./BagDomainAt/Bag";
import { otherDomain } from "./BagDomainAt/otherDomain";

export interface BagDomainEnv{
    Bag:Bag;
    ItemUser:ItemUser;
    otherDomain:otherDomain;
}

import type { DomainBagItemTemplate, DomainBagItem,DomainSimpleBagItem } from "./DomainType";

export class BagDomain{

    private Bag:Bag;
    private ItemUser:ItemUser;
    private otherDomain:otherDomain;

    constructor(Env:BagDomainEnv){
        this.Bag=Env.Bag;
        this.ItemUser=Env.ItemUser;
        this.otherDomain=Env.otherDomain;

        this.DomainLinker();
    }

    DomainLinker(){
        this.Bag.LinkOtherDomain(this.ItemUser,this.otherDomain);
        this.ItemUser.LinkOtherDomain(this.Bag,this.otherDomain);
    }
    commitData(){
        console.log(`【Domain--BagDomain】commitData`)
        this.Bag.commitData();
    }

    useBagItem(slotID:number,count:number){
        this.Bag.useBagItem(slotID,count);
    };

    useTrainItem(ItemSlotID:number,num:number){
        this.Bag.useTrainItem(ItemSlotID,num);
    }

    getSimpleBagItem(slot:number):DomainSimpleBagItem{
        return this.Bag.getBagItem(slot);
    };

    getSimpleBagItemList():DomainSimpleBagItem[]{
        return this.Bag.getBagItemList();
    };

    getDomainBagItemList():DomainBagItem[]{
        return this.Bag.getDomainBagItemList();
    };

    getDomainBagItem(slotID:number):DomainBagItem{
        return this.Bag.getDomainBagItem(slotID);
    };

    getTrainItemList():DomainBagItem[]{
        return this.Bag.getTrainItemList();
    };

    reduceBagItem(slotID:number,count:number){
        this.Bag.reduceBagItem(slotID,count);
    };

    deleteBagItem(slotID:number){
        this.Bag.deleteBagItem(slotID);
    };

    addBagItem(id: string, count: number) {
        this.Bag.addBagItem(id,count);
    };



}