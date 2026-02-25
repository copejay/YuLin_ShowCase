

import { builderTrainDomain } from "./ZbuilderTrainDomain";

export class DomainFactory{

    private static _instance:DomainFactory;

    public static get instance(){
        if(!this._instance){
            this._instance=new DomainFactory();
        }
        return this._instance;
    }

    private builderTrainDomain:builderTrainDomain;
    private inited:boolean=false;

    constructor(){
        this.builderTrainDomain=new builderTrainDomain();
    }


    getTrainDomain(){
        return this.builderTrainDomain.domainTrainDomain;
    }

}