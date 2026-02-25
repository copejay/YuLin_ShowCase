
// import { WeaponBoxViewFactory } from '../../Infrastructure';

import { BagWeaponSpawner } from '../../Spawner/BagWeaponSpawner';

import { Prefab ,Node} from 'cc';

export class CellsWeapon{

    // private WeaponBoxFactory:WeaponBoxViewFactory;
    private BagWeaponSpawner:BagWeaponSpawner;

    private ParentNode:Node;

    private WeaponBoxList=[];

    WeaponBoxTotalLength:number=0;

    ClickCallBack:(WeaponID:string)=>void=null;

    
    constructor(BagWeaponSpawner:BagWeaponSpawner,ParentNode:Node,ClickCallBack:(WeaponID:string)=>void){
        // this.WeaponBoxFactory=new WeaponBoxViewFactory(WeaponBoxViewPrefab);
        //!!
        this.BagWeaponSpawner=BagWeaponSpawner;
        this.ParentNode=ParentNode;
        this.ClickCallBack=ClickCallBack;
    }

    CreateBoxBoard(WeaponInfoList){
        this.CreateWeaponBox(WeaponInfoList.length);
        this.syncBoxList(WeaponInfoList);
    }

    //内部依赖的意识是，直接使用类内部的属性
    //内部依赖：创建角色框板
    CreateWeaponBox(BoxNum:number){
        this.WeaponBoxList=this.MakeBoxList(BoxNum);
        const WeaponBoxSiteList=this.MakeBoxSiteList(BoxNum);
        for(let i=0;i<this.WeaponBoxList.length;i++){
            let WeaponBox=this.WeaponBoxList[i];
            let BoxSite=WeaponBoxSiteList[i];
            WeaponBox.setPosition(BoxSite.x,BoxSite.y);
        }
    }

    //内部依赖：销毁物品框板
    DestroyBoxBoard(){
        this.RecycleBoxList(this.WeaponBoxList);
        this.WeaponBoxList=[];
    }

    //内部依赖：同步角色框列表
    syncBoxList(WeaponInfoList){
        for(let i=0;i<this.WeaponBoxList.length;i++){
            let WeaponBox=this.WeaponBoxList[i];
            let WeaponInfo=WeaponInfoList[i];
            WeaponBox.syncName(WeaponInfo.name);
            WeaponBox.syncNum(WeaponInfo.info);
            //对每一个格子设置回调，调用回调，唤起角色弹窗，传入点击角色id
            WeaponBox.setBoxCallBack(WeaponInfo.id,(WeaponID)=>{
                this.ClickCallBack(WeaponID);
            });
        }
    }


    //纯处理的意思不直接使用类内部的属性，而是根据参数进行处理
    //纯处理
    //创建角色视图列表
    MakeBoxList(BoxNum:number){
        let WeaponBoxList=[];
        for(let i=0;i<BoxNum;i++){
            // let WeaponBox=this.WeaponBoxFactory.getWeaponBoxView(this.ParentNode);
            let WeaponBox=this.BagWeaponSpawner.getWeaponBoxView(this.ParentNode);

            WeaponBoxList.push(WeaponBox);
        }
        return WeaponBoxList;
    }


    //纯处理：回收角色框列表
    RecycleBoxList(WeaponBoxList){
        for(let i=0;i<WeaponBoxList.length;i++){
            let WeaponBox=WeaponBoxList[i];
            // this.WeaponBoxFactory.recycle(WeaponBox);
            this.BagWeaponSpawner.recycle(WeaponBox);
            // WeaponBox.Recycle();
        }
    }

    //纯处理
    //创建角色格子的位置列表
    MakeBoxSiteList(BoxNum:number){
        let BoxSiteList=[];
        let level=0;//排列层级
        for(let i=0;i<BoxNum;i++){
            if(i%3==0){//每3个为一层
                level++;
            }
            let BoxSite={
                x:(i%3)*170,
                y:(level-1)*-150,
            }
            BoxSiteList.push(BoxSite);
            this.WeaponBoxTotalLength=150*level+300;
        }
        return BoxSiteList;
    }
}