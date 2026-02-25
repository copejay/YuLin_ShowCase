
import { _decorator, Component, Node } from 'cc';
import {Label} from "cc";
const { ccclass, property } = _decorator;

// import { ConfirmUseItem } from '../TrainPopManager';
import { UIUseItem } from '../TrainPopManager';

import {event} from '../TrainPopManager';

import { wrapText } from '../../../Infrastructure';

@ccclass('UseItemConfirmPop')
export class UseItemConfirmPop extends Component {

    //控制节点显隐性
    @property(Node)
    ActiveNode:Node;

    //确认与取消
    @property(Node)
    ConfirmBtn:Node;
    @property(Node)
    CancelBtn:Node;

    //控制使用数量
    @property(Node)
    UseItemNumNode:Node;

    @property(Node)
    NumAddBtn:Node;
    @property(Node)
    NumReduceBtn:Node;

    //物品具体信息
    @property({type:Node,tooltip:"物品名称节点"})
    ItemNameNode:Node;
    @property({type:Node,tooltip:"物品描述节点"})
    ItemDescribeNode:Node;

    UseItemNum:number=1;

    EventBus;

    initEventBus(EventBus){
        this.EventBus=EventBus;
    }

    close(){
        this.ActiveNode.active=false;
    }
    open(){
        this.ActiveNode.active=true;
    }
    listen(){
        this.CancelBtn.on(Node.EventType.TOUCH_END,this.close,this);

        this.NumAddBtn.on(Node.EventType.TOUCH_END,this.addItemNum,this);
        this.NumReduceBtn.on(Node.EventType.TOUCH_END,this.reduceItemNum,this);

        this.ConfirmBtn.on(Node.EventType.TOUCH_END,this.ConfirmBtnClick,this);
    }

    ConfirmBtnClick(){
        let event:event={callFrom:"UseItemConfirmPop",type:"ConfirmBtnClick",data:{UseItemNum:this.UseItemNum}};
        this.EventBus(event);
    }

    start(){
        this.listen();
        this.close();
    }

    setUseItemInfo(ConfirmUseItem:UIUseItem){
        console.log(`UseItemConfirmPop:setUseItemInfo:${ConfirmUseItem}`);
        let UseItemNameLabel=this.ItemNameNode.getComponent(Label);
        UseItemNameLabel.string=`【${ConfirmUseItem.name}】`;

        let describeText=wrapText(ConfirmUseItem.describe,18);
        let UseItemDescribeLabel=this.ItemDescribeNode.getComponent(Label);
        UseItemDescribeLabel.string=describeText;
    }

    setItemNum(){
        let UseItemNumLabel=this.UseItemNumNode.getComponent(Label);
        UseItemNumLabel.string=`【${this.UseItemNum.toString()}】`;
    }

    addItemNum(){
        this.UseItemNum++;
        this.setItemNum();
    }

    reduceItemNum(){
        if(this.UseItemNum<=1){
            return;
        }
        this.UseItemNum--;
        this.setItemNum();
    }


}