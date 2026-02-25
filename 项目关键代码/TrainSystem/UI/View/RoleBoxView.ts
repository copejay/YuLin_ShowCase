import { _decorator, Component, Node } from 'cc';
import {Label} from "cc";
const { ccclass, property } = _decorator;
import {Vec3} from 'cc';

import {SpriteShow, SpriteType} from "../../../GlobalSystem/UI/View/SpriteShow";

@ccclass('RoleBoxView')
export class RoleBoxView extends Component {


    // @property(Node)
    // RoleImg:Node

    @property(Label)
    Name:Label;

    @property(Label)
    QiLevel:Label;

    @property(Label)
    TiLevel:Label;

    @property(Node)
    UpType:Node

    @property(Node)
    SpriteShowNode:Node

    SpriteShow:SpriteShow;

    private CallBack:(RoleID:string)=>void=null;

    private BoxID:string="null";

    setFormationUp(){
        console.log("RoleBox:设置为上阵状态");
        this.UpType.active=true;
    }

    setFormationDown(){
        console.log("RoleBox:设置为下阵状态");
        this.UpType.active=false;
    }

    //初始化位置
    setPosition(x:number,y:number){
        this.node.setPosition(x,y);
    }

    //回调相关
    setBoxInfo(BoxID:string,callBack:(RoleID:string)=>void){
        // this.setPosition(x,y);
        this.setBoxID(BoxID);
        this.setCallBack(callBack);
    }

    setBoxID(BoxID:string){
        this.BoxID=BoxID;
    }

    setCallBack(callback:(RoleID:string)=>void){
        this.CallBack=callback;
    }

    onClick(){
        console.log("回调函数执行:"+this.BoxID);
        if(this.CallBack!=null){
            this.CallBack(this.BoxID);
        }
    }

    syncName(Name:string){
        this.Name.getComponent(Label).string=Name;
    }

    syncQiTiLevel(QiLevel:string,TiLevel:string){
        this.QiLevel.string=`${QiLevel}`;
        this.TiLevel.string=`${TiLevel}`;
    }

    //同步格子信息数据
    syncData(RoleData:{Name:string,level:string}){
        this.Name.string=RoleData.Name;
        this.QiLevel.string=`${RoleData.level}`;
    }
    syncSprite(SpriteType:SpriteType){
        this.SpriteShow=this.SpriteShowNode.getComponent(SpriteShow);
        // this.SpriteShow.setScale(7/4);
        // this.SpriteShow.node.setPosition(0,0);
        this.SpriteShow.setPosScale(new Vec3(-35,0,0),new Vec3(7/4,7/4,1));
        this.SpriteShow.showSprite(SpriteType,"left");
    }

    //设置点击监听
    onLoad() {
        console.log(`RoleBox: start执行`);
        this.addListener();
        this.setFormationDown();
    }

    addListener(){
        this.node.on(Node.EventType.TOUCH_END,this.onClick,this);
    }

}


