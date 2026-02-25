import { _decorator, Component, Node } from 'cc';

import {Label} from 'cc';
const { ccclass, property } = _decorator;

import { wrapText } from '../../../Infrastructure';

import { event } from '../BagPopManager';

@ccclass('DeleteConfirmPopEntry')
export class DeleteConfirmPopEntry extends Component {


    @property(Node)
    PopNode;

    @property(Node)
    PopContentNode;

    @property(Node)
    HintLabel;

    @property(Node)
    PopMask;

    @property(Node)
    ConfirmButton;

    @property(Node)
    CancelButton;

    callBack:(event:event)=>void;

    initCallBack(callBack:(event:event)=>void){
        this.callBack=callBack;
    }


    protected block() {
        const block = (e) => e.propagationStopped = true;
        this.PopContentNode.on(Node.EventType.TOUCH_START, block, this);
        this.PopContentNode.on(Node.EventType.TOUCH_END, block, this);
    }


    deleteConfirm(){
        this.callBack({callFrom:"DeleteConfirmPopEntry",type:"DeleteConfirm",data:null});
    }


    start() {
        this.close();
        this.PopMask.on(Node.EventType.TOUCH_END,this.close,this);
        this.block();
        this.CancelButton.on(Node.EventType.TOUCH_END,this.close,this);

        this.ConfirmButton.on(Node.EventType.TOUCH_END,this.deleteConfirm,this);
    }

    open(){
        this.PopNode.active=true;
    }

    close(){
        this.PopNode.active=false;
    }

    syncHintTip(name:string){
        let myLabel=wrapText(`你确定要删除【${name}】吗?`,13);
        this.HintLabel.getComponent(Label).string=myLabel;
    }
}


