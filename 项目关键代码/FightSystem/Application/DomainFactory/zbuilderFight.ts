import { builderFightManager } from "./builderFightManager";

import { FightEnv } from "../../Domain/Fight";
import { Fight } from "../../Domain/Fight";

function createFightEnv():FightEnv{
    let fightManager=new builderFightManager().getFightManager();

    return{
        FightManager:fightManager,
    }
}

export class builderFight{

    private Fight:Fight;

    constructor(){
        this.Fight=new Fight(createFightEnv());
    }

    getFight(){
        return this.Fight;
    }

}

