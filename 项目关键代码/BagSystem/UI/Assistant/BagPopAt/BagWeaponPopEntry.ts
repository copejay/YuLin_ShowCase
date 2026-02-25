import { _decorator, Component, Node } from 'cc';

import {Label} from 'cc';
const { ccclass, property } = _decorator;

import { WeaponRow } from '../../../../GlobalService';

@ccclass('BagWeaponPopEntry')
export class BagWeaponPopEntry extends Component {

    @property(Node)
    WeaponPopNode:Node;

    @property(Node)
    NameNode:Node;

    @property(Node)
    ArchiveTimeNode:Node;

    @property(Node)
    InfoNode:Node;

    @property(Node)
    CloseButton:Node;


    close(){
        this.WeaponPopNode.active=false;
    }

    open(){
        this.WeaponPopNode.active=true;
    }


    syncInfo(WeaponInfo:WeaponRow){
        this.NameNode.getComponent(Label).string=WeaponInfo.name;
        this.ArchiveTimeNode.getComponent(Label).string=WeaponInfo.archiveTime.toString();
        this.InfoNode.getComponent(Label).string=WeaponInfo.info;
    }



    start() {
        this.CloseButton.on(Node.EventType.TOUCH_END,this.close,this);
        this.close();
    }

    update(deltaTime: number) {
        
    }
}


