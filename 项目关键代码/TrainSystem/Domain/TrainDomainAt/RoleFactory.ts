
import { RoleRow } from "../TrainType";
export type {RoleRow};

//导入其它领域进行协作
import { FightFormation } from "./FightFormation";
import { OtherDomain } from "./OtherDomain";

export interface RoleFactoryEnv {

    getTimeID(): string;

    getRandomName():string;

    getRandomTalent(): string;


    getRoleRowData(RoleID:string): RoleRow;

    DeleteRole(RoleID:string):void;

    saveRole(Role:RoleRow):void;

}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class RoleFactory {

    private RoleFactoryEnv

    constructor(RoleFactoryEnv:RoleFactoryEnv){
        this.RoleFactoryEnv=RoleFactoryEnv;
    }

    private fightFormation:FightFormation;
    private otherDomain:OtherDomain;

    LinkOtherDomain(fightFormation:FightFormation,otherDomain:OtherDomain){
        this.fightFormation=fightFormation;
        this.otherDomain=otherDomain;
    }

    getRoleRowData(RoleID:string): RoleRow{
        return this.RoleFactoryEnv.getRoleRowData(RoleID);
    }

    saveRole(Role:RoleRow){
        this.RoleFactoryEnv.saveRole(Role);
    }

    deleteRole(RoleID:string){
        if(this.fightFormation.checkInFormation(RoleID)==true){
            this.otherDomain.createToastPop(`角色列阵状态不可遣散！`);
            return
        }
        this.RoleFactoryEnv.DeleteRole(RoleID);
        this.otherDomain.createToastPop(`队伍:角色已遣散！`);
    }

    addRole(){
        let role:RoleRow=this.createRole();
        this.saveRole(role);
        this.otherDomain.createToastPop(`队伍:角色【${role.baseInfo.name}】已加入！`);
    }

    createRole():RoleRow{
        let role:RoleRow={
            id:this.RoleFactoryEnv.getTimeID(),
            baseInfo:{
                name:this.RoleFactoryEnv.getRandomName(),
                QiLevel: 0,
                QiExp: 0,
                TiLevel: 0,
                TiExp: 0,
                learnPoint: 0,
                classType: 'human',
                classTypeNum: randomInt(0,5),
                talentID: this.RoleFactoryEnv.getRandomTalent(),
                talentLevel: randomInt(1,100),
                lifeSpan: 0,
                birthData: 0,
            },
            spriteRoot:{
                金:randomInt(1,100),
                木:randomInt(1,100),
                水:randomInt(1,100),
                火:randomInt(1,100),
                土:randomInt(1,100),
            },
            fightInfo:{
                strong:randomInt(1,100),
                speed:randomInt(1,100),
                blood:randomInt(1,100),
                smart:randomInt(1,100),
            },
            equipList:[],
            activeSkillList:[],
            passiveSkillList:[],
            fightSkillList:[],
        }
        return role;
    }


}
