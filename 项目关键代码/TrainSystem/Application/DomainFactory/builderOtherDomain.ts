

import { GlobalApp } from "../../DTO/OutApp.contract";

import { OtherDomain } from "../../Domain/TrainDomainAt/OtherDomain";
import { OtherDomainEnv} from "../../Domain/TrainDomainAt/OtherDomain";


function createOtherDomainEnv():OtherDomainEnv{

    return {
        createToastPop(msg:string):void{
            GlobalApp.instance.createToastPop(msg);
        },
        createHintPop(msg:string):void{
            GlobalApp.instance.createHintPop(msg);
        },
    }

}

export class builderOtherDomain{

    public domainOtherDomain:OtherDomain;

    constructor(){
        this.domainOtherDomain=new OtherDomain(createOtherDomainEnv());
    }

}