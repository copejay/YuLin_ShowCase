


import { Fight } from "../../Domain/Fight";
import { builderFight } from "./zbuilderFight";

export class DomainFactory{

    public static _instance:DomainFactory;

    public static get instance(){
        if(!this._instance){
            this._instance=new DomainFactory();
            return this._instance;
        }else{
            return this._instance;
        }
    }
    private FightDomain:Fight;

    constructor(){
        this.FightDomain = new builderFight().getFight();
    }

    getFightDomain(){
        return this.FightDomain;
    }
}