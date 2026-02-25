import { _decorator, Component, Node } from 'cc';
import {Prefab} from 'cc';

import { PoolManager } from '../../../GlobalService';
// import { RoleBoxView } from "../View/RoleBoxView"
import { TrainUseItemView } from '../View/TrainUseItemView';

const {ccclass, property} = _decorator;

@ccclass('TrainUseItemSpawner')
export class TrainUseItemSpawner extends Component{


    @property(Prefab)
    TrainUseItemPrefab:Prefab=null;


    getView(ParentNode:Node){
        let ViewNode=PoolManager.instance.get(this.TrainUseItemPrefab,ParentNode);
        let View=ViewNode.getComponent(TrainUseItemView);
        return View;
    }

    recycle(View:TrainUseItemView){
        PoolManager.instance.put(View.node);
    }

    update(deltaTime: number) {
        
    }
}


