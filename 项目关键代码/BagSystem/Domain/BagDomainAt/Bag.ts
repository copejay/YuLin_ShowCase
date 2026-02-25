export type Item = {
    id: string;
    count: number;
}


import {ItemUser } from "./ItemUser";

import type { DomainBagItemTemplate, DomainBagItem,DomainSimpleBagItem } from "../DomainType";

import { otherDomain } from "./otherDomain";

export interface BagEnv{

    // trainItemUser:TrainItemUser;

    setStackItem(StackItemID:string,Count:number):void;

    getItemList():Item[];

    getItemTemplate(id:string):DomainBagItemTemplate;

}

export class Bag {

    private originItemList: Item[] = [];
    private BagItemList:DomainSimpleBagItem[]=[];

    private static readonly MAX_STACK = 99;

    private BagEnv:BagEnv;

    private trainItemUser:ItemUser;
    private otherDomain:otherDomain;

    constructor(env:BagEnv) {
        this.BagEnv=env;
        this.init();
    }

    LinkOtherDomain(TrainItemUser:ItemUser,otherDomain:otherDomain){
        this.trainItemUser=TrainItemUser;
        this.otherDomain=otherDomain;
    }

    init(){
        let itemList=this.BagEnv.getItemList();
        this.originItemList = itemList;
        this.BagItemList=this.buildBagItemList(itemList);
    }

    commitData(){
        let list=this.exportItemList();
        list.forEach(item => {
            console.log(`Bag--commitData:${item.id},${item.count}`);
            this.BagEnv.setStackItem(item.id,item.count);
        });
    }

    useBagItem(ItemSlotID:number,count:number){
        if(this.checkItemCount(ItemSlotID,count)==false){
            this.otherDomain.createToastPop("物品数量不足！");
            return;
        }
        let itemTemplate=this.getDomainBagItem(ItemSlotID);
        this.otherDomain.createToastPop(`背包:消耗${count}个${itemTemplate.name}`);
       
        let item:DomainBagItem=this.getDomainBagItem(ItemSlotID);
        this.trainItemUser.useBagItem(item.useTarget,item.act,item.num,count);

        this.reduceBagItem(ItemSlotID,count);
    }

    useTrainItem(ItemSlotID:number,count:number){
        if(this.checkItemCount(ItemSlotID,count)==false){
            this.otherDomain.createToastPop("物品数量不足！");
            return;
        }
        // this.reduceBagItem(ItemSlotID,count);
        let itemTemplate=this.getDomainBagItem(ItemSlotID);
        this.otherDomain.createToastPop(`背包:消耗${count}个${itemTemplate.name}`);
       
        let item:DomainBagItem=this.getDomainBagItem(ItemSlotID);
        this.trainItemUser.useTrainItem(item.useTarget,item.act,item.num,count);

        this.reduceBagItem(ItemSlotID,count);
    }

    checkItemCount(ItemSlotID:number,count:number):boolean{
        let item:DomainSimpleBagItem = this.BagItemList.find((item) => item.slotID === ItemSlotID);
        if (!item) {
            return false;
        }
        return item.count>=count;
    }

    getBagItemList():DomainSimpleBagItem[]{
        return this.BagItemList;
    }

    getBagItem(slot:number):DomainSimpleBagItem{
        const item:DomainSimpleBagItem = this.BagItemList.find((item) => item.slotID === slot);
        if (!item) {
            return null;
        }
        return item;
    }

    getDomainBagItemList():DomainBagItem[]{
        let itemList=this.BagItemList;
        let domainItemList: DomainBagItem[] = [];
        itemList.forEach(item => {
            domainItemList.push(this.getDomainBagItem(item.slotID));
        });
        return domainItemList;
    }

    getDomainBagItem(slotID:number):DomainBagItem{
        let item:DomainSimpleBagItem = this.BagItemList.find((item) => item.slotID === slotID);
        console.log(`!log--Bag:接收获取背包物品，槽位:${slotID}`);
        if (!item) {
            return null;
        }
        let itemTemplate=this.BagEnv.getItemTemplate(item.id);
        // if(itemTemplate.useType=="roleTrain"){
        return {
            slotID:item.slotID,
            id:item.id,
            count:item.count,

            name:itemTemplate.name,
            describe:itemTemplate.describe,
            level:itemTemplate.level,

            useType:itemTemplate.useType,
            useTarget:itemTemplate.useTarget,
            act:itemTemplate.act,
            num:itemTemplate.actNum,
        };
        // }
        // return null;
    }

    getTrainItemList():DomainBagItem[]{
        let itemList=this.BagItemList;
        let trainItemList: DomainBagItem[] = [];
        itemList.forEach(item => {
            let itemTemplate=this.BagEnv.getItemTemplate(item.id);
            if(itemTemplate.useType=="roleTrain"){
                trainItemList.push({
                    slotID:item.slotID,
                    id:item.id,
                    count:item.count,

                    name:itemTemplate.name,
                    describe:itemTemplate.describe,
                    level:itemTemplate.level,

                    useType:itemTemplate.useType,
                    useTarget:itemTemplate.useTarget,
                    act:itemTemplate.act,
                    num:itemTemplate.actNum,
                });
            }
        });
        return trainItemList;
    }

    reduceBagItem(slotID:number,count:number){
        let item = this.BagItemList.find((item) => item.slotID === slotID);
        if (!item) {
            return;
        }
        item.count -= count;

        if (item.count <= 0) {
            this.deleteBagItem(slotID);
        }
    }

    deleteBagItem(slotID:number){
        const item = this.BagItemList.find((item) => item.slotID === slotID);
        if (!item) {
            return;
        }

        let itemTemplate=this.BagEnv.getItemTemplate(item.id);
        this.otherDomain.createToastPop(`背包:删除【${itemTemplate.name}】`);

        this.BagItemList = this.BagItemList.filter((item) => item.slotID !== slotID);//保留所有不满足条件的元素
    }


    addBagItem(id: string, count: number) {
        const origin = this.exportItemList();

        const item = origin.find(i => i.id === id);
        if (item) {
            item.count += count;
        } else {
            origin.push({ id, count });
        }

        let itemTemplate=this.BagEnv.getItemTemplate(id);
        this.otherDomain.createToastPop(`背包:【${itemTemplate.name}】增加${count}个`);

        this.originItemList = origin;
        this.BagItemList = this.buildBagItemList(origin);
    }



    exportItemList(): Item[] {
        const map = new Map<string, number>();

        this.BagItemList.forEach(bagItem => {
            const oldCount = map.get(bagItem.id) ?? 0;//检测以前是否出现过
            map.set(bagItem.id, oldCount + bagItem.count);
        });

        const result: Item[] = [];

        map.forEach((count, id) => {
            result.push({ id, count });
        });

        return result;
    }



    buildBagItemList(items: Item[]): DomainSimpleBagItem[] {
        const bagItemList: DomainSimpleBagItem[] = [];
        let slotNum = 0;

        for (const item of items) {
            let remain = item.count;

            while (remain > 0) {
                const stackCount = Math.min(remain, Bag.MAX_STACK);

                bagItemList.push({
                    slotID: slotNum,
                    id: item.id,
                    count: stackCount
                });

                remain -= stackCount;
                slotNum++;
            }
        }

        return bagItemList;
    }

}
