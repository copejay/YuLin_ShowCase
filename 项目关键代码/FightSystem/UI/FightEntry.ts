import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

//协助类
import { ViewSyncer } from './Assistant/ViewSyncer';
//App层
import { FightApp } from '../Application/FightApp';
//刷出器
import { HitEffectSpawner } from "./Spawner/HitEffectSpawner";
import { FloatingTextSpawner } from "./Spawner/FloatingTextSpawner";
import { FightRoleSpawner } from "./Spawner/FightRoleSpawner";
import { FightBoxSpawner } from "./Spawner/FightBoxSpawner";


@ccclass('FightEntry')
export class FightEntry extends Component {

    //刷出器节点
    @property(Node)
    HitEffectSpawnerNode:Node=null;
    @property(Node)
    FloatingTextSpawnerNode:Node=null;
    @property(Node)
    FightRoleSpawnerNode:Node=null;
    @property(Node)
    FightBoxSpawnerNode:Node=null;
    //控制节点
    // @property(Node)
    // ActiveNode:Node=null;
    //战斗组件依附节点
    @property(Node)
    FightBoardNode:Node=null;
    @property(Node)
    ActiveNode:Node=null;

    //加速按钮
    @property(Node)
    FightSpeedNode:Node=null;
    @property(Node)
    RetreatNode:Node=null;

    private FightApp:FightApp;

    private ViewSyncer:ViewSyncer;

    private myHitEffectSpawner:HitEffectSpawner;
    private myFloatingTextSpawner:FloatingTextSpawner;
    private myFightRoleSpawner:FightRoleSpawner;
    private myFightBoxSpawner:FightBoxSpawner;


    initSpawner(){
        this.myHitEffectSpawner=this.HitEffectSpawnerNode.getComponent(HitEffectSpawner);
        this.myFloatingTextSpawner=this.FloatingTextSpawnerNode.getComponent(FloatingTextSpawner);
        this.myFightRoleSpawner=this.FightRoleSpawnerNode.getComponent(FightRoleSpawner);
        this.myFightBoxSpawner=this.FightBoxSpawnerNode.getComponent(FightBoxSpawner);
    }

    start() {
        this.closeFightBoard();
        this.initSpawner();

        this.FightApp=FightApp.instance;
        this.FightApp.initFightEntry(this);

        this.ViewSyncer=new ViewSyncer(this.myFightRoleSpawner,this.myFloatingTextSpawner,this.myFightBoxSpawner,this.myHitEffectSpawner,this.FightBoardNode);

        // this.initFightSystem();
        //这里的用户交互还很少，先在一级入口调用算了
        //后续增加战斗交互，再进行分层
        this.FightSpeedNode.on(Node.EventType.TOUCH_END,this.FightApp.FightSpeedClick,this.FightApp);
        this.RetreatNode.on(Node.EventType.TOUCH_END,this.FightApp.tryFightRetreat,this.FightApp);
    }

//UI层行为接口
    Sync(FightRoleList,HitEffectList,FloatingTextList,BoardBoxList){
        this.ViewSyncer.sync(FightRoleList,HitEffectList,FloatingTextList,BoardBoxList)
    }
    closeFightBoard(){
        this.ActiveNode.active=false;
    }
    openFightBoard(){
        console.log(`FightEntry: 战斗面板开启函数调用!`);
        this.ActiveNode.active=true;
    }
    // initFightSystem(){
    //     this.FightApp.buildFightSystem();
    // }


    update(deltaTime: number) {
        this.FightApp.update(deltaTime);
    }
}


