
import { _decorator, Component, Node } from 'cc';
import {Label} from "cc";
const { ccclass, property } = _decorator;

// import { ConfirmUseItem } from '../TrainPopManager';
import {event} from '../TrainPopManager';

import { wrapText } from '../../../Infrastructure';

import { SkillUpForgetInfo } from '../TrainPopManager';

@ccclass('SkillUpForgetPop')
export class SkillUpForgetPop extends Component {

    //控制节点显隐性
    @property(Node)
    ActiveNode:Node;

    @property(Label)
    SkillNameLabel:Label;
    @property(Label)
    SkillLevelLabel:Label;
    @property(Label)
    UpNeedLabel:Label;

    //确认与取消
    @property(Node)
    UpBtn:Node;
    @property(Node)
    ForgetBtn:Node;

    @property(Node)
    CloseBtn:(Node);
    // //控制使用数量
    // @property(Node)
    // UseItemNumNode:Node;

    // @property(Node)
    // NumAddBtn:Node;
    // @property(Node)
    // NumReduceBtn:Node;

    // //物品具体信息
    // @property({type:Node,tooltip:"物品名称节点"})
    // ItemNameNode:Node;
    // @property({type:Node,tooltip:"物品描述节点"})
    // ItemDescribeNode:Node;

    // UseItemNum:number=1;

    EventBus;

    listen(){
        this.CloseBtn.on(Node.EventType.TOUCH_END,this.close,this);
        this.UpBtn.on(Node.EventType.TOUCH_END,this.UpBtnClick,this);
        this.ForgetBtn.on(Node.EventType.TOUCH_END,this.ForgetBtnClick,this);
    }

    initEventBus(EventBus){
        this.EventBus=EventBus;
        this.close();
        this.listen();
    }

    UpBtnClick(){

    }

    ForgetBtnClick(){
        
    }

    close(){
        this.ActiveNode.active=false;
    }
    open(){
        this.ActiveNode.active=true;
    }

    setSkillUpForgetInfo(Info:SkillUpForgetInfo){
        this.setSkillName(Info.skillName);
        this.setSkillLevel(Info.skillLevel);
        this.setUpNeed(Info.skillUpNeed);
    }

    setSkillName(name:string){
        this.SkillNameLabel.string=name;
    }
    setSkillLevel(level:number){
        this.SkillLevelLabel.string=`${level.toString()}`;
    }
    setUpNeed(need:number){
        this.UpNeedLabel.string=`${need.toString()}`;
    }


    // listen(){
    //     this.CancelBtn.on(Node.EventType.TOUCH_END,this.close,this);

    //     this.NumAddBtn.on(Node.EventType.TOUCH_END,this.addItemNum,this);
    //     this.NumReduceBtn.on(Node.EventType.TOUCH_END,this.reduceItemNum,this);

    //     this.ConfirmBtn.on(Node.EventType.TOUCH_END,this.ConfirmBtnClick,this);
    // }

    // ConfirmBtnClick(){
    //     let event:event={callFrom:"UseItemConfirmPop",type:"ConfirmBtnClick",data:{UseItemNum:this.UseItemNum}};
    //     this.EventBus(event);
    // }

    // start(){
    //     this.listen();
    //     this.close();
    // }

    // setUseItemInfo(ConfirmUseItem:ConfirmUseItem){
    //     let UseItemNameLabel=this.ItemNameNode.getComponent(Label);
    //     UseItemNameLabel.string=`【${ConfirmUseItem.name}】`;

    //     let describeText=wrapText(ConfirmUseItem.describe,18);
    //     let UseItemDescribeLabel=this.ItemDescribeNode.getComponent(Label);
    //     UseItemDescribeLabel.string=describeText;
    // }

    // setItemNum(){
    //     let UseItemNumLabel=this.UseItemNumNode.getComponent(Label);
    //     UseItemNumLabel.string=`【${this.UseItemNum.toString()}】`;
    // }

    // addItemNum(){
    //     this.UseItemNum++;
    //     this.setItemNum();
    // }

    // reduceItemNum(){
    //     if(this.UseItemNum<=1){
    //         return;
    //     }
    //     this.UseItemNum--;
    //     this.setItemNum();
    // }


}