import { _decorator, Component, Node } from 'cc';
import {Label} from "cc";
const { ccclass, property } = _decorator;

// import { RoleRow } from '../../../GlobalService';

@ccclass('BaseContent_FightInfo')
export class BaseContent_FightInfo extends Component {


//fightInfo
    @property(Node)
    FtStrongLabel:Node;
    @property(Node)
    FtSpeedLabel:Node;
    @property(Node)
    FtBloodLabel:Node;
    @property(Node)
    FtSmartLabel:Node;;


    setFightInfo(strong,speed,blood,smart){
        this.FtStrongLabel.getComponent(Label).string=`${strong}`;
        this.FtSpeedLabel.getComponent(Label).string=`${speed}`;
        this.FtBloodLabel.getComponent(Label).string=`${blood}`;
        this.FtSmartLabel.getComponent(Label).string=`${smart}`;
    }

}


