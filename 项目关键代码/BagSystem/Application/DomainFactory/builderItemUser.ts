
import { TrainApplication } from "../../DTO/OutApp.contract";
import { GachaApplication } from "../../DTO/OutApp.contract";

import { ItemUser } from "../../Domain/BagDomainAt/ItemUser";
import type { ItemUserEnv } from "../../Domain/BagDomainAt/ItemUser";

export function buildItemUserEnv():ItemUserEnv{


    return {
        addRoleQiExp(QiExp) {
            TrainApplication.instance.addQiExp(QiExp);
        },
        addRoleTiExp(TiExp) {
            TrainApplication.instance.addTiExp(TiExp);
        },
        addRoleSpeed(Speed) {
            TrainApplication.instance.addSpeed(Speed);
        },
        addRoleStrong(Strong) {
            TrainApplication.instance.addStrong(Strong);
        },
        addRoleBlood(Blood) {
            TrainApplication.instance.addBlood(Blood);
        },
        addRoleSmart(Smart) {
            TrainApplication.instance.addSmart(Smart);
        },
        getRandomPoolItem(PoolLevel:number){
            return GachaApplication.instance.getRandomPoolItem(PoolLevel);
        }
    }

}

export class builderItemUser{

     private ItemUser:ItemUser;

     constructor(){
        this.ItemUser=new ItemUser(buildItemUserEnv());
     }

     build(){
        return this.ItemUser;
     }

}