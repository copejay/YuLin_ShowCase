import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import {Label} from 'cc';

import { wrapText } from '../../Infrastructure';

@ccclass('TrainUseItemView')
export class TrainUseItemView extends Component {

    @property(Node)
    ViewNode:Node;

    @property(Node)
    NameLabelNode:Node;
    @property(Node)
    NumLabelNode:Node;

    slotID:number;

    private ClickCB:(slotID:number)=>void;

    listen(){
        this.ViewNode.on(Node.EventType.TOUCH_END,this.click,this)
    }


    click(){
        this.ClickCB(this.slotID);
    }


    setID(ID:number){
        this.slotID=ID;
    }
    setClickCB(id:number,clickCB:(slotID:number)=>void){
        this.setID(id);
        this.ClickCB=clickCB;
    }
    setName(Name:string){
        this.NameLabelNode.getComponent(Label).string=Name;
    }

    setNum(Num:number){
        this.NumLabelNode.getComponent(Label).string=`${Num}`;
    }

    setPosition(x:number,y:number){
        this.node.setPosition(x,y);
    }

    start() {
        this.listen();
    }

    update(deltaTime: number) {
        
    }
}


