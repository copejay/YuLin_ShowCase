import { _decorator, Component, Node } from 'cc';
import {Prefab} from 'cc';
const { ccclass, property } = _decorator;

// import { PoolManager } from '../../../Infrastructure';
import { PoolManager } from '../../../GlobalService';
import { ItemBoxView } from "../View/ItemBoxView"


@ccclass('BagItemSpawner')
export class BagItemSpawner extends Component {
    @property(Prefab)
    ItemBoxViewPrefab:Prefab;

    getItemBoxView(ParentNode:Node){
        let ItemBoxViewNode=PoolManager.instance.get(this.ItemBoxViewPrefab,ParentNode);
        let myItemBoxView=ItemBoxViewNode.getComponent(ItemBoxView);
        return myItemBoxView;
    }

    recycle(ItemBoxView:ItemBoxView){
        PoolManager.instance.put(ItemBoxView.node);
    }

}


