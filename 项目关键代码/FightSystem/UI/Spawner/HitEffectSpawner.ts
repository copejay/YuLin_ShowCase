
import { _decorator, Component, Node } from 'cc';
import {Prefab} from 'cc';
const { ccclass, property } = _decorator;


import { PoolManager } from "../../../GlobalService";

// import {Node,Prefab} from 'cc';

import { HitEffectView } from "../View/HitEffectView";


@ccclass('HitEffectSpawner')
export class HitEffectSpawner extends Component{


    @property(Prefab)
    HitEffectViewPrefab:Prefab;


    get(parentNode:Node){
        let prefabNode=PoolManager.instance.get(this.HitEffectViewPrefab,parentNode);
        let View=prefabNode.getComponent(HitEffectView);

        return View;
    }
    

    recycle(floatingTextView:HitEffectView){
        PoolManager.instance.put(floatingTextView.node);
    }

}