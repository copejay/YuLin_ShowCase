

import { FightFormation} from "../../Domain/TrainDomainAt/FightFormation";
import { FightFormationEnv } from "../../Domain/TrainDomainAt/FightFormation";

import type { FormationRole } from "../../Domain/TrainType";

import { saveFormationRole} from '../../DTO/AppOutData.contract';
// import { DataBaseService } from '../../TrainApplication';

import {DataBaseService} from '../../DTO/OutApp.contract';


const myFightFormationEnv:FightFormationEnv={

    saveFormation(FormationRoles:FormationRole[]) {
        DataBaseService.instance.setFormation(FormationRoles);
    },

    getFormationRow(){
        // return this.getFormationRowsData();
        let FormationRow:saveFormationRole[]=DataBaseService.instance.getFormation();
        return FormationRow;
    }
}


export class builderFightFormation{

    public domainFightFormation:FightFormation;

    constructor(){
        this.domainFightFormation=new FightFormation(myFightFormationEnv);
    }

}