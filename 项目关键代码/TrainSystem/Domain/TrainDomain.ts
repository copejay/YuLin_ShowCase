

import { Role } from "./TrainDomainAt/Role";
import { RoleFactory } from "./TrainDomainAt/RoleFactory";
import { FightFormation } from "./TrainDomainAt/FightFormation";
import { OtherDomain } from "./TrainDomainAt/OtherDomain";
// import { TrainItemUser } from "./TrainDomainAt/TrainItemUser";

//
import { RoleFightInfo,RoleBaseInfo } from "./TrainType";

export interface TrainDomainEnv{
    Role:Role,
    RoleFactory:RoleFactory,
    FightFormation:FightFormation,
    OtherDomain:OtherDomain,
    // TrainItemUser:TrainItemUser,
}

export class TrainDomain{

    private role:Role;
    private roleFactory:RoleFactory;
    private fightFormation:FightFormation;
    private otherDomain:OtherDomain;
    // private trainItemUser:TrainItemUser;

    constructor(trainDomainEnv:TrainDomainEnv){
        this.role=trainDomainEnv.Role;
        this.roleFactory=trainDomainEnv.RoleFactory;
        this.fightFormation=trainDomainEnv.FightFormation;
        this.otherDomain=trainDomainEnv.OtherDomain;
        // this.trainItemUser=trainDomainEnv.TrainItemUser;

        this.DomainLinker();
    }
    
    //领域连接方法，把所有领域联系在一起，方便它们进行共同协作而不污染门面
    DomainLinker(){
        this.role.LinkOtherDomain(this.roleFactory,this.otherDomain);
        this.roleFactory.LinkOtherDomain(this.fightFormation,this.otherDomain);
        this.fightFormation.LinkOtherDomain(this.otherDomain,this.role);
    }

    commitData(){
        console.log(`【Domain--TrainDomain】commitData`);
        this.fightFormation.commitFormation();
        this.role.commitRole();
    }

    //初始化数据
    initRole(RoleID:string){
        this.role.initRole(RoleID);
    }
    //对角色进行数据查询
    getRole(){//整体
        return this.role.getRole();
    }
    getFormationRowList(){//阵容
        return this.fightFormation.getFormationRowList();
    }
    checkInFormation(RoleID:string){
        return this.fightFormation.checkInFormation(RoleID);
    }
    getLevelNameAndDao(){//局部数据
        return this.role.getLevelNameAndDao();
    }
    getAllRoleIDList(){
        return this.role.getAllRoleIDList();
    }
    getSpriteRoot(){
        return this.role.getSpriteRoot();
    }
    getDisplayFormation(){
        return this.fightFormation.getDisplayFormation();
    }
    getFightRole(){
        return this.role.getRoleFightInfo();
    }
    getRoleBaseInfo(){
        return this.role.getRoleBaseInfo();
    }

    //对角色进行操作
    deleteRole(RoleID:string){//增删
        this.roleFactory.deleteRole(RoleID);
    }
    addRole(){
        this.roleFactory.addRole();
    }
    DownRoleClick(RoleID:string){//阵容
        this.fightFormation.DownRoleClick(RoleID);
    }
    formationCellClick(RoleID:string,CellSite:{x:number,y:number}){
        this.fightFormation.formationCellClick(RoleID,CellSite);
    }
    addSpeed(speed:number){//属性
        this.role.addSpeed(speed);
    }
    addStrong(strong:number){
        this.role.addStrong(strong);
    }
    addBlood(blood:number){
        this.role.addBlood(blood);
    }
    addSmart(smart:number){
        this.role.addSmart(smart);
    }
    addQiExp(QiExp:number){
        this.role.addQiExp(QiExp);
    }
    addTiExp(TiExp:number){
        this.role.addTiExp(TiExp);
    }




}