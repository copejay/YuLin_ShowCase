import { _decorator, Component, Node } from 'cc';
import {Prefab} from 'cc';

import { PoolManager } from '../../../GlobalService';
// import { RoleBoxView } from "../View/RoleBoxView"
import { FormationRoleView } from "../View/FormationRoleView"

const { ccclass, property } = _decorator;

@ccclass('FormationRoleViewSpawner')
export class FormationRoleViewSpawner extends Component{

  
    @property(Prefab)
    FormationRoleViewPrefab:Prefab=null;



    getView(ParentNode:Node){
        let RoleBoxViewNode=PoolManager.instance.get(this.FormationRoleViewPrefab,ParentNode);
        let View=RoleBoxViewNode.getComponent(FormationRoleView);
        return View;
    }

    recycle(View:FormationRoleView){
        PoolManager.instance.put(View.node);
    }

    update(deltaTime: number) {
        
    }
}


