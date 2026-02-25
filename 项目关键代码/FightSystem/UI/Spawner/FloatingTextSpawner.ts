
import { _decorator, Component, Node } from 'cc';
import {Prefab} from 'cc';
const { ccclass, property } = _decorator;


import { PoolManager } from "../../../GlobalService";

// import {Node,Prefab} from 'cc';

import { FloatingTextView } from "../View/FloatingTextView";

@ccclass('FloatingTextSpawner')
export class FloatingTextSpawner extends Component{

   
    @property(Prefab)
    FloatingTextPrefab:Prefab;


    get(parentNode:Node){
        let floatingTextNode=PoolManager.instance.get(this.FloatingTextPrefab,parentNode);
        let floatingTextView=floatingTextNode.getComponent(FloatingTextView);

        return floatingTextView;
    }
    

    recycle(floatingTextView:FloatingTextView){
        PoolManager.instance.put(floatingTextView.node);
    }

}