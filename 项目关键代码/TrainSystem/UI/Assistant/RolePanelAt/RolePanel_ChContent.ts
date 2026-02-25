import { _decorator, Component, Node,Sprite ,Vec3, Color} from 'cc';
import {Label} from "cc";
const { ccclass, property } = _decorator;

import {event} from '../RolePanelEntry';

@ccclass('RolePanel_ChContent')
export class RolePanel_ChContent extends Component {

    // @property({type:Node,tooltip:"ActiveNode"})
    // ActiveNode;

    @property({type:Node,tooltip:"Ch to BaseContent"})
    ChBaseContentBtn:Node;
    @property({type:Node,tooltip:"Ch to MoreContent"})
    ChMoreContentBtn:Node;
    @property({type:Node,tooltip:"Ch to SkillContent"})
    ChSkillContentBtn:Node;

    private baseBtnOriginPos:Vec3;
    private moreBtnOriginPos:Vec3;
    private skillBtnOriginPos:Vec3;

    // private TrainApp;
    private EventBus;

    private readonly SELECT_OFFSET_Y = -10;
    private readonly SELECT_COLOR = new Color(200, 200, 200, 255);
    private readonly NORMAL_COLOR = Color.WHITE;


    addListen(){
        this.ChBaseContentBtn.on(Node.EventType.TOUCH_END,this.clickChBase,this);
        this.ChMoreContentBtn.on(Node.EventType.TOUCH_END,this.clickChMore,this);
        this.ChSkillContentBtn.on(Node.EventType.TOUCH_END,this.clickChSkill,this);

        this.baseBtnOriginPos = this.ChBaseContentBtn.getPosition().clone();
        this.moreBtnOriginPos= this.ChMoreContentBtn.getPosition().clone();
        this.skillBtnOriginPos=this.ChSkillContentBtn.getPosition().clone();

    }

    start(){
        this.addListen();
        // this.initAt();
    }

    // initApp(app){
    //     this.TrainApp=app;
    //     // this.close();
    // }

    initEventBus(EventBus){
        this.EventBus=EventBus;
    }

    clickChBase(){
        let Event:event={callFrom:"ChContent",type:"ToBase",data:"null"};
        this.EventBus(Event);
    }
    clickChMore(){
        let Event:event={callFrom:"ChContent",type:"ToMore",data:"null"};
        this.EventBus(Event);
    }
    clickChSkill(){
        let Event:event={callFrom:"ChContent",type:"ToSkill",data:"null"};
        this.EventBus(Event);
    }


    ChangeBtnState(BtnName: string) {
        this.cleanAllOffset();

        if (BtnName === 'Base') {
            this.selectBtn(this.ChBaseContentBtn, this.baseBtnOriginPos);
        } else if (BtnName === 'More') {
            this.selectBtn(this.ChMoreContentBtn, this.moreBtnOriginPos);
        } else if (BtnName === 'Skill') {
            this.selectBtn(this.ChSkillContentBtn, this.skillBtnOriginPos);
        }
    }

    selectBtn(
        btnNode: Node,
        originPos: Vec3
    ) {
        // 位移
        btnNode.setPosition(
            originPos.x,
            originPos.y + this.SELECT_OFFSET_Y,
            originPos.z
        );
        // 变色
        const sp = btnNode.getComponent(Sprite);
        if (sp) {
            sp.color = this.SELECT_COLOR;
        }
    }

    resetBtn(
        btnNode: Node,
        originPos: Vec3
    ) {
        btnNode.setPosition(originPos);

        const sp = btnNode.getComponent(Sprite);
        if (sp) {
            sp.color = this.NORMAL_COLOR;
        }
    }

    cleanAllOffset(){
        this.resetBtn(this.ChBaseContentBtn, this.baseBtnOriginPos);
        this.resetBtn(this.ChMoreContentBtn, this.moreBtnOriginPos);
        this.resetBtn(this.ChSkillContentBtn, this.skillBtnOriginPos);
    }

}


