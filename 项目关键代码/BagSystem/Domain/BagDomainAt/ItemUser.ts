

import { Bag } from "./Bag";

export interface ItemUserEnv{

    addRoleSpeed(speed:number):void;

    addRoleStrong(strong:number):void;

    addRoleBlood(blood:number):void;

    addRoleSmart(smart:number):void;

    addRoleQiExp(QiExp:number):void;

    addRoleTiExp(TiExp:number):void;

    getRandomPoolItem(PoolLevel:number):string;
}

import { otherDomain } from "./otherDomain";

export class ItemUser{

    private Env:ItemUserEnv;

    private Bag:Bag;
    private OtherDomain:otherDomain;

    constructor(private env:ItemUserEnv){
        this.Env=env;
    }

    LinkOtherDomain(Bag:Bag,OtherDomain:otherDomain){
        this.Bag=Bag;
        this.OtherDomain=OtherDomain;
    }

    useBagItem(useTarget:string,act:string,num:number,count:number){
        let poolLevel:number=0;
        let ItemID:string;
        switch(useTarget){
            case "pt_pool":poolLevel=1;
            break;
            case "xy_pool":poolLevel=2;
            break;
            case "ss_pool":poolLevel=3;
            break;
            case "cq_pool":poolLevel=4;
            break;
        }
        // console.log(`Bag--Domain--ItemUse-获取到物品池等级：${poolLevel}`);
        ItemID=this.Env.getRandomPoolItem(poolLevel);
        if(poolLevel==0){
            this.OtherDomain.createToastPop("背包物品功能未知！");
            return;
        }
        this.Bag.addBagItem(ItemID,num*count)
    }

    useTrainItem(useTarget:string,act:string,num:number,count:number){
        if(useTarget=="QiExp"){
            this.Env.addRoleQiExp(num*count);
        }else if(useTarget=="TiExp"){
            this.Env.addRoleTiExp(num*count);
        }else if(useTarget=="Speed"){
            this.Env.addRoleSpeed(num*count);
        }else if(useTarget=="Strong"){
            this.Env.addRoleStrong(num*count);
        }else if(useTarget=="Blood"){
            this.Env.addRoleBlood(num*count);
        }else if(useTarget=="Smart"){
            this.Env.addRoleSmart(num*count);
        }else{
            this.OtherDomain.createToastPop("训练物品功能未知！");
        }
    }

}