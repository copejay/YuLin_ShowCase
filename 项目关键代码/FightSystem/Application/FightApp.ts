

//领域模型
import {Fight} from "../Domain/Fight";
import { DomainFactory } from "./DomainFactory/DomainFactory";
//二级协助
// import { FightData } from "./Assistant/FightData";
//UI接口
import { FightEntry } from "../UI/FightEntry";



export class FightApp{

    private static _instance:FightApp;

    public static get instance(){
        if(!this._instance){
            // console.log(`FightApp:实例化战斗系统`);
            this._instance=new FightApp();
            console.log(`【FightApp instance created】`);
            return this._instance;
        }
        return this._instance;
    }
    //领域模型
    // private DomainFight:FightManager;
    private DomainFight:Fight;
    //前端UI
    private UIFight:FightEntry;

    constructor(){
       
        this.DomainFight=DomainFactory.instance.getFightDomain();
    }

    initFightEntry(FightEntry){
        this.UIFight=FightEntry;
        // this.LoadComponent();
    }


//战斗系统建立后，获取数据开始新战斗
    NewFight(){//这里没有传入战斗敌人，等待优化
        this.DomainFight.NewFight();
    }
    //设置战斗速度
    FightSpeedClick(){
        this.DomainFight.FightSpeedChange();
        
    }
   
    //尝试战斗撤退
    tryFightRetreat(){
        this.DomainFight.FightRetreat();
    }


    update(dt:number){
        if(this.DomainFight!==null){
            if(this.DomainFight.checkFightClose()==false){
                console.log(`FightApp:战斗面板非关闭！`);
                this.UIFight.openFightBoard();

                this.DomainFight.Update(dt);
                //导出人物，特效，战斗格，传给UI进行同步显示
                let Roles=this.DomainFight.exportRoleList();
                let HintEffects=this.DomainFight.exportHitEffectList();
                let FloatTextList=this.DomainFight.exportFloatingTextList();
                let BoardBoxList=this.DomainFight.exportBoardBoxList();

                this.UIFight.Sync(Roles,HintEffects,FloatTextList,BoardBoxList);
            }else{
                this.UIFight.closeFightBoard();
            }
        }
    }

}