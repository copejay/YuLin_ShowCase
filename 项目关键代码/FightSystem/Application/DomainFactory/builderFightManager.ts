


import { FightManager } from '../../Domain/Assitant2/A_FightManager';
import { FightManagerEnv } from '../../Domain/Assitant2/A_FightManager';


import type {FightFormation,DomainFightRoleInfo} from '../../Domain/DomainType';
//
import { OpenWorldApp,BagApp,GachaApplication,DataBaseService,TemplateService,GlobalApp,TrainApplication } from '../../DTO/OutApp.contract';
import type { FightResultItem } from "../../DTO/AppOutData.contract";

function createFightManagerEnv():FightManagerEnv{
    return{
        getMyFightFormation():DomainFightRoleInfo[]{
            let roles=TrainApplication.instance.getFormationList();
            let myFightFormation:DomainFightRoleInfo[]=[];
            roles.forEach((item)=>{
               
                let outFightRole=TrainApplication.instance.getFightRoleInfo(item.id);
                let outBaseInfo=TrainApplication.instance.getBaseRoleInfo(item.id);
                
                let fightInfo:DomainFightRoleInfo={
                    name:outBaseInfo.name,
                    classType:outBaseInfo.classType,
                    classTypeNum:outBaseInfo.classTypeNum,

                    speed:outFightRole.speed,
                    hp:outFightRole.hp,
                    mp:outFightRole.mp,
                    atk:outFightRole.attack,
                    def:outFightRole.defense,
                    hpAdd:outFightRole.addHp,
                    mpAdd:outFightRole.addMp,
                    site:item.site,
                }
                myFightFormation.push(fightInfo);
            })
            return myFightFormation
                // LeftFightInfo:myFightFormation,
                // RightFightInfo:myFightFormation,
        },
        addMessage(type:string,msg:string):void{
            OpenWorldApp.instance.addMessage(type,msg);
        },
        fightBeginCB(){
            GlobalApp.instance.createHintPop("战斗开始");
            GlobalApp.instance.playFightBgm();
        },
        fightOverCB(){
            GlobalApp.instance.createHintPop("战斗结束");
            GlobalApp.instance.playNormalBgm();
        },
        fightWinCB(win:boolean){
        OpenWorldApp.instance.addMessage("red",win?"战斗胜利！":"战斗失败！");
        // OpenWorldApp.instance.showMessage();
        if(win==true){
            OpenWorldApp.instance.addMessage("red","破阵杀敌如同砍瓜切菜，你实在太厉害了！");
            let FightResultItem:FightResultItem[]=GachaApplication.instance.getFightResultItem("敌人类型",100);
            for(let item of FightResultItem){
                let myItem=TemplateService.instance.getStackItem(item.id);
                let name=myItem.name;
                OpenWorldApp.instance.addMessage("blue",`获得战利品【${name}】*${item.num}`);
                BagApp.instance.AddItem(item.id,item.num);
            }
        }else{
            OpenWorldApp.instance.addMessage("red",`菜鸡，回去再练五百年吧！`);
        }
        // OpenWorldApp.instance.showMessage();
        },
    }
}

export class builderFightManager{
    private FightDomain:FightManager;

    constructor(){
        this.FightDomain=new FightManager(createFightManagerEnv());
    }

    getFightManager(){
        return this.FightDomain;
    }
}