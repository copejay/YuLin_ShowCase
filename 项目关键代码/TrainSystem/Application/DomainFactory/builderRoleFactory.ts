
// import { TemplateService } from "../../TrainApplication";
//外部系统
import {TemplateService,DataBaseService} from '../../DTO/OutApp.contract';
import {saveRoleRow} from '../../DTO/AppOutData.contract';
//领域
import { RoleFactory} from "../../Domain/TrainDomainAt/RoleFactory";
import type { RoleFactoryEnv } from "../../Domain/TrainDomainAt/RoleFactory";
import type {RoleRow} from '../../Domain/TrainType';
//工具
import { AutoTimeID } from "../../Infrastructure/Utils/AutoTimeID";
import {AutoName,randomInt} from '../../Infrastructure/Utils/AutoName';

const env: RoleFactoryEnv = {

    getTimeID() {
        let id=AutoTimeID();
        return id;
    },

    getRandomName(){
        let name=AutoName("human");
        return name;
    },

    getRandomTalent() {
        return TemplateService.instance.getRandomTalent();
    },


    saveRole(Role:RoleRow){

        let DBRole:saveRoleRow={
            id:Role.id,
            baseInfo:Role.baseInfo,
            spriteRoot:Role.spriteRoot,
            fightInfo:Role.fightInfo,
            equipList:Role.equipList,
            activeSkillList:Role.activeSkillList,
            passiveSkillList:Role.passiveSkillList,
            fightSkillList:Role.fightSkillList,
        }
        DataBaseService.instance.setRole(DBRole);
    },

    DeleteRole(RoleID:string){
        DataBaseService.instance.deleteRole(RoleID);
    },

    getRoleRowData(RoleID:string):RoleRow{
        let roleRow:RoleRow=DataBaseService.instance.getRole(RoleID);

        let domainRoleRow:RoleRow={
            id:roleRow.id,
            baseInfo:roleRow.baseInfo,
            spriteRoot:roleRow.spriteRoot,
            fightInfo:roleRow.fightInfo,
            equipList:roleRow.equipList,
            activeSkillList:roleRow.activeSkillList,
            passiveSkillList:roleRow.passiveSkillList,
            fightSkillList:roleRow.fightSkillList,
        };

        return domainRoleRow;
    }
};

export class builderRoleFactory{

    public domainRoleFactory:RoleFactory;

    constructor(){
        this.domainRoleFactory=new RoleFactory(env);
    }

}