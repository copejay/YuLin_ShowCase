import { _decorator, Component, Node } from 'cc';
import {Prefab} from 'cc';

import { PoolManager } from '../../../GlobalService';
import { RoleBoxView } from "../View/RoleBoxView"


const {ccclass, property} = _decorator;

@ccclass('TrainRoleViewSpawner')
export class TrainRoleViewSpawner extends Component{


    @property(Prefab)
    TrainRoleBoxViewPrefab:Prefab=null;


    getView(ParentNode:Node){
        let RoleBoxViewNode=PoolManager.instance.get(this.TrainRoleBoxViewPrefab,ParentNode);
        let View=RoleBoxViewNode.getComponent(RoleBoxView);
        return View;
    }

    recycle(View:RoleBoxView){
        PoolManager.instance.put(View.node);
    }

    update(deltaTime: number) {
        
    }
}


