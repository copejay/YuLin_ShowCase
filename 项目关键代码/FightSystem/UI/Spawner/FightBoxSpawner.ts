import { _decorator, Component, Node } from 'cc';
import {Prefab} from 'cc';
const { ccclass, property } = _decorator;


import { PoolManager } from "../../../GlobalService";
// import {Node,Prefab} from 'cc';
import { FightBoxView } from "../View/FightBoxView";



@ccclass('FightBoxSpawner')
export class FightBoxSpawner extends Component{


    // private poolManager:PoolManager;
    @property(Prefab)
    FightBoxViewPrefab:Prefab;


    get(parentNode:Node){
        let fightRoleViewNode=PoolManager.instance.get(this.FightBoxViewPrefab,parentNode);
        let fightRoleView=fightRoleViewNode.getComponent(FightBoxView);

        return fightRoleView;
    }

    recycle(fightBoxView:FightBoxView){
        PoolManager.instance.put(fightBoxView.node);
    }
}