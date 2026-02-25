
import {BagApp,GlobalApp} from '../DTO/OutApp.contract';

//数据传输接口
import type { RoleFightInfo,RoleBaseInfo } from "../DTO/DomainType.contract";

//导入二级协助类
import { RolePanel } from "./Assistant/RolePanel";
import { RoleBoxList } from "./Assistant/RoleBoxList";
import {FormationPop} from './Assistant/FormationPop';
import { RolePanelPops } from "./Assistant/RolePanelPops";
import { RoleFactoryAt } from "./Assistant/RoleFactoryAt";
import { DataComposer } from "./Assistant/DataComposer";


import type { ContentState } from "./Assistant/RolePanel";

//导入UI一级入口，方便识别检测UI层的Api列表
//从这里再导出给App二级协助类使用
import { TrainEntry } from "../UI/TrainEntry";
    export {TrainEntry};
//导入领域规则模型
import { DomainFactory } from "./DomainFactory/DomainFactory";
import { Role } from '../Domain/TrainDomainAt/Role';


export class TrainApplication{

    private static _instance:TrainApplication;

    public static get instance(){
        if(!this._instance){
            this._instance=new TrainApplication();
            console.log(`【TrainApplication instance created】`);
            return this._instance;
        }
        return this._instance;
    }
    //外部注入
    private TrainEntryUI:TrainEntry=null;//训练入口UI
    //领域规则模型
    // private modelFightFormation:FightFormation;

    //内部二级协助类
    private RolePanel:RolePanel;//管理角色面板
    private RoleBoxList:RoleBoxList;//管理角色显示列表
    private FormationPop:FormationPop;//管理列阵弹窗
    private RolePanelPops:RolePanelPops;//管理一堆乱七八糟的弹窗
    private RoleFactoryAt:RoleFactoryAt;
    //数据 composer
    private DataComposer:DataComposer;

    //存储最新点击的角色
    private newChooseRoleID:string;
    //存储最新点击的主动技能ID
    private newChooseActiveSkillID:string;
    //存储最新点击的被动技能ID
    private newChoosePassiveSkillID:string;
    //存储最新点击的培养资源
    // private newChooseTrainUseItemID:string;
    //存储最新点击的培养资源槽位ID
    private newChooseTrainUseItemSlotID:number;

    constructor(){
        // console.log(`TrainApplication:初始化调用`);
        DomainFactory.instance;//调用即构建

        this.RolePanel=new RolePanel();
        this.RoleBoxList=new RoleBoxList();
        this.FormationPop=new FormationPop();
        this.RolePanelPops=new RolePanelPops(GlobalApp.instance,BagApp.instance);
        this.RoleFactoryAt=new RoleFactoryAt();
        //数据 composer
        this.DataComposer=new DataComposer();

    }

    //注入App运行需要的东西
    initEntryUI(TrainUI){
        this.TrainEntryUI=TrainUI;
        this.RolePanel.initUI(TrainUI);
        this.RoleBoxList.initUI(TrainUI);
        this.FormationPop.initUI(TrainUI);
        this.RolePanelPops.initUI(TrainUI);
    }

//类运行时暴露的接口

    commitData(){
        this.FormationPop.commitData();
    }
    //训练界面接口
    //提供给外部调用的方法
    clickRoleBox(RoleID:string){
        this.newChooseRoleID=RoleID;
        this.RolePanel.open(RoleID);
    }
    UILoadOver(){
        this.RoleBoxList.reBuildBoard();
    }

    //获取一个角色战斗时的数据
    getFightRoleInfo(RoleID:string):RoleFightInfo{
        let FightRoleInfo=this.DataComposer.getFightInfo(RoleID);
        return FightRoleInfo;
    }
    getBaseRoleInfo(RoleID:string):RoleBaseInfo{
        let BaseRoleInfo=this.DataComposer.getRoleBaseInfo(RoleID);
        return BaseRoleInfo;
    }

    deleteRoleClick(){
        this.RolePanelPops.openDeleteRolePop(this.newChooseRoleID);
    }

    deleteRoleConfirm(){
        this.RoleFactoryAt.deleteRole(this.newChooseRoleID);
        if(this.RoleFactoryAt.checkInFormation(this.newChooseRoleID)){
            return
        }
        this.TrainEntryUI.closeDeleteRoleConfirmPop();
        this.TrainEntryUI.closeRolePanel();
        this.RoleBoxList.reBuildBoard();
    }

    setRole(){
        this.RoleFactoryAt.setRole();
    }


//角色弹窗行为接口
    ToContent(ContentState:ContentState){
        this.RolePanel.toContent(this.newChooseRoleID,ContentState);
    }
    //角色弹窗-基础Content行为接口
    UpFormationClick(){
        // this.FormationPop.setChooseRoleID(this.newChooseRoleID);
        this.FormationPop.openFormationPop();
    }
    TrainRoleBtnClick(){
        this.RolePanelPops.openTrainRolePop();
    }

    //角色弹窗-SkillContent行为接口
    ActiveSkillControlClick(SkillID:string){
    //    this.RolePanelPops.openSkillUpForgetPop();
    }
    ActiveSkillLookClick(SkillID:string){
       
    }

    PassiveSkillControlClick(SkillID:string){
        this.newChoosePassiveSkillID=SkillID;
        this.RolePanelPops.openPassiveSkillUpForgetPop(SkillID,this.newChooseRoleID);
    }
    PassiveSkillLookClick(SkillID:string){
     
    }

    //资源培养弹窗行为接口
    TrainUseItemClick(slotID:number){
        this.newChooseTrainUseItemSlotID=slotID;
        this.RolePanelPops.openConfirmUseItemPop(slotID);
    }
        //确认使用某资源
        ConfirmUseItem(UseItemNum:number){
            this.RolePanelPops.ConfirmUseItem(this.newChooseTrainUseItemSlotID,UseItemNum);
            this.ToContent("Base");
            this.RolePanelPops.openTrainRolePop();
            this.RoleBoxList.reBuildBoard();
        }

    //列阵弹窗行为接口
    getFormationList(){
        // this.modelFightFormation.getFormationRowList();
        return this.FormationPop.getFormationRowList();
    }
    //
    DownRoleClick(){
        this.FormationPop.DownRoleClick(this.newChooseRoleID);
        this.RoleBoxList.reBuildBoard();
    }
    FormationCellClick(CellSite:{x:number,y:number}){
        // console.log(`TrainApp--点击了列阵格子${CellSite.x},${CellSite.y}`);
        this.FormationPop.FormationCellClick(this.newChooseRoleID,CellSite);
        this.RoleBoxList.reBuildBoard();
    }

    addSpeed(speed:number){
        this.RolePanel.addSpeed(this.newChooseRoleID,speed);
    }
    addStrong(strong:number){
        this.RolePanel.addStrong(this.newChooseRoleID,strong);
    }
    addBlood(blood:number){
        this.RolePanel.addBlood(this.newChooseRoleID,blood);
    }
    addSmart(smart:number){
        this.RolePanel.addSmart(this.newChooseRoleID,smart);
    }
    addQiExp(QiExp:number){
        this.RolePanel.addQiExp(this.newChooseRoleID,QiExp);
    }
    addTiExp(TiExp:number){
        this.RolePanel.addTiExp(this.newChooseRoleID,TiExp);
    }



}