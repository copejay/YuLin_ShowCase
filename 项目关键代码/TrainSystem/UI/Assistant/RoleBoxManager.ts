
// import { RoleBoxViewFactory } from '../../Infrastructure';
import { TrainRoleViewSpawner } from '../Spawner/TrainRoleViewSpawner';

import { Prefab ,Node} from 'cc';

//外部数据传输依赖
import { RoleRow } from '../../../GlobalService';
import { SpriteType } from '../../../GlobalSystem';
import type { UIRoleCell } from '../../DTO/AppUI.contract';

//外部接口
import { TrainApp } from '../TrainEntry';
import { RoleBoxView } from '../View/RoleBoxView';

export class RoleBoxManager{

    private TrainRoleViewSpawner:TrainRoleViewSpawner;

    private ParentNode:Node;

    private BoxList=[];

    BoxTotalLength:number=0;

    private TrainApp:TrainApp;



    //初始注入，拿到需要的组件
    constructor(TrainRoleViewSpawner:TrainRoleViewSpawner,ParentNode:Node){
        this.TrainRoleViewSpawner=TrainRoleViewSpawner;
        this.ParentNode=ParentNode;
    }

    initApp(TrainApp){
        this.TrainApp=TrainApp;
    }

    //创建板子
    reBuildBoxBoard(ShopItemInfoList){
        this.DestroyBoxList();

        this.BoxListSyncSite(ShopItemInfoList.length);
        this.BoxListSyncInfo(ShopItemInfoList);
    }

    //创建视图板子
    BoxListSyncSite(BoxNum:number){
        this.BoxList=this.MakeBoxViewList(BoxNum);
        const BoxSiteList=this.MakeBoxSiteList(BoxNum);
        for(let i=0;i<this.BoxList.length;i++){
            let Box=this.BoxList[i];
            let BoxSite=BoxSiteList[i];
            Box.setPosition(BoxSite.x,BoxSite.y);
        }
    }
    //视图板子同步信息

    BoxListSyncInfo(InfoList:UIRoleCell[]){
        for(let i=0;i<this.BoxList.length;i++){
            let Box:RoleBoxView=this.BoxList[i];
            let Info:UIRoleCell=InfoList[i];

            Box.syncName(Info.name);
            Box.syncQiTiLevel(Info.QiLevel,Info.TiLevel);

            let SpriteType:SpriteType={type:Info.classType,id:Info.classTypeNum};
            Box.syncSprite(SpriteType);
            //对每一个格子设置回调，调用回调，唤起角色弹窗，传入点击角色id
            Box.setBoxInfo(Info.id,(ID)=>{
                // this.ClickCallBack(ID);
                this.TrainApp.clickRoleBox(ID);
            });
            if(Info.up==true){
                console.log(`检测到${Info.id}在上阵列表中`);
                Box.setFormationUp();
            }
            else{
                console.log(`检测到${Info.id}不在上阵列表中`);
                Box.setFormationDown();
            }
        }
    }


    //销毁角色框板
    DestroyBoxList(){
        this.RecycleBoxList(this.BoxList);
        this.BoxList=[];
    }
    //调用工厂进行回收
    RecycleBoxList(BoxList:any[]){
        for(let i=0;i<BoxList.length;i++){
            let Box=BoxList[i];
            this.TrainRoleViewSpawner.recycle(Box);
        }
    }

    //创建视图列表
    MakeBoxViewList(BoxNum:number){
        let BoxList=[];
        for(let i=0;i<BoxNum;i++){
            let Box=this.TrainRoleViewSpawner.getView(this.ParentNode);
            BoxList.push(Box);
        }
        return BoxList;
    }

    MakeBoxSiteList(BoxNum:number){
        let BoxSiteList=[];
        let level=0;//排列层级
        for(let i=0;i<BoxNum;i++){
            if(i%3==0){//每3个为一层
                level++;
            }
            let BoxSite={
                x:(i%3)*180+20,
                y:(level-1)*-150,
            }
            BoxSiteList.push(BoxSite);
            this.BoxTotalLength=150*level+700;
        }
        return BoxSiteList;
    }
}