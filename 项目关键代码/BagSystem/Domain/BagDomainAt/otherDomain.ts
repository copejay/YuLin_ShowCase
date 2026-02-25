

export interface otherDomainEnv{

    createToastPop(msg:string):void;
    createHintPop(msg:string):void;

}


export class otherDomain{

    private Env:otherDomainEnv;

    constructor(env:otherDomainEnv){
        this.Env=env;
    }

    createToastPop(msg:string){
        this.Env.createToastPop(msg);
    }

    createHintPop(msg:string){
        this.Env.createHintPop(msg);
    }

}