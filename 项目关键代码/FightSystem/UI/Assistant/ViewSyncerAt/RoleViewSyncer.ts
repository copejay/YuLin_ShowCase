
import {UIFightRole} from '../../UIType';

import { FightRoleView,SpriteType } from '../../View/FightRoleView';

export class RoleViewSyncer{

    private FightRoleList:UIFightRole[];

    private FightRoleViewList=[];

    private FightRoleSpawner;

    private BoardNode;

    get RoleList(){
        return this.FightRoleList;
    }

    constructor(FightRoleSpawner,BoardNode){
        // this.FightManager=FightManager;
        this.FightRoleSpawner=FightRoleSpawner;
        this.BoardNode=BoardNode;
    }


    Sync(FightRoleList:UIFightRole[]){
        this.FightRoleList=FightRoleList;
        this.SyncRole();
    }

    //同步角色
    SyncRole(){
        this.checkRoleViewNum();
        let TotalLength=this.FightRoleList.length;
        for(let i=0;i<TotalLength;i++){
            let fightRoleView:FightRoleView=this.FightRoleViewList[i];
            let fightRole:UIFightRole=this.FightRoleList[i];

            fightRoleView.syncPosition(fightRole.x,fightRole.y);
            fightRoleView.syncHpBar(fightRole.Hp,fightRole.maxHp);
            fightRoleView.setName(fightRole.name);
            fightRoleView.setLevel(fightRole.level);
            let spriteType:SpriteType={type:fightRole.classType,id:fightRole.classTypeNum};
            fightRoleView.syncVisual(spriteType,fightRole.side);
        }
    }


    //角色视图数量
    checkRoleViewNum(){
        let TotalLength=this.FightRoleList.length;

        let ViewLength=this.FightRoleViewList.length;
        let Num=TotalLength-ViewLength;
        if(Num==0){
            return
        }else if(Num<0){
            this.deleteRoleView(-Num);
        }else if(Num>0){
            this.addRoleView(Num);
        }
    }
    addRoleView(Num){
        for(let i=0;i<Num;i++){
            let fightRoleView=this.FightRoleSpawner.get(this.BoardNode);
            this.FightRoleViewList.push(fightRoleView);
        } 
    }
    deleteRoleView(Num){
        for(let i=0;i<Num;i++){
            let view=this.FightRoleViewList.pop();
            this.FightRoleSpawner.recycle(view);
        }  
    }


}