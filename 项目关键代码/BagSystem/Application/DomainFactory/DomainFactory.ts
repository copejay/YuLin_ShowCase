
import { builderBagDomain } from "./zbuilderBagDomain";


export class DomainFactory{

    private static _instance:DomainFactory;

    public static get instance(){
        if(!this._instance){
            this._instance=new DomainFactory();
        }
        return this._instance;
    }

    // private builderFightFormation:builderFightFormation;
    private builderBagDomain:builderBagDomain;
    // private builderRoleFactory:builderRoleFactory;
    private inited:boolean=false;

    constructor(){
        this.builderBagDomain=new builderBagDomain();

    }

    getBagDomain(){
        return this.builderBagDomain.build();
    }

}