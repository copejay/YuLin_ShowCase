
import { FightManager } from "./Assitant2/A_FightManager";

export interface FightEnv{
    FightManager:FightManager;
}

export class Fight{

    env:FightEnv;
    private FightManager:FightManager;

    constructor(env:FightEnv){
        this.env=env;
        this.FightManager=env.FightManager;
    }

    NewFight(){
        this.FightManager.NewFight();
    }
    Update(dt:number){
        this.FightManager.Update(dt);
    }
    checkFightClose(){
        return this.FightManager.checkFightClose();
    }
    FightRetreat(){
        this.FightManager.FightRetreat();
    }

    FightSpeedChange(){
        this.FightManager.FightSpeedChange();
    }

    exportRoleList(){return this.FightManager.exportRoleList();}
    exportHitEffectList(){return this.FightManager.exportHitEffectList();}
    exportFloatingTextList(){return this.FightManager.exportFloatingTextList();}
    exportBoardBoxList(){return this.FightManager.exportBoardBoxList();}

}