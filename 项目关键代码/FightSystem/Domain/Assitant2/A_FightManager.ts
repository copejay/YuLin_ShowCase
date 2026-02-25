
import {FightRoleManager} from "./B_FightRoleManager";

import { FightBoardManager } from "./B_FightBoardManager";

//
import { FightFormation, DomainFightRoleInfo } from "../DomainType";

import { BattleTime } from "../Assistant/BattleTime";
import { Enemy } from "../Assistant/Enemy";

export interface FightManagerEnv{
    getMyFightFormation():DomainFightRoleInfo[];

    // getFightFormation():FightFormation;
    //探索界面的信息
    addMessage(type:string,msg:string):void;

    fightBeginCB:()=>void;
    fightOverCB:()=>void;

    fightWinCB:(win:boolean)=>void;
}

export class FightManager{

//协助类管理
    //人物管理
    LeftFightRoleManager:FightRoleManager;
    RightFightRoleManager:FightRoleManager;
    //棋盘管理
    FightBoardManager:FightBoardManager;
    //敌人生成
    EnemyGenerator:Enemy;

    FightOver:boolean=true;//战斗结束
    FightWin:boolean=false;//战斗是否胜利,首先设定为false，除了击败对方，其余情况都将判定为输
    FightClose:boolean=true;//是否关闭战斗面板

    FightFormation:FightFormation;//战斗阵容

    ReadingFunction:()=>void;//预备执行方法

    //战斗倍速
    FightSpeed:number=1;

    //token进行最后一次的识别
    private renewToken = 0;
    //锁机制进行通知
    private roundLock:Promise<void> | null=null;
    private roundUnlock:(()=>void) | null=null;
    //
    private Env:FightManagerEnv;


    constructor(env:FightManagerEnv){
        this.Env=env;
        this.LoadComponent();
    }

    //建立协助子类
    LoadComponent(){
        this.FightBoardManager=new FightBoardManager();
        this.LeftFightRoleManager=new FightRoleManager("left");
        this.RightFightRoleManager=new FightRoleManager("right");
        this.EnemyGenerator=new Enemy();
    }

    checkFightClose(){
        return this.FightClose;
    }


//对外接口
    setFightSpeed(num:number){
        this.FightSpeed=num;
        BattleTime.setSpeed(num);
    }
    FightSpeedChange(){
        if(this.FightSpeed==1){
            this.setFightSpeed(2);
        }else{
            this.setFightSpeed(1);
        }
    }

    Update(dt){
        this.LeftFightRoleManager.Update(dt);
        this.RightFightRoleManager.Update(dt);
    }

//【2】
    getRandomEnemyGroup(level:number):DomainFightRoleInfo[]{
        return this.EnemyGenerator.createRandomEnemyGroup(level);
    }

    //===Stage: StartFight===
    //===ENTER: StartFight===
    //开始新战斗
    async NewFight(){
        // console.log(`A_FightManager: 战斗信息开始加载`);
        let myFightFormation=this.Env.getMyFightFormation();
        let enemyFightFormation=this.getRandomEnemyGroup(5);
        this.FightFormation={
            LeftFightInfo:myFightFormation,
            RightFightInfo:enemyFightFormation,
        }

        if(this.FightFormation.LeftFightInfo.length>0 && this.FightFormation.RightFightInfo.length>0){
            // this.Env.addMessage("战斗开始");
        }else{
            this.Env.addMessage("red","战斗阵容错误");
            return;
        }

        const token = ++this.renewToken;

        this.ReadingFunction=()=>this.updateInfoForBegin();

        //虽然战斗状态玩家无法再次触发新战斗，但是这个锁机制不用改也没事
        if(this.roundLock){
            this.FightOver=true;
            console.log(`FightManager：有锁进行等待`);
            await this.roundLock;
        }

        if(token !== this.renewToken){
            return;
        }
        this.ReadingFunction();
    }

    //===Stage: InitFightData===
    //===ENTER: InitFightData===
    //战斗开始前，更新战斗信息
    updateInfoForBegin(){
        console.log(`FightManager: 刷新战斗信息，开始新回合`);
        let FightInfo=this.FightFormation;

        let LeftFightInfo=FightInfo.LeftFightInfo;
        let RightFightInfo=FightInfo.RightFightInfo;
        this.LeftFightRoleManager.LoadFightInfoList(LeftFightInfo);
        this.RightFightRoleManager.LoadFightInfoList(RightFightInfo);

        // this.FightOver=false;
        this.FightBegin();
    }

    //===Stage: FightBegin===
    //===ENTER: FightBegin===
    //新战斗开始
    async FightBegin(){
        this.FightClose=false;
        this.Env.addMessage("green","======");
        this.Env.fightBeginCB();

        this.checkSpeed();
        //上锁
        this.roundLock = new Promise<void>(resolve => {
            this.roundUnlock = resolve;
        });
        this.FightOver=false;
        //如果战斗循环被跳出
        await this.RoundCycle();
        //===Stage: FightEndDelay===
        this.Env.fightWinCB(this.FightWin);
        //延迟0.5秒结算
        await new Promise(resolve => setTimeout(resolve, 500));
        this.Env.fightOverCB();
        //设置战斗关闭
        this.FightClose=true;
        this.Env.addMessage("green","======");

        //进行解锁
        this.roundUnlock?.();
        this.roundUnlock = null;
        this.roundLock = null;
    }

    
    //===Stage: FightRoundLoop===
    //===ENTER: FightRoundLoop===
    //新回合开始
    async RoundCycle(){
        while(true){
            if(this.FightOver){
                break;
            }
            await this.FightRound();
        }
    }

    //===Stage: FightRoundLoop===
    //每个回合做什么
    async FightRound(){
        await this.RightAction();
        if(this.checkFightOver()==true){
            return
        };

        await this.LeftAction();
        if(this.checkFightOver()==true){
            return
        };
    }

//调用两侧的行动函数
    //===Stage: FightRoundLoop===
    async RightAction(){
        await this.RightFightRoleManager.Action(
            (range)=>{
            return this.getLeftDefenseList(range);},

            this.FightCheck.bind(this)
        );
    }
    async LeftAction(){
        await this.LeftFightRoleManager.Action(
            (range)=>{
            return this.getRightDefenseList(range);},

        this.FightCheck.bind(this)
        );
    }

    //每个角色行动完都进行检查，确保战斗即时性
    FightCheck(){
        this.LeftFightRoleManager.checkDied();
        this.LeftFightRoleManager.checkLose();

        this.RightFightRoleManager.checkDied();
        this.RightFightRoleManager.checkLose();

        if(this.checkFightOver()==true){
            return true;
        };
    }

    //Rule:
    //CheckFightOver 只负责写状态
    //不负责流程跳转，不负责结束战斗
    //检查战斗是否结束
    checkFightOver(){
        if(this.LeftFightRoleManager.Lose||this.RightFightRoleManager.Lose){
            this.FightOver=true;
            if(this.RightFightRoleManager.Lose){
                this.FightWin=true;
            }else{
                this.FightWin=false;
            }
            console.log(`FightManager:战斗结束`);
            return true;
        }
    }

    //战斗撤离
    FightRetreat(){
        this.FightOver=true;
    }

    //检查双方速度，决定出手顺序
    checkSpeed(){

    }


//左右双方的防御列表获取
    //获取右方防御列表
    getRightDefenseList(range){
        return this.RightFightRoleManager.getDefenseList();
    }
    //获取左方防御列表
    getLeftDefenseList(range){
        return this.LeftFightRoleManager.getDefenseList();
    }

//【1】导出战斗逻辑世界信息
    exportRoleList(){//角色列表
        return [...this.LeftFightRoleManager.getRoleList(),...this.RightFightRoleManager.getRoleList()];
    }
    exportBoardBoxList(){//角色放置格子列表
        return this.FightBoardManager.BoardBoxList;
    }
    exportHitEffectList(){//命中特效
        let RoleList=this.exportRoleList()
        let newHitEffectList=[];
        RoleList.forEach((role)=>{
            if(role.HitEffectList.length!=0){
                newHitEffectList=newHitEffectList.concat(role.HitEffectList);
            }
        })
        return newHitEffectList;
    }
    exportFloatingTextList(){//浮空文字
        let RoleList=this.exportRoleList()
        let newFloatingTextList=[];
        RoleList.forEach((role)=>{
            if(role.FloatingTextList.length!=0){
                newFloatingTextList=newFloatingTextList.concat(role.FloatingTextList);
            }
        })
        return newFloatingTextList;
    }


}