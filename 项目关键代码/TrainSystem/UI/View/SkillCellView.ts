import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import {Label} from 'cc';

import { wrapText } from '../../Infrastructure';

@ccclass('SkillCellView')
export class SkillCellView extends Component {

    @property(Node)
    ActiveNode:Node;

    @property(Label)
    SkillTypeLabel:Label;
    @property(Label)
    SkillNameLabel:Label;
    @property(Label)
    SkillLevelLabel:Label;

    @property(Node)
    ControlBtn:Node;
    @property(Node)
    LookBtn:Node;

    SkillID;
    ActiveType:boolean=false;

    private ClickCB:(SkillType:string,SkillID:string,clickType:string)=>void;

    listen(){
        this.ControlBtn.on(Node.EventType.TOUCH_END,this.clickControl,this);
        this.LookBtn.on(Node.EventType.TOUCH_END,this.clickLook,this);
        // this.ActiveNode.on(Node.EventType.TOUCH_END,this.click,this)
    }

    clickControl(){
        this.click("Control");
    }
    clickLook(){
        this.click("Look");
    }

    click(clickType:string){
        let SkillType:string;
        if(this.ActiveType==true){
            SkillType="Active";
        }else if(this.ActiveType==false){
            SkillType="Passive";
        }
        this.ClickCB(SkillType,this.SkillID,clickType);
    }


    setClickCB(id:string,clickCB:(SkillType:string,SkillID:string,clickType:string)=>void){
        this.setID(id);
        this.ClickCB=clickCB;
    }

    setID(ID:string){
        this.SkillID=ID;
    }
    setActiveType(Active:boolean){
        this.ActiveType=Active;
        
        let TypeLabel:string="未知技能";
        if(this.ActiveType==true){
            TypeLabel="主动技能";
        }else if(this.ActiveType==false){
            TypeLabel="被动技能";
        }
        this.SkillTypeLabel.getComponent(Label).string=TypeLabel;
    }
    setName(Name:string){
        this.SkillNameLabel.getComponent(Label).string=`【${Name}】`;
    }
    setLevel(level:number){
        this.SkillLevelLabel.getComponent(Label).string=`${level}层`;
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


