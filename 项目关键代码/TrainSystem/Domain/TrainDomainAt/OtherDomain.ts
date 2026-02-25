


export interface OtherDomainEnv{


    createToastPop(msg:string):void;

    createHintPop(msg:string):void;

}


export class OtherDomain{

    private OtherDomainEnv:OtherDomainEnv;

    constructor(OtherDomainEnv:OtherDomainEnv){
        this.OtherDomainEnv=OtherDomainEnv;
    }

    createToastPop(msg:string):void{
        this.OtherDomainEnv.createToastPop(msg);
    }
    createHintPop(msg:string):void{
        this.OtherDomainEnv.createHintPop(msg);
    }


}