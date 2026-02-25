
import { FightBoardSite } from "../Assistant/FightBoardSite";
import { FightRole } from "../Assistant/FightRole";
// import { FightBox } from "./FightBox";

import { BattleTime ,battleDelay} from "../Assistant/BattleTime";

// import { DomainFightRoleInfo } from "./A_FightManager";
import { DomainFightRoleInfo } from "../DomainType";

export class FightRoleManager{

    private FightBoardSite:FightBoardSite;

    private RoleList:FightRole[]=[];

    private ActionRoleList:FightRole[]=[];

    Lose:boolean=false;

    private side:"left"|"right";


    constructor(side){
        this.FightBoardSite=new FightBoardSite();
        this.side=side;
    }

    getRoleList(){
        return this.RoleList;
    }

    cleanRoleList(){
        this.RoleList=[];
    }


    LoadFightInfoList(FightInfoList:DomainFightRoleInfo[]){
        this.cleanRoleList();
        FightInfoList.forEach((Info)=>{
            this.LoadFightInfo(Info);
        })
        this.Lose=false;
    }


    LoadFightInfo(FightInfo:DomainFightRoleInfo){
        // this.initFightBoard();
        let RoleName=FightInfo.name;
        let RoleSpeed=FightInfo.speed;
        let RoleAttack=FightInfo.atk;
        let RoleDefense=FightInfo.def;
        let RoleHP=FightInfo.hp;

        let RoleClassType=FightInfo.classType;
        let RoleClassTypeNum=FightInfo.classTypeNum;


        let RoleBoardSite={x:FightInfo.site.x,y:FightInfo.site.y};
        let RoleSite=this.FightBoardSite.getSite(this.side,RoleBoardSite);

        console.log(`FightRoleManager:从FightBoard获得RoleSite:${RoleSite}`);

        let newRole=new FightRole();
        newRole.setBaseInfo(RoleName,1,RoleClassType,RoleClassTypeNum);
        newRole.setFightInfo(RoleSpeed,RoleAttack,RoleDefense,RoleHP);
        newRole.setSite(RoleSite[0],RoleSite[1]);
        newRole.setSide(this.side);

        this.RoleList.push(newRole);
    }

    async Action(getDefenseList:(range:number)=>FightRole[],FightCheck:()=>boolean){
        console.log("B_FightRoleManager");
        console.log(`Action`);
        for (const role of this.RoleList){
            await role.Action(getDefenseList);
            //每个角色行动完，调用检查
            //战斗结束则跳出循环
            if(FightCheck()==true){
                return
            };
        }
        await battleDelay(500);
    }

    checkLose(){
        if(this.RoleList.length==0){
            this.Lose=true;
        }
    }


    checkDied(){
        for(let i=this.RoleList.length-1;i>=0;i--){
            if(this.RoleList[i].died==true){
                this.RoleList.splice(i,1);
            }
        }
    }


    getDefenseList(){
        return this.RoleList;

    }

    Update(dt){
        this.RoleList.forEach((role)=>{
            role.update(dt);
        })
    }


}