

import { builderBag } from "./builderBag";
import { builderItemUser } from "./builderItemUser";
import { builderOtherDomain } from "./builderOtherDomain";

import { BagDomain} from "../../Domain/BagDomain";
import { BagDomainEnv } from "../../Domain/BagDomain";



function createBagDomainEnv():BagDomainEnv{
    return {
        Bag:new builderBag().build(),
        ItemUser:new builderItemUser().build(),
        otherDomain:new builderOtherDomain().build(),
    }
}

export class builderBagDomain{

    private BagDomain:BagDomain;

    constructor(){
        this.BagDomain=new BagDomain(createBagDomainEnv());
    }

    build(){
        return this.BagDomain;
    }

}