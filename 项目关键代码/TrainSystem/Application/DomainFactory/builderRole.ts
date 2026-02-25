



import { Role} from "../../Domain/TrainDomainAt/Role";

import type { RoleRow,TalentType} from "../../Domain/TrainType";
import { RoleEnv } from "../../Domain/TrainDomainAt/Role";  


import {DataBaseService,TemplateService} from '../../DTO/OutApp.contract';

import {saveRoleRow, saveTalentType} from '../../DTO/AppOutData.contract';


function createRoleEnv(): RoleEnv {

    return{

        getAllRoleIDList():string[]{
            let Roles:RoleRow[]=DataBaseService.instance.getAllRole();
            let RoleIDList:string[]=Roles.map((role)=>role.id);
            return RoleIDList;
        },

        getTalentTemplate(TalentID:string):TalentType{
            let talent=TemplateService.instance.getTalent(TalentID);
            let DomainTalent:TalentType={
                name:talent.name,
                strong:talent.strong,
                speed:talent.speed,
                blood:talent.blood,
                smart:talent.smart,
                describe:talent.describe,
            }
            return DomainTalent;
        },

    }
}

export class builderRole{


    public domainRole:Role;

    constructor(){
        this.domainRole=new Role(createRoleEnv());
    }

}