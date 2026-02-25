

import { RoleRow } from "../../../GlobalService";

//外部系统
import { DataBaseService,GlobalApp } from "../../DTO/OutApp.contract";
//前端UI
import { TrainEntry } from "../TrainApplication";

import { FormationUpRole } from "../../DTO/AppUI.contract";

// import {FormationRow} from '../../Domain/TrainDomainAt/FightFormation';

//领域模型+领域集合
import { DomainFactory } from "../DomainFactory/DomainFactory";
import { TrainDomain } from "../../Domain/TrainDomain";

import type {FormationRole} from "../../Domain/TrainType";


export class FormationPop{


    private TrainEntryUI:TrainEntry;

    private DomainTrain:TrainDomain;

    constructor(){
        this.DomainTrain=DomainFactory.instance.getTrainDomain();
    }
    initUI(TrainUI){
        this.TrainEntryUI=TrainUI;
    }

    commitData(){
        this.DomainTrain.commitData();
    }


    DownRoleClick(RoleID:string){
        this.DomainTrain.DownRoleClick(RoleID);
        this.openFormationPop();
    }


    FormationCellClick(RoleID:string,CellSite:{x:number,y:number}){
        this.DomainTrain.formationCellClick(RoleID,CellSite);
        this.openFormationPop();
    }


    openFormationPop(){
        let formationRole=this.DomainTrain.getDisplayFormation();

        this.TrainEntryUI.openFormationPop(formationRole);
    }

    getFormationRowList():FormationRole[]{
        return this.DomainTrain.getFormationRowList();
    }

    checkInFormation(RoleID:string){
        return this.DomainTrain.checkInFormation(RoleID);
    }

}