import { _decorator, Component, Node, UITransform ,Prefab} from 'cc';
const { ccclass, property } = _decorator;

//二级协助类
import { RolePanelEntry } from './Assistant/RolePanelEntry';
import {RoleBoxManager } from './Assistant/RoleBoxManager';
import { TrainPopManager } from './Assistant/TrainPopManager';
//引入管理层
import { TrainApplication } from '../Application/TrainApplication';
    export {TrainApplication as TrainApp};


//数据传输限制
import { 
    UIRoleCell,RoleRow,UIRoleBaseInfo,
    UIRoleDaoTalentInfo,UIRoleFightInfo,
    UIRoleBloodLineInfo,DeleteRoleInfo,
    UIFightRoleInfo,UISkillInfo,
    SkillUpForgetInfo,FormationUpRole,
    UIUseItem } from './UIType';

//刷新器
import { TrainRoleViewSpawner } from './Spawner/TrainRoleViewSpawner';


//在一级接口，为二级与三级接口定义传输规则
export type event={
    callFrom:string,
    type:string,
    data:any
}

//这里是一级入口，只负责定义UI层的整体行为，管理二级入口
//二级入口被传入App层，负责调用App接口，表达UI层的行为，管理三级入口（如果有）
//三级入口，一般是负责最底层的玩家直接交互，App层进行收敛，不直接引用，而是通过二级入口的通信方式表达玩家行为（比如EventBus）
@ccclass('TrainEntry')
export class TrainEntry extends Component {

    @property({type:Node,tooltip:"角色详情弹窗"})
    RolePanelNode:Node=null;
    @property({type:TrainPopManager,tooltip:"弹窗管理器"})
    TrainPopManagerNode:TrainPopManager=null;

    @property({type:Node,tooltip:"角色box父节点"})
    RoleBoxBoardParentNode:Node=null;
    @property({type:Node,tooltip:"训练角色box生成器"})
    TrainRoleBoxSpawnerNode:Node=null;
    //这个节点需要用来调节大小，才能适应内容的滑动要求
    @property({type:Node,tooltip:"内容节点"})
    ContentNode:Node=null;

    //子类管理器
    TrainPopManager:TrainPopManager=null;
    RoleBoxManager:RoleBoxManager=null;
    RolePanel:RolePanelEntry=null;
    //管理层
    TrainApplication:TrainApplication;

    //加载类运行需要的东西
    LoadComponent(){
        let RoleBoxBoardParentNode=this.RoleBoxBoardParentNode;
        let TrainRoleSpawner=this.TrainRoleBoxSpawnerNode.getComponent(TrainRoleViewSpawner);
        //初始化弹窗管理器
        this.TrainPopManager=this.TrainPopManagerNode.getComponent(TrainPopManager);
        this.TrainPopManager.initApp(this.TrainApplication);

        this.RoleBoxManager=new RoleBoxManager(TrainRoleSpawner,RoleBoxBoardParentNode);
        this.RoleBoxManager.initApp(this.TrainApplication);

        this.RolePanel=this.RolePanelNode.getComponent(RolePanelEntry);
        this.RolePanel.initApp(this.TrainApplication);
    }

    LoadApp(){
        //初始化管理层
        this.TrainApplication=TrainApplication.instance;
        //注入UI引用
        this.TrainApplication.initEntryUI(this);
    }

    start() {
        this.LoadApp();
        this.LoadComponent();
        //告诉App，UI已经初始化完成
        this.TrainApplication.UILoadOver();
    }



//类的行为

    //创建角色管理框
    reBuildBoxBoard(UIRoleCells:UIRoleCell[]){
        this.RoleBoxManager.reBuildBoxBoard(UIRoleCells);
        this.resetContentLength();
    }
    //根据框的长度，调整内容长度，方便滑动
    resetContentLength(){
        // let ContentNode=this.ResourceNode.getContentNode();
        let ContentNode=this.ContentNode;
        ContentNode.getComponent(UITransform).setContentSize(600,this.RoleBoxManager.BoxTotalLength);
    }

    //角色弹窗行为接口
    openRolePanel(){
        this.RolePanel.open();
    }
    closeRolePanel(){
        this.RolePanel.close();
    }
    openRolePanel_BaseContent(RoleBaseInfo:UIRoleBaseInfo,RoleDaoTalentInfo:UIRoleDaoTalentInfo,RoleFightInfo:UIRoleFightInfo,UIRoleBloodLineInfo:UIRoleBloodLineInfo){
        this.RolePanel.openBaseContent();
        this.RolePanel.setBaseInfo(RoleBaseInfo);
        this.RolePanel.setDaoTalentInfo(RoleDaoTalentInfo);
        this.RolePanel.setFightInfo(RoleFightInfo);
        this.RolePanel.setBloodLineInfo(UIRoleBloodLineInfo);
    }
    openRolePanel_MoreContent(FightRoleInfo:UIFightRoleInfo){
        this.RolePanel.openMoreContent();
        this.RolePanel.setFightRoleInfo(FightRoleInfo);
    }
    openRolePanel_SkillContent(ActiveSkillList:UISkillInfo[],PassiveSkillList:UISkillInfo[]){
        this.RolePanel.openSkillContent();
        this.RolePanel.setSkillInfo(ActiveSkillList,PassiveSkillList);
    }

    //遣散弹窗行为接口
    openDeleteRoleConfirmPop(DeleteRoleInfo:DeleteRoleInfo){
        this.TrainPopManager.openDeleteRoleConfirmPop(DeleteRoleInfo);
    }
    closeDeleteRoleConfirmPop(){
        this.TrainPopManager.closeDeleteRoleConfirmPop();
    }


    //列阵弹窗行为接口
    openFormationPop(FormationDisplayInfo:FormationUpRole[]){
        this.TrainPopManager.openFormationPop(FormationDisplayInfo);
    }

    //角色技能升级遗忘弹窗行为接口
    openSkillUpForgetPop(SkillUpForgetInfo:SkillUpForgetInfo){
        this.TrainPopManager.openSkillUpForgetPop(SkillUpForgetInfo);
    }

    //角色训练弹窗行为接口
    openTrainRolePop(TrainUseItemList:UIUseItem[]){
        this.TrainPopManager.openTrainRolePop(TrainUseItemList);
    }
        //角色资源使用确认弹窗
        openUseItemConfirmPop(ConfirmUseItem:UIUseItem){
            this.TrainPopManager.openUseItemConfirmPop(ConfirmUseItem);
        }


    update(deltaTime: number) {
        
    }
}


