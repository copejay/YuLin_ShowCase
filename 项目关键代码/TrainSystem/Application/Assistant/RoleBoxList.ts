

import type { RoleRow, UIRoleCell } from "../../DTO/AppUI.contract";

import { TrainEntry } from "../TrainApplication";
//领域接口+领域集合
import { TrainDomain } from "../../Domain/TrainDomain";
import { DomainFactory } from "../DomainFactory/DomainFactory";

//处理角色面板的逻辑
export class RoleBoxList{

    private TrainEntryUI:TrainEntry;
    private DomainTrain:TrainDomain;

    constructor(){
        this.DomainTrain=DomainFactory.instance.getTrainDomain();
    }
    initUI(TrainUI){
        this.TrainEntryUI=TrainUI;
    }

    //同步训练角色
    reBuildBoard(){
        //初始化角色信息列表
        let RoleCellsList=this.getUIRoleCells();
        // let UpList=this.getUpRoleIDList();
        this.TrainEntryUI.reBuildBoxBoard(RoleCellsList);
    }

    getUIRoleCells():UIRoleCell[]{
        let UIRoleCellsList:UIRoleCell[]=[];
        // let RoleInfoList:RoleRow[]=this.getRoleInfoList();
        let AllRoleIDList=this.getAllRoleID();

        let upRoleIDList=this.getUpRoleIDList();

        AllRoleIDList.forEach((RoleID:string)=>{
            // let Role:RoleRow=DataBaseService.instance.getRole(RoleID);
            this.DomainTrain.initRole(RoleID);

            let Role=this.DomainTrain.getRole();
            let baseInfo=Role.baseInfo;
            let LevelNameAndDao=this.DomainTrain.getLevelNameAndDao();

            let RoleCell:UIRoleCell={
                id:Role.id,
                name:baseInfo.name,
                classType:baseInfo.classType,
                classTypeNum:baseInfo.classTypeNum,
                // up:upRoleIDList.includes(Role.id),
                up: upRoleIDList.indexOf(Role.id) !== -1,
                QiLevel:LevelNameAndDao.QiLevelName,
                TiLevel:LevelNameAndDao.TiLevelName,
            }
            UIRoleCellsList.push(RoleCell);
        })

        return UIRoleCellsList;
    }

    getUpRoleIDList(){
        // let formation=DataBaseService.instance.getFormation();
        let formation=this.DomainTrain.getFormationRowList();
        let upList=formation.map((role)=>{
            return role.id;
        })
        return upList;
    }

    getAllRoleID(){
        return this.DomainTrain.getAllRoleIDList();
    }

}