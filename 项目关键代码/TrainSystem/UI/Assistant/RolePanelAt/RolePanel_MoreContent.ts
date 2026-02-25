import { _decorator, Component, Node } from 'cc';
import {Label} from "cc";
const { ccclass, property } = _decorator;


import { FightRoleInfo } from '../RolePanelEntry';

import {event} from '../TrainPopManager';

@ccclass('RolePanel_MoreContent')
export class RolePanel_MoreContent extends Component {

    @property({type:Node,tooltip:"ActiveNode"})
    ActiveNode;

    @property(Label)
    SpeedLabel:Label;
    @property(Label)
    AttackLabel:Label;
    @property(Label)
    DefenseLabel:Label;
    @property(Label)
    HpLabel:Label;
    @property(Label)
    MpLabel:Label;
    @property(Label)
    AddHpLabel:Label;
    @property(Label)
    AddMpLabel:Label;

    @property(Node)
    DeleteRoleBtn:Node;

    // private TrainApp;
    private EventBus;

    start(){
        // this.initAt();
    }

    setMoreInfo(info:FightRoleInfo){
        this.SpeedLabel.string=info.speed.toString();
        this.AttackLabel.string=info.attack.toString();
        this.DefenseLabel.string=info.defense.toString();
        this.HpLabel.string=info.hp.toString();
        this.MpLabel.string=info.mp.toString();
        this.AddHpLabel.string=info.addHp.toString();
        this.AddMpLabel.string=info.addMp.toString();
    }

    initEventBus(EventBus){
        this.listen();
        this.EventBus=EventBus;
        this.close();
    }

    listen(){
        this.DeleteRoleBtn.on(Node.EventType.TOUCH_END,this.deleteRoleBtnClick,this);
    }

    deleteRoleBtnClick(){
        let event:event={
            callFrom:"MoreContent",
            type:"DeleteRoleClick",
            data:"null"
        }
        this.EventBus(event);

    }

    // initApp(app){
    //     this.TrainApp=app;
    //     this.close();
    // }


    open(){
        this.ActiveNode.active=true;
    }

    close(){
        this.ActiveNode.active=false;
    }


}


