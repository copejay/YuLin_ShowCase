


import { DomainFactory } from "../DomainFactory/DomainFactory";
import { TrainDomain } from "../../Domain/TrainDomain";


import { RoleBaseInfo,RoleFightInfo } from "../../Domain/TrainType";

export class DataComposer{


    private TrainDomain:TrainDomain;

    constructor(){
        this.TrainDomain=DomainFactory.instance.getTrainDomain();
    }
    
    getFightInfo(RoleID:string){
        this.TrainDomain.initRole(RoleID);
        let FightRole=this.TrainDomain.getFightRole();
        let FightInfo={
            speed:FightRole.speed,
            attack:FightRole.attack,
            defense:FightRole.defense,
            hp:FightRole.hp,
            mp:FightRole.mp,
            addHp:FightRole.addHp,
            addMp:FightRole.addMp,
        }
        return FightInfo;
    }

    getRoleBaseInfo(RoleID:string):RoleBaseInfo{
        this.TrainDomain.initRole(RoleID);
        let RoleBaseInfo=this.TrainDomain.getRoleBaseInfo();
        return RoleBaseInfo;
    }

}