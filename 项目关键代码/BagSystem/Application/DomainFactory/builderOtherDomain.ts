
import {otherDomain} from '../../Domain/BagDomainAt/otherDomain';
import type {otherDomainEnv} from '../../Domain/BagDomainAt/otherDomain';


import { GlobalApp } from '../../DTO/OutApp.contract';


function builderOtherDomainEnv(){

    return {
        createToastPop(msg:string){
            GlobalApp.instance.createToastPop(msg);
        },
        createHintPop(msg:string){
            GlobalApp.instance.createHintPop(msg);
        }
    }
};

export class builderOtherDomain{

    private otherDomain:otherDomain;

    constructor(){
        this.otherDomain=new otherDomain(builderOtherDomainEnv());
    }

    build(){
        return this.otherDomain;
    }

}