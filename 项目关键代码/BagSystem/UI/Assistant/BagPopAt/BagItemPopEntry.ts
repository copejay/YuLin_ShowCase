import { _decorator, Component, Node } from 'cc';

import {Label} from 'cc';
const { ccclass, property } = _decorator;

import { wrapText } from '../../../Infrastructure';

import {event} from '../BagPopManager';

@ccclass('BagItemPopEntry')
export class BagItemPopEntry extends Component {


    @property(Node)
    ItemPopNode;

    @property(Node)
    PopContentNode;

    @property(Node)
    Name;

    @property(Node)
    Describe;

    @property(Node)
    PopMask;

    @property(Node)
    RightBtn;
    @property(Node)
    LeftBtn;
    @property(Node)
    RightBtnLabelNode;
    @property(Node)
    LeftBtnLabelNode;

    @property(Node)
    CloseBtn;

    callBack:(event:event)=>void;

    useType:string;


    protected block() {
        const block = (e) => e.propagationStopped = true;
        this.PopContentNode.on(Node.EventType.TOUCH_START, block, this);
        this.PopContentNode.on(Node.EventType.TOUCH_END, block, this);
    }


    start() {
        this.close();
        this.PopMask.on(Node.EventType.TOUCH_END,this.close,this);
        this.block();
        this.RightBtn.on(Node.EventType.TOUCH_END,this.RightBtnClick,this);
        this.LeftBtn.on(Node.EventType.TOUCH_END,this.LeftBtnClick,this);

        this.CloseBtn.on(Node.EventType.TOUCH_END,this.close,this);
    }

    open(){
        this.ItemPopNode.active=true;
    }

    close(){
        this.ItemPopNode.active=false;
    }

    initCallBack(callBack){
        this.callBack=callBack;
    }

    LeftBtnClick(){
        if(this.useType=="bagUse"){
            if(this.callBack){
                this.callBack({
                    callFrom:"ItemPopEntry",
                    type:"UseClick",
                    data:null,
                })
            }
        }else{
            this.close();
        }
    }

    RightBtnClick(){
        if(this.callBack){
            this.callBack({
                callFrom:"ItemPopEntry",
                type:"DeleteClick",
                data:null,
            })
        }
    }

    setLeftBtnLabel(label:string){
        this.LeftBtnLabelNode.getComponent(Label).string=label;
    }

    syncNameCount(name,count){
        let myLabel=`【${name}】 x${count}`;
        this.Name.getComponent(Label).string=myLabel;
    }

    syncDescribe(describe){
        let myDescribe=wrapText(describe,17);
        this.Describe.getComponent(Label).string=myDescribe;
    }

    syncItemType(useType:string){
        if(useType!="bagUse"){
            this.setLeftBtnLabel("返回");
        }else{
            this.setLeftBtnLabel("使用");
        }
        this.useType=useType;
    }

}


