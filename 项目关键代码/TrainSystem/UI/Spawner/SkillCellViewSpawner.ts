import { _decorator, Component, Node } from 'cc';
import {Prefab} from 'cc';

import { PoolManager } from '../../../GlobalService';
import { SkillCellView } from "../View/SkillCellView"


const {ccclass, property} = _decorator;

@ccclass('SkillCellViewSpawner')
export class SkillCellViewSpawner extends Component{


    @property(Prefab)
    SkillCellViewPrefab:Prefab=null;


    getView(ParentNode:Node){
        let SkillCellViewNode=PoolManager.instance.get(this.SkillCellViewPrefab,ParentNode);
        let View=SkillCellViewNode.getComponent(SkillCellView);
        return View;
    }

    recycle(View:SkillCellView){
        PoolManager.instance.put(View.node);
    }

    update(deltaTime: number) {
        
    }
}


