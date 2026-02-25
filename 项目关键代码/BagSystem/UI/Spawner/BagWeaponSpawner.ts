import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import {Prefab} from 'cc';

import { PoolManager } from '../../../GlobalService';
import {WeaponBoxView} from '../View/WeaponBoxView'; 

@ccclass('BagWeaponSpawner')
export class BagWeaponSpawner extends Component {

    @property(Prefab)
    WeaponBoxViewPrefab:Prefab;

    getWeaponBoxView(ParentNode:Node){
        let WeaponBoxViewNode=PoolManager.instance.get(this.WeaponBoxViewPrefab,ParentNode);
        let myWeaponBoxView=WeaponBoxViewNode.getComponent(WeaponBoxView);
        return myWeaponBoxView;
    }

    recycle(WeaponBoxView:WeaponBoxView){
        PoolManager.instance.put(WeaponBoxView.node);
    }
}


