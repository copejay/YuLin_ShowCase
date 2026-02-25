
import { _decorator, Component, Node } from 'cc';
import {Prefab} from 'cc';
const { ccclass, property } = _decorator;


import { PoolManager } from "../../../GlobalService";
// import {Node,Prefab} from 'cc';
import { FightRoleView } from "../View/FightRoleView";




@ccclass('FightRoleSpawner')
export class FightRoleSpawner extends Component{

    // private poolManager:PoolManager;
    @property(Prefab)
    FightRoleViewPrefab:Prefab;


    get(parentNode:Node){
        let fightRoleViewNode=PoolManager.instance.get(this.FightRoleViewPrefab,parentNode);
        let fightRoleView=fightRoleViewNode.getComponent(FightRoleView);

        return fightRoleView;
    }

    recycle(fightRoleView:FightRoleView){
        PoolManager.instance.put(fightRoleView.node);
    }

}