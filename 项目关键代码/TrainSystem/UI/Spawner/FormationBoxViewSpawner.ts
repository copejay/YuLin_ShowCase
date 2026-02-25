import { _decorator, Component, Node } from 'cc';
import {Prefab} from 'cc';

import { PoolManager } from '../../../GlobalService';

import { FormationBoxView } from "../View/FormationBoxView"

const { ccclass, property } = _decorator;

@ccclass('FormationBoxViewSpawner')
export class FormationBoxViewSpawner extends Component{

    @property(Prefab)
    FormationBoxViewPrefab:Prefab=null;


    getView(ParentNode:Node){
        let RoleBoxViewNode=PoolManager.instance.get(this.FormationBoxViewPrefab,ParentNode);
        let View=RoleBoxViewNode.getComponent(FormationBoxView);
        return View;
    }

    recycle(View:FormationBoxView){
        PoolManager.instance.put(View.node);
    }

    update(deltaTime: number) {
        
    }
}


